interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <h3 className="text-red-800 font-semibold mb-2">Error</h3>
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn btn-primary"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}
