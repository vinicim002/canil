interface FeedbackMessageProps {
  type: "error" | "success";
  message: string;
}

export function FeedbackMessage({ type, message }: FeedbackMessageProps) {
  if (!message) return null;

  if (type === "error") {
    return (
      <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl">
        {message}
      </p>
    );
  }

  return (
    <p className="text-green-600 text-sm font-medium bg-green-50 px-4 py-3 rounded-xl">
      {message}
    </p>
  );
}