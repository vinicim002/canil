interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-4",
  lg: "w-12 h-12 border-4",
};

export function LoadingSpinner({
  message,
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div
        className={`${sizeClasses[size]} border-orange/20 border-t-orange rounded-full animate-spin`}
      />
      {message && (
        <span className="text-body/50 font-medium text-sm">{message}</span>
      )}
    </div>
  );
}
