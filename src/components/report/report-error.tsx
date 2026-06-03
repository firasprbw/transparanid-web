interface ReportErrorProps {
  message?: string
}

export default function ReportError({
  message
}: ReportErrorProps) {
  return (
    <div className="rounded-xl border border-destructive p-6">

      <h3 className="font-semibold">
        Gagal memuat laporan
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {message ??
          "Terjadi kesalahan saat mengambil data."}
      </p>

    </div>
  )
}