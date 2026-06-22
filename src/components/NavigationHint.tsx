type NavigationHintProps = {
  activeLabel: string;
  activeIndex: number;
  total: number;
};

export function NavigationHint({ activeLabel, activeIndex, total }: NavigationHintProps) {
  return (
    <div className="navigation-hint" aria-label="Slide navigation">
      <span>{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      <span>{activeLabel}</span>
      <kbd>←</kbd>
      <kbd>→</kbd>
    </div>
  );
}
