export default function BadgePill({
  children,
  dot = false,
}: {
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <span className="sg-badge-pill">
      {dot && (
        <span className="sg-badge-pill-dot" aria-hidden="true">
          ●
        </span>
      )}
      {children}
    </span>
  );
}
