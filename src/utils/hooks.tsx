import { useHistory, useLocation } from "react-router"
import qs from "qs"
import { useEffect } from "react"

export function useQuery() {
  const location = useLocation()
  return qs.parse(location.search, { ignoreQueryPrefix: true })
}

export function useObjectInURL(query: any) {
  const history = useHistory()
  const search = qs.stringify(query, { arrayFormat: "repeat" })

  useEffect(() => {
    history.replace({ search })
  }, [history, search])
}
