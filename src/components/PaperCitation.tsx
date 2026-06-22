type PaperCitationProps = {
  href: string;
  label: string;
};

export function PaperCitation({ href, label }: PaperCitationProps) {
  return (
    <a className="paper-citation" href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}
