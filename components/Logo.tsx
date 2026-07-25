export default function Logo({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 6C51.5 28 56 40 60 44C64 48 76 52 94 52C76 52 64 56 60 60C56 64 51.5 76 50 98C48.5 76 44 64 40 60C36 56 24 52 6 52C24 52 36 48 40 44C44 40 48.5 28 50 6Z"
        fill="currentColor"
      />
    </svg>
  );
}
