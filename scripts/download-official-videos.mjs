import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createWriteStream, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { spawnSync } from "node:child_process";

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

const SOURCES = [
  {
    slug: "dynaretarget",
    label: "DynaRetarget",
    owner: "Atarilab",
    repo: "dynaretarget.io",
    branches: ["main", "master"],
  },
  {
    slug: "motiondisco",
    label: "MotionDisco",
    owner: "Atarilab",
    repo: "motiondisco.io",
    branches: ["main", "master"],
  },
];

const YOUTUBE_SOURCES = [
  {
    slug: "dynaretarget",
    label: "DynaRetarget supplementary",
    url: "https://www.youtube.com/watch?v=YlopoVulwi8",
    output: "public/videos/youtube/dynaretarget.%(ext)s",
  },
  {
    slug: "motiondisco",
    label: "MotionDisco supplementary",
    url: "https://youtu.be/DHiVz34QYlw",
    output: "public/videos/youtube/motiondisco.%(ext)s",
  },
  {
    slug: "gdnb",
    label: "GDNB supplementary",
    url: "https://youtu.be/T7MUvMA67VM",
    output: "public/videos/youtube/gdnb.%(ext)s",
  },
];

const root = process.cwd();
const manifestPath = join(root, "public", "videos", "video_manifest.json");

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "Pitch_web video downloader",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

async function resolveTree(owner, repo, branches) {
  let lastError;
  for (const branch of branches) {
    const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    try {
      const json = await fetchJson(url);
      return { branch, tree: json.tree ?? [] };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function downloadFile(url, outputPath) {
  await mkdir(dirname(outputPath), { recursive: true });

  if (existsSync(outputPath)) {
    return { skipped: true };
  }

  const response = await fetch(url, {
    headers: { "User-Agent": "Pitch_web video downloader" },
  });
  if (!response.ok || !response.body) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  const fileStream = createWriteStream(outputPath);
  await pipeline(response.body, fileStream);
  return { skipped: false };
}

async function downloadRepoVideos(source) {
  const { branch, tree } = await resolveTree(source.owner, source.repo, source.branches);
  const videoFiles = tree
    .filter((entry) => entry.type === "blob" && VIDEO_EXTENSIONS.test(entry.path))
    .sort((a, b) => a.path.localeCompare(b.path));

  const downloads = [];
  for (const entry of videoFiles) {
    const relativePath = entry.path.replace(/^static\/videos\//, "");
    const outputPath = join(root, "public", "videos", source.slug, relativePath);
    const rawUrl = `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${branch}/${entry.path}`;

    console.log(`[${source.slug}] ${entry.path}`);
    const { skipped } = await downloadFile(rawUrl, outputPath);
    downloads.push({
      label: source.label,
      source_repo: `${source.owner}/${source.repo}`,
      branch,
      source_path: entry.path,
      source_url: rawUrl,
      local_path: outputPath.replace(`${root}/`, ""),
      skipped,
    });
  }

  return downloads;
}

function resolveYtDlpCommand() {
  const system = spawnSync("which", ["yt-dlp"], { encoding: "utf8" });
  if (system.status === 0) {
    return { command: "yt-dlp", argsPrefix: [], env: process.env };
  }

  const localModule = join(root, ".tools", "yt-dlp", "yt_dlp", "__init__.py");
  if (existsSync(localModule)) {
    return {
      command: "python3",
      argsPrefix: ["-m", "yt_dlp"],
      env: {
        ...process.env,
        PYTHONPATH: join(root, ".tools", "yt-dlp"),
      },
    };
  }

  return null;
}

async function maybeDownloadYoutube() {
  const results = [];
  const ytDlp = resolveYtDlpCommand();
  if (!ytDlp) {
    return YOUTUBE_SOURCES.map((source) => ({
      label: source.label,
      source_url: source.url,
      local_path: source.output.replace("%(ext)s", "mp4"),
      skipped: true,
      reason: "yt-dlp not installed",
    }));
  }

  await mkdir(join(root, "public", "videos", "youtube"), { recursive: true });

  for (const source of YOUTUBE_SOURCES) {
    console.log(`[youtube] ${source.label}: ${source.url}`);
    const result = spawnSync(
      ytDlp.command,
      [
        ...ytDlp.argsPrefix,
        "--js-runtimes",
        `node:${process.execPath}`,
        "--no-overwrites",
        "-S",
        "res:1080,ext:mp4:m4a",
        "--merge-output-format",
        "mp4",
        "-o",
        source.output,
        source.url,
      ],
      { cwd: root, encoding: "utf8", env: ytDlp.env, stdio: "inherit" },
    );

    results.push({
      label: source.label,
      source_url: source.url,
      local_path: source.output.replace("%(ext)s", "mp4"),
      skipped: result.status !== 0,
      reason: result.status === 0 ? undefined : `yt-dlp exited with ${result.status}`,
    });
  }

  return results;
}

async function main() {
  await mkdir(join(root, "public", "videos"), { recursive: true });

  const direct = [];
  for (const source of SOURCES) {
    direct.push(...(await downloadRepoVideos(source)));
  }

  const youtube = await maybeDownloadYoutube();
  const manifest = {
    generated_at: new Date().toISOString(),
    direct_count: direct.length,
    youtube_count: youtube.filter((item) => !item.skipped).length,
    direct,
    youtube,
  };

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Wrote ${manifestPath}`);
  console.log(`Direct videos listed: ${manifest.direct_count}`);
  console.log(`YouTube videos downloaded: ${manifest.youtube_count}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
