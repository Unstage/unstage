import { useQueryStates } from "nuqs";
import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

const scenarioFilterParamsSchema = {
  q: parseAsString,
  stack: parseAsArrayOf(parseAsString),
  level: parseAsString,
  duration: parseAsString,
  role: parseAsString,
  skills: parseAsArrayOf(parseAsString),
};

export function useScenarioFilterParams() {
  const [filter, setFilter] = useQueryStates(scenarioFilterParamsSchema);

  return {
    filter,
    setFilter,
    hasFilters: Object.values(filter).some((value) => value !== null),
  };
}

export const loadScenarioFilterParams = createLoader(scenarioFilterParamsSchema);
