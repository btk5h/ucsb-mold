import ky from "ky"
import { unstable_createResource as createResource } from "react-cache"
import stringify from "json-stable-stringify"

import { ClassModel, SimpleMessageModel, WebApiInvalidModel } from "api/generated/curriculums"

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
const api = ky.create({ prefixUrl: API_ENDPOINT })

type APIResponse = ClassModel | WebApiInvalidModel | SimpleMessageModel

export type SearchResourceOptions = {
  quarter: string
  subjectCode?: string
}

export const SearchResource = createResource<SearchResourceOptions, APIResponse>(
  async options =>
    api.get("courses/search", { searchParams: {...options, pageSize: 100} as any }).json(),
  JSON.stringify
)
