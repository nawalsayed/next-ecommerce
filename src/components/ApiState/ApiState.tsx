import { Button } from "@/components/ui/button";

type ApiStateProps = {
  message: string;
  onRetry?: () => void;
};

export default function ApiState({ message, onRetry }: ApiStateProps) {
  return (
    <div className="px-6 py-12 text-center" role={onRetry ? "alert" : undefined}>
      <p className="mb-4 text-gray-600">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="bg-pink-600 text-white hover:bg-pink-700">
          Try again
        </Button>
      )}
    </div>
  );
}
