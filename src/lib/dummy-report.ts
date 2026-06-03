import { FeedReport } from "@/types/feed-report"

export const dummyReports: FeedReport[] = [
  {
    id: "1",
    slug: "dana-bos-sman-1",

    title: "Dugaan Penyalahgunaan Dana BOS Tahun 2025",

    description:
      "Terdapat dugaan penggunaan dana BOS yang tidak sesuai dengan laporan realisasi yang dipublikasikan kepada masyarakat.",

    location: "Bekasi",

    estimated_amount: 500_000_000,

    reaction_count: 124,
    comment_count: 38,

    created_at: "2026-05-30",

    has_response: true,

    category: {
      id: "1",
      name: "Dana BOS"
    },

    entity: {
      id: "1",
      display_name: "SMA Negeri 1 Bekasi"
    },

    evidences: [
      {
        id: "1",
        file_url: "https://placehold.co/600x400",
        file_type: "IMAGE"
      },
      {
        id: "2",
        file_url: "https://placehold.co/600x400",
        file_type: "IMAGE"
      }
    ]
  },

  {
    id: "2",
    slug: "pengadaan-laptop",

    title: "Pengadaan Laptop Tidak Sesuai Spesifikasi",

    description:
      "Barang yang diterima tidak sesuai dengan spesifikasi yang tercantum pada dokumen pengadaan.",

    location: "Bandung",

    estimated_amount: 1_500_000_000,

    reaction_count: 281,
    comment_count: 74,

    created_at: "2026-05-28",

    has_response: false,

    category: {
      id: "2",
      name: "Pengadaan Barang"
    },

    entity: {
      id: "2",
      display_name: "Dinas Pendidikan Kota Bandung"
    },

    evidences: [
      {
        id: "1",
        file_url: "https://placehold.co/600x400",
        file_type: "IMAGE"
      }
    ]
  },

  {
    id: "3",
    slug: "renovasi-jalan",

    title: "Kualitas Renovasi Jalan Diduga Tidak Sesuai Anggaran",

    description:
      "Aspal mengalami kerusakan hanya beberapa minggu setelah proyek selesai dikerjakan.",

    location: "Surabaya",

    estimated_amount: 850_000_000,

    reaction_count: 95,
    comment_count: 17,

    created_at: "2026-05-25",

    has_response: true,

    category: {
      id: "3",
      name: "Infrastruktur"
    },

    entity: {
      id: "3",
      display_name: "Dinas PUPR Kota Surabaya"
    },

    evidences: [
      {
        id: "1",
        file_url: "https://placehold.co/600x400",
        file_type: "IMAGE"
      },
      {
        id: "2",
        file_url: "https://placehold.co/600x400",
        file_type: "IMAGE"
      },
      {
        id: "3",
        file_url: "https://placehold.co/600x400",
        file_type: "IMAGE"
      }
    ]
  }
]