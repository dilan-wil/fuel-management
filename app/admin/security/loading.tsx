import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "@/components/admin-layout"

export default function SecurityLoading() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-9 w-36" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-28" />
          </div>

          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
      </div>
    </AdminLayout>
  )
}

