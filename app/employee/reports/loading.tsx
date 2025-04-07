import { Skeleton } from "@/components/ui/skeleton"
import EmployeeLayout from "@/components/employee-layout"

export default function EmployeeReportsLoading() {
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
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="border rounded-lg p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 flex-1" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-[180px]" />
                <Skeleton className="h-10 w-[180px]" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-8 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-6" />
                ))}
              </div>

              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-8 gap-4">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <Skeleton key={j} className="h-10" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}

