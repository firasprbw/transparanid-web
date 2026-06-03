interface EvidenceGalleryProps {
  evidences: {
    file_url: string
  }[]
}

export default function
EvidenceGallery({
  evidences
}: EvidenceGalleryProps) {

  return (

    <div
      className="
      grid
      grid-cols-2
      gap-4
    "
    >

      {evidences.map(
        evidence => (

          <img
            key={
              evidence.file_url
            }

            src={
              evidence.file_url
            }

            alt="Evidence"

            className="
            rounded-xl
            border
            "
          />

        )
      )}

    </div>

  )
}