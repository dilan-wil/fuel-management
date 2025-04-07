import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function VehiclesLoading() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-9 w-40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-[250px] mt-1" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 w-full md:w-[400px]" />
              <Skeleton className="h-10 w-full md:w-[200px]" />
              <Skeleton className="h-10 w-full md:w-[200px]" />
              <Skeleton className="h-10 w-full md:w-[200px]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-[200px] mt-1" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-full" />
              </div>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton className="h-5 w-5" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

