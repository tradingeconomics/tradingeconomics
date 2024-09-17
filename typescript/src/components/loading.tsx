import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <>
      <div className="flex items-center gap-3 my-6">
        <Skeleton className="w-1/3 h-10 rounded-md"></Skeleton>
        <Skeleton className="w-1/5 h-10 rounded-md"></Skeleton>
        <Skeleton className="w-1/5 h-10 rounded-md"></Skeleton>
        <Skeleton className="w-1/6 ml-auto h-10 rounded-md"></Skeleton>
      </div>
      {Array.from({ length: 10 }, (_, k) => (
        <div
          key={k}
          className="flex items-center justify-around h-12 overflow-auto shrink-0"
        >
          <Skeleton className="w-48 h-6 rounded-full"></Skeleton>
          <Skeleton className="w-32 h-6 rounded-full"></Skeleton>
          <Skeleton className="w-36 h-6 rounded-full"></Skeleton>
          <Skeleton className="w-32 h-6 rounded-full"></Skeleton>
          <Skeleton className="w-24 h-6 rounded-full"></Skeleton>
          <Skeleton className="w-24 h-6 rounded-full"></Skeleton>
          <Skeleton className="w-24 h-6 rounded-full"></Skeleton>
        </div>
      ))}
      <div className="flex justify-end px-5">
        <Skeleton className="h-9 w-20" />
      </div>
    </>
  );
}
