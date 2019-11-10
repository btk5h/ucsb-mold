import ky from "ky"
import { unstable_createResource as createResource } from "react-cache"

import { QuarterCalendar } from "api/generated/quartercalendar"

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
const api = ky.create({ prefixUrl: API_ENDPOINT })

export const CurrentQuarterResource = createResource<void, QuarterCalendar>(async () =>
  api.get("currentQuarter").json()
)
