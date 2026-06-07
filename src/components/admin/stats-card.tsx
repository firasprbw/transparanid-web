import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

type Color = "blue" | "yellow" | "green" | "purple"

const colorMap: Record<Color, string> = {
  blue:   "bg-blue-50 text-blue-600",
  yellow: "bg-yellow-50 text-yellow-600",
  green:  "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600"
}

interface Props {
  title: string
  value: number
  icon: LucideIcon
  color: Color
}

export function StatsCard({ title, value, icon: Icon, color }: Props) {
  return (
    <Card className="p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value ?? 0}</p>
      </div>
    </Card>
  )
}