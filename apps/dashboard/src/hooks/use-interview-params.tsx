import { useQueryStates } from "nuqs";
import { createLoader, parseAsBoolean, parseAsString } from "nuqs/server";

const interviewParamsSchema = {
  selectedCandidateId: parseAsString,
  create: parseAsBoolean,
  interviewId: parseAsString,
};

export function useInterviewParams() {
  const [params, setParams] = useQueryStates(interviewParamsSchema);

  return {
    ...params,
    setParams,
  };
}

export const loadInterviewParams = createLoader(interviewParamsSchema);
