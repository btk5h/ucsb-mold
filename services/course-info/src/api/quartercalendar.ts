import fetch from "node-fetch"

import QuarterCalendar from "./generated/quartercalendar"

export async function currentQuarter(
  params: any = {}
): Promise<QuarterCalendar.QuarterCalendar> {
  const { apiKey = process.env.UCSB_API_KEY } = params

  const baseUrl =
    "https://api.ucsb.edu/academics/quartercalendar/v1/quarters/current"

  const response = await fetch(baseUrl, {
    headers: {
      "ucsb-api-key": apiKey
    }
  })

  return response.json()
}
