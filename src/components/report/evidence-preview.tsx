import Image from "next/image"

interface EvidencePreviewProps {
  evidences: {
    id: string
    file_url: string
  }[]
}

export default function EvidencePreview({
  evidences
}: EvidencePreviewProps) {

  if (!evidences.length) {
    return null
  }

  const preview =
    evidences.slice(0, 4)

  return (
    <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl">

      {preview.map(
        (evidence, index) => {

          const isLast =
            index === 3 &&
            evidences.length > 4

          return (
            <div
              key={evidence.id}
              className="relative"
            >
              <img
                src={evidence.file_url}
                alt=""
                className="aspect-video w-full rounded-lg object-cover"
            />

              {isLast && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 text-xl font-bold text-white">
                  +{evidences.length - 4}
                </div>
              )}
            </div>
          )
        }
      )}

    </div>
  )
}