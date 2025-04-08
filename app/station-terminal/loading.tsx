import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FuelIcon } from "lucide-react";

export default function StationTerminalLoading() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-nestle-red text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FuelIcon className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">
                Nestle Cameroon Fuel Station
              </h1>
              <p className="text-sm opacity-80">Point of Sale Terminal</p>
            </div>
          </div>
          <div className="text-right">
            <Skeleton className="h-5 w-32 bg-white/20" />
            <Skeleton className="h-4 w-24 bg-white/20 mt-1" />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </CardHeader>

          <div className="px-6 pt-6">
            <div className="grid grid-cols-3 w-full h-10 bg-muted rounded-md">
              <Skeleton className="h-full rounded-md" />
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <Skeleton className="h-40 w-full rounded-md" />

            <div className="flex justify-end gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t flex justify-between p-6">
            <div>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32 mt-1" />
            </div>
            <div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24 mt-1" />
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-slate-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-4 w-64 mx-auto bg-white/10" />
          <Skeleton className="h-3 w-48 mx-auto bg-white/10 mt-1" />
        </div>
      </footer>
    </div>
  );
}
