"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  createReportSchema,
  CreateReportFormData
} from "@/schemas/create-report.schema"

import { useState } from "react"

import {
  EvidenceUpload
} from "./evidence-upload"

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { ReportCategory }
from "@/types/report-category"
import { EvidenceUploadFile } from "@/types/evidence-upload"
import { createReport } from "@/lib/api/reports"
import { useRouter } from "next/navigation"
import router from "next/router"

interface Props {
  categories: ReportCategory[]
}

const ENTITY_TYPES = [
  {
    value: "PERSON",
    label: "Perorangan"
  },
  {
    value: "BUSINESS",
    label: "Perusahaan"
  },
  {
    value: "GOVERNMENT",
    label: "Pemerintah"
  },
  {
    value: "ORGANIZATION",
    label: "Organisasi"
  },
  {
    value: "SCHOOL",
    label: "Pendidikan"
  },
  {
    value: "FOUNDATION",
    label: "Lainnya"
  },
]



export function CreateReportForm({
  categories
}: Props) {

  const form =
    useForm<CreateReportFormData>({
      resolver:
        zodResolver(
          createReportSchema
        ),

      defaultValues: {
        title: "",
        categoryId: "",
        entityName: "",
        entityType: "",
        description: "",
        incidentDate: "",
        location: "",
        estimatedAmount: 0
      }
    })

  async function onSubmit(
  values: CreateReportFormData
) {

  if (
    evidences.length === 0
  ) {

    alert(
      "Minimal 1 bukti harus diupload"
    )

    return
  }

  try {

    const formData =
      new FormData()

    formData.append(
      "title",
      values.title
    )

    formData.append(
      "categoryId",
      values.categoryId
    )

    formData.append(
      "entityName",
      values.entityName
    )

    formData.append(
      "entityType",
      values.entityType
    )

    formData.append(
      "description",
      values.description
    )

    formData.append(
      "incidentDate",
      values.incidentDate
    )

    formData.append(
      "location",
      values.location
    )

    formData.append(
      "estimatedAmount",
      String(
        values.estimatedAmount
      )
    )

    evidences.forEach(
      evidence => {

        formData.append(
          "evidences",
          evidence.file
        )

      }
    )

    for (
  const pair
  of formData.entries()
) {

  console.log(
    pair[0],
    pair[1]
  )

}

    const result =
      await createReport(
        formData,
        ""
      )

    console.log(result)

    router.push(
      "/reports/success"
    )

  } catch (error) {

    alert(
      error instanceof Error
        ? error.message
        : "Failed to create report"
    )

  }
}


  const [evidences, setEvidences] = useState<EvidenceUploadFile[]>([])
  const router = useRouter()

  return (

    <form
      onSubmit={
        form.handleSubmit(
          onSubmit
        )
      }
      className="space-y-6"
    >

      {/* INFORMASI LAPORAN */}
      <Card>
        <FieldGroup className="p-6 space-y-6">

        <h2 className="text-lg font-semibold">
          Informasi Laporan
        </h2>

        <Field>

          <FieldLabel>
            Judul Laporan
          </FieldLabel>

          <FieldContent>

            <Input
              placeholder="Contoh: Dugaan Korupsi Dana Desa"
              {...form.register(
                "title"
              )}
            />

            <FieldError
              errors={[
                form.formState.errors.title
              ]}
            />

          </FieldContent>

        </Field>

        <Field>

          <FieldLabel>
            Kategori
          </FieldLabel>

          <FieldContent>

            <Select
              onValueChange={(value) =>
                form.setValue(
                  "categoryId",
                  value,
                  {
                    shouldValidate: true
                  }
                )
              }
            >

              <SelectTrigger>

                <SelectValue
                  placeholder="Pilih kategori"
                />

              </SelectTrigger>

              <SelectContent>

                {
                  categories.map(
                    category => (

                      <SelectItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </SelectItem>

                    )
                  )
                }

              </SelectContent>

            </Select>

            <FieldError
              errors={[
                form.formState.errors.categoryId
              ]}
            />

          </FieldContent>

        </Field>

        <Field>

          <FieldLabel>
            Deskripsi
          </FieldLabel>

          <FieldContent>

            <Textarea
              rows={8}
              placeholder="Jelaskan kronologi kejadian secara rinci"
              {...form.register(
                "description"
              )}
            />

            <FieldError
              errors={[
                form.formState.errors.description
              ]}
            />

          </FieldContent>

        </Field>

      </FieldGroup>
      </Card>
      

      {/* TARGET ENTITAS */}

      <Card className="p-6 space-y-6">

        <h2 className="text-lg font-semibold">
          Target Entitas
        </h2>

        <Field>

          <FieldLabel>
            Nama Entitas
          </FieldLabel>

          <FieldContent>

            <Input
              placeholder="Contoh: Desa Sukamaju"
              {...form.register(
                "entityName"
              )}
            />

            <FieldError
              errors={[
                form.formState.errors.entityName
              ]}
            />

          </FieldContent>

        </Field>

        <Field>

          <FieldLabel>
            Jenis Entitas
          </FieldLabel>

          <FieldContent>

            <Select
              onValueChange={(value) =>
                form.setValue(
                  "entityType",
                  value,
                  {
                    shouldValidate: true
                  }
                )
              }
            >

              <SelectTrigger>

                <SelectValue
                  placeholder="Pilih jenis entitas"
                />

              </SelectTrigger>

              <SelectContent>

                {
                  ENTITY_TYPES.map(
                    entity => (

                      <SelectItem
                        key={entity.value}
                        value={entity.value}
                      >
                        {entity.label}
                      </SelectItem>

                    )
                  )
                }

              </SelectContent>

            </Select>

            <FieldError
              errors={[
                form.formState.errors.entityType
              ]}
            />

          </FieldContent>

        </Field>

      </Card>

      {/* DETAIL KEJADIAN */}

      <Card className="p-6 space-y-6">

        <h2 className="text-lg font-semibold">
          Detail Kejadian
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <Field>

            <FieldLabel>
              Lokasi Lengkap
            </FieldLabel>

            <FieldContent>

              <Input
                placeholder="Contoh: Harjamukti, Cimanggis, Depok Jl. Putri Tunggal, Jawa Barat"
                {...form.register(
                  "location"
                )}
              />

              <FieldError
                errors={[
                  form.formState.errors.location
                ]}
              />

            </FieldContent>

          </Field>

          <Field>

            <FieldLabel>
              Tanggal Kejadian
            </FieldLabel>

            <FieldContent>

              <Input
                type="date"
                {...form.register(
                  "incidentDate"
                )}
              />

              <FieldError
                errors={[
                  form.formState.errors.incidentDate
                ]}
              />

            </FieldContent>

          </Field>

        </div>

        <Field>

          <FieldLabel>
            Estimasi Kerugian
          </FieldLabel>

          <FieldContent>

            <Input
              type="number"
              placeholder="500000000"
              {...form.register(
                "estimatedAmount",
                {
                  valueAsNumber: true
                }
              )}
            />

            <FieldError
              errors={[
                form.formState.errors.estimatedAmount
              ]}
            />

          </FieldContent>

        </Field>

      </Card>

      <Card className="p-6 space-y-4">

  <h2 className="font-semibold text-lg">
    Bukti Pendukung
  </h2>

  <EvidenceUpload
    evidences={evidences}
    setEvidences={setEvidences}
  />

</Card>

      <Button
        onSubmit={form.handleSubmit(
          onSubmit
        )}
        type="submit"
        size="lg"
        className="w-full"
      >
        Upload Laporan
      </Button>

    </form>

  )
}