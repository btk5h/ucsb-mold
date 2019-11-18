import parse from "date-fns/parse"
import format from "date-fns/format"

export function formatTime(time: string) {
  return format(parse(time, "HH:mm", new Date()), "h:mm a")
}
