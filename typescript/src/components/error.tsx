import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error;
  handleRefetch: () => void;
};

export default function FetchError({ error, handleRefetch }: Props) {
  return (
    <div className="grid place-items-center min-h-[calc(100lvh_-_18rem)]">
      <div className="flex flex-col w-full items-center justify-center max-w-[40rem]">
        <p className="text-center font-medium mb-3">
          {error.message || "Failed to fetch"}
        </p>
        <Button onClick={handleRefetch}>
          Retry
          <RefreshCcw width={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
