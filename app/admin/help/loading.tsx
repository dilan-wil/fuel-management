import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "@/components/admin-layout"

export default function HelpLoading() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-9 w-36" />
          </div>
        </div>

        <Skeleton className="h-10 w-full md:w-1/2 lg:w-1/3" />

        <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />

            <div className="grid md:grid-cols-3 gap-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

