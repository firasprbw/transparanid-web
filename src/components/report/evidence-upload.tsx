"use client"

import { useRef } from "react"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface EvidenceFile {
  file: File
  preview: string
}

interface Props {
  evidences: EvidenceFile[]
  setEvidences: (
    files: EvidenceFile[]
  ) => void
}

export function EvidenceUpload({
  evidences,
  setEvidences
}: Props) {

  const inputRef =
    useRef<HTMLInputElement>(null)

  const handleSelect =
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {

      const files =
        Array.from(
          event.target.files || []
        )

      const mapped =
        files.map(file => ({
          file,
          preview:
            URL.createObjectURL(file)
        }))

      setEvidences([
        ...evidences,
        ...mapped
      ])
    }

  const removeEvidence =
    (index: number) => {

      setEvidences(
        evidences.filter(
          (_, i) => i !== index
        )
      )
    }

  return (

    <div className="space-y-4">

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          inputRef.current?.click()
        }
      >

        <Upload className="size-4 mr-2" />

        Upload Evidence

      </Button>

      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        multiple
        className="hidden"
        onChange={handleSelect}
      />

      {evidences.length > 0 && (

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {evidences.map(
            (
              evidence,
              index
            ) => (

              <div
                key={index}
                className="relative border rounded-lg overflow-hidden"
              >

                <img
                  src={
                    evidence.preview
                  }
                  alt=""
                  className="w-full h-40 object-cover"
                />

                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() =>
                    removeEvidence(index)
                  }
                >

                  <X className="size-4" />

                </Button>

              </div>

            )
          )}

        </div>

      )}

    </div>

  )
}