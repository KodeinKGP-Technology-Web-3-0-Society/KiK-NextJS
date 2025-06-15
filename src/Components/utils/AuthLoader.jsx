export default function AuthLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60"
      style={{ backgroundColor: "rgb(1, 1, 27)" }}
    >
      <svg
        className="h-12 w-12 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <defs>
          <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#218ACB" />
            <stop offset="50%" stopColor="#0CC5DA" />
            <stop offset="100%" stopColor="#11E3FB" />
          </linearGradient>
        </defs>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="url(#spinnerGradient)"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="url(#spinnerGradient)"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </div>
  );
}
