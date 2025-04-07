import { Skeleton } from "@/components/ui/skeleton"
import EmployeeLayout from "@/components/employee-layout"

export default function EmployeeMonthlyReportLoading() {
  return (
    <EmployeeLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Skeleton className="h-10 w-[240px]" />
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>

          <Skeleton className="h-1 w-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-[250px] w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-[250px] w-full" />
            </div>
          </div>

          <Skeleton className="h-1 w-full" />

          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="h-6" />
                ))}
              </div>

              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <Skeleton key={j} className="h-10" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-72" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}

