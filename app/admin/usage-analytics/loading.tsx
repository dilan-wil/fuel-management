import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function UsageAnalyticsLoading() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-9 w-40" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-[250px] mt-1" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 w-full md:w-[200px]" />
              <Skeleton className="h-10 w-full md:w-[200px]" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Skeleton className="h-10 w-[300px]" />

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-64" />
            </CardHeader>
</Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-[250px] mt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[400px] w-full" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32 mt-1" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-40 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

