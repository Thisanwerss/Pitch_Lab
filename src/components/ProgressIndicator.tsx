type ProgressIndicatorProps = {
  activeIndex: number;
  total: number;
};

export function ProgressIndicator({ activeIndex, total }: ProgressIndicatorProps) {
  const progress = total <= 1 ? 1 : (activeIndex + 1) / total;

  return (
    <div className="progress-track" aria-hidden="true">
      <div className="progress-fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
