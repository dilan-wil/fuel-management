import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ReportsLoading() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-9 w-40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-[200px] mt-1" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-32" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

