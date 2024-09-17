import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  handlePrevClick: () => void;
  handleNextClick: () => void;
};

export default function Pagination(props: Props) {
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    handleNextClick,
    handlePrevClick,
  } = props;

  return (
    <div className="p-5 w-full justify-end flex gap-4 items-center">
      {hasPrevPage && (
        <Button
          variant="outline"
          size="sm"
          className="h-6 w-6 rounded-sm p-0"
          onClick={handlePrevClick}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      )}
      <p className="text-sm">
        Page {currentPage} of {totalPages}
      </p>
      {hasNextPage && (
        <Button
          variant="outline"
          size="sm"
          className="h-6 w-6 rounded-sm p-0"
          onClick={handleNextClick}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
