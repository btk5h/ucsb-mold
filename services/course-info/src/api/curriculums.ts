import fetch from "node-fetch"
import qs from "qs"

import Curriculums from "./generated/curriculums"

export async function search(params: any): Promise<Curriculums.ClassModel> {
  const { apiKey = process.env.UCSB_API_KEY, ...other } = params

  const queryParams = qs.stringify(other)
  const baseUrl = "https://api.ucsb.edu/academics/curriculums/v1/classes/search"
  const url = `${baseUrl}?${queryParams}`

  const response = await fetch(url, {
    headers: {
      "ucsb-api-key": apiKey
    }
  })

  return response.json()
}
