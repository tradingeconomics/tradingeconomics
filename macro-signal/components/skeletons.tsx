import { Skeleton } from "@/components/ui/skeleton";

export function CardsSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 2 }).map((_, rowIndex) => (
        <div key={rowIndex}>
          <Skeleton className="mb-3 h-3 w-48" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {Array.from({ length: 4 }).map((__, cardIndex) => (
              <Skeleton key={cardIndex} className="h-40 w-full rounded-sm" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return <Skeleton className="h-72 w-full rounded-sm sm:h-96" />;
}

export function G7GlanceSkeleton() {
  return (
    <div className="space-y-8">
      <G7GlanceTableSkeleton />
      <div>
        <Skeleton className="mb-3 h-3 w-56" />
        <G7GlanceTableSkeleton columns={5} />
      </div>
    </div>
  );
}

function G7GlanceTableSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="overflow-hidden rounded-sm border">
      <div className="flex gap-4 border-b bg-muted/50 px-4 py-3">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-4 ${index === 0 ? "w-20" : "ml-auto w-24"}`}
          />
        ))}
      </div>
      {Array.from({ length: 7 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 border-b px-4 py-3 last:border-b-0"
        >
          <Skeleton className="h-4 w-28" />
          {Array.from({ length: columns - 1 }).map((__, cellIndex) => (
            <Skeleton key={cellIndex} className="ml-auto h-4 w-24" />
          ))}
        </div>
      ))}
    </div>
  );
}
