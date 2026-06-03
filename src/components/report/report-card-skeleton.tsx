import { Skeleton }
  from "@/components/ui/skeleton"

export default function
ReportCardSkeleton() {

  return (
    <div className="space-y-3 rounded-xl border p-4">

      <Skeleton className="h-4 w-40" />

      <Skeleton className="h-5 w-64" />

      <Skeleton className="h-20 w-full" />

      <Skeleton className="h-48 w-full" />

    </div>
  )
}