export default function Loading() {
  return (
    <div className=" mx-auto flex justify-center">
      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 018 8v-2a6 6 0 00-6-6h-2zm-8 0a2 2 0 012-2v-2a4 4 0 00-4 4h2zm8 0a2 2 0 01-2 2v2a4 4 0 004-4h-2z"
        />
      </svg>
      <span>Loading more images...</span>
    </div>
  );
}
