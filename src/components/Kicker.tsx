type KickerProps = {
  children: string;
  muted?: boolean;
};

export function Kicker({ children, muted = false }: KickerProps) {
  return <p className={`kicker ${muted ? "kicker-muted" : ""}`}>{children}</p>;
}
