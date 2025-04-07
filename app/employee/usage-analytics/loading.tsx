import { Skeleton } from "@/components/ui/skeleton"
import EmployeeLayout from "@/components/employee-layout"

export default function EmployeeUsageAnalyticsLoading() {
  return (
    <EmployeeLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[240px]" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-80" />
          <div className="border rounded-lg p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-72" />
              </div>
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <div className="flex items-end gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}

