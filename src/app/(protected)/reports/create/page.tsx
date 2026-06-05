import { TransparanLayout } from "@/components/layout/transparan-layout"
import {
  CreateReportForm
} from "@/components/report/create-report-form"

import {
  ProtectedRoute
} from "@/components/auth/protected-route"

import {
  getCategories
} from "@/lib/api/categories"

export default async function
CreateReportPage() {

  const categories =
    await getCategories()

  return (
     <ProtectedRoute>
      <TransparanLayout>
      <div className="max-w-4xl mx-auto w-full">

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Buat Laporan Baru
        </h1>

        <p className="text-muted-foreground mt-2">
          Laporkan dugaan penyalahgunaan dana publik disertai bukti pendukung.
        </p>

      </div>

      <CreateReportForm
        categories={categories}
      />

    </div>
    </TransparanLayout>
     </ProtectedRoute>
    
    

  )
}