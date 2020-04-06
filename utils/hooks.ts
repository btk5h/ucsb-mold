import { useEffect, useState, useCallback } from "react";
import Router, { useRouter } from "next/router";
import { useShallowCompareEffect } from "react-use";
import qs from "qs";

type FilterObjectPredicate = {
  (key: string, value: any): boolean;
};

function filterObject(
  obj: any,
  keysOrPredicate: string[] | FilterObjectPredicate
): any {
  // TODO: figure out how to properly express this in TypeScript, move to separate module
  if (!obj) {
    return {};
  }

  const result: any = {};

  const predicate: FilterObjectPredicate =
    typeof keysOrPredicate === "function"
      ? keysOrPredicate
      : (key) => keysOrPredicate.includes(key);

  for (const key of Object.keys(obj)) {
    if (predicate(key, obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
}

function deriveStateFromUrl<T extends any>(url: string, schema: T): T {
  const queryKeys = Object.keys(schema);
  const parsedQuery = qs.parse(url.split("?")[1]);
  const filteredQuery = filterObject(parsedQuery, queryKeys);

  for (const key of queryKeys) {
    if (!filteredQuery[key]) {
      filteredQuery[key] = schema[key];
    }
  }

  return filteredQuery;
}

type UseManagedQuerySetterHook<T> = {
  <K extends keyof T>(key: K): (newValue: T[K]) => void;
};

export function useManagedQuery<T>(
  schema: T
): [T, UseManagedQuerySetterHook<T>] {
  const router = useRouter();

  const [state, setState] = useState(() =>
    deriveStateFromUrl(router.asPath, schema)
  );

  useShallowCompareEffect(() => {
    const normalizedQuery = filterObject(state, (key, value) => value);
    const query = qs.stringify(normalizedQuery, { arrayFormat: "repeat" });

    Router.push(`${Router.route}?${query}`, `${Router.route}?${query}`, {
      shallow: true,
    });
  }, [state]);

  useEffect(() => {
    const handler = (url: string) => {
      setState(deriveStateFromUrl(url, schema));
    };

    Router.events.on("beforeHistoryChange", handler);

    return () => {
      Router.events.off("beforeHistoryChange", handler);
    };
  }, [schema]);

  const useSetterHook: UseManagedQuerySetterHook<T> = useCallback((key) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useCallback(
      (newValue) => {
        setState(
          (currentState) =>
            ({
              ...currentState,
              [key]: newValue,
            } as T)
        );
      },
      [key]
    );
  }, []);

  return [state, useSetterHook];
}
