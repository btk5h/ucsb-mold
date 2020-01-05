import { useHistory, useLocation } from "react-router"
import qs from "qs"
import { useEffect, useRef } from "react"
import deepEqual from "fast-deep-equal"

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

export function useDeepMemo<T>(obj: T): T {
  const cachedObject = useRef(obj)

  if (!deepEqual(obj, cachedObject.current)) {
    cachedObject.current = obj
  }

  return cachedObject.current
}
