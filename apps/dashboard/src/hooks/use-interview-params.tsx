import { useQueryStates } from "nuqs";
import { createLoader, parseAsString, parseAsStringEnum } from "nuqs/server";

const interviewParamsSchema = {
  selectedCandidateId: parseAsString,
  type: parseAsStringEnum(["edit", "create", "details"]),
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
