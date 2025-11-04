"use client";

import { Progress } from "@components/progress";
import { useInterviewQuery } from "@hooks/use-interview";
import { Button } from "@unstage/ui/components/button";
import { cn } from "@unstage/ui/lib/utils";
import { isNonEmpty } from "@utils/index";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const steps = [
  {
    key: "basic",
    title: "Basic information",
    description: "Set the title and a short description of the content covered in the interview.",
  },
  {
    key: "candidate",
    title: "Candidate details",
    description:
      "Add the candidate's name and email address or choose a previously uploaded candidate.",
  },
  {
    key: "delivery",
    title: "Delivery method",
    description:
      "Choose to conduct the interview asynchronously or live, and set the deadline or start time.",
  },
  {
    key: "scenario",
    title: "Scenario configuration",
    description:
      "Select a scenario from our library and customize it to your needs, or create one from your own codebase.",
  },
] as const;

function Step({
  title,
  description,
  index,
  isComplete,
  isActive,
  isLast,
}: {
  title: string;
  description: string;
  index: number;
  isComplete: boolean;
  isActive: boolean;
  isLast: boolean;
}) {
  return (
    <li className="flex gap-2">
      <div className="flex flex-col">
        <span
          className={cn(
            "w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-bold font-display transition-all duration-300 ease-in-out",
            isComplete ? "dark:border-green-500 border-green-600 bg-green-500/15" : "border-border"
          )}
        >
          {index + 1}
        </span>
        {!isLast && <StepSeparator completed={isComplete} />}
      </div>
      <div className="min-w-0">
        <h4
          className={cn(
            "font-semibold truncate transition-colors duration-300 ease-in-out",
            isComplete
              ? "dark:text-green-400/80 text-green-600"
              : isActive
                ? "text-foreground"
                : "text-muted-foreground"
          )}
          title={title}
        >
          {title}
        </h4>
        {!isComplete && <p className="text-xs text-muted-foreground pr-10">{description}</p>}
      </div>
    </li>
  );
}

function StepSeparator({ completed }: { completed: boolean }) {
  return (
    <span
      className={cn(
        "w-px ml-3 transition-all duration-300 ease-in-out",
        completed ? "dark:bg-green-500 bg-green-600 h-6" : "bg-border h-12"
      )}
    />
  );
}

export function SetupChecklist() {
  const params = useParams();
  const interviewId = params.interviewId as string;
  const { data: interview } = useInterviewQuery(interviewId);

  const completion = useMemo(() => {
    const basic = isNonEmpty(interview.title) && isNonEmpty(interview.description);

    const candidate =
      isNonEmpty(interview.candidateUserId) ||
      (isNonEmpty(interview.candidateEmail) && isNonEmpty(interview.candidateName));

    const hasMode = interview.mode === "async" || interview.mode === "live";
    const delivery =
      hasMode &&
      ((interview.mode === "async" && isNonEmpty(interview.asyncInterviewDeadlineAt)) ||
        (interview.mode === "live" && isNonEmpty(interview.liveInterviewStartsAt)));

    const scenario = isNonEmpty(interview.scenarioId);

    const map = { basic, candidate, delivery, scenario };
    const ordered = steps.map((s) => map[s.key as keyof typeof map] ?? false);

    const completedCount = ordered.filter(Boolean).length;
    const progress = completedCount / steps.length;

    const activeIndex = ordered.findIndex((ok) => !ok);
    const activeStep = activeIndex === -1 ? steps.length - 1 : activeIndex;

    return {
      map,
      ordered,
      completedCount,
      progress,
      activeStep,
      allDone: completedCount === steps.length,
    };
  }, [interview]);

  return (
    <div className="flex flex-col gap-2 w-[450px] bg-popover border border-border p-6 h-fit">
      <h3 className="text-lg font-bold font-display">Setup checklist</h3>
      <p className="text-sm text-muted-foreground">
        Complete the steps below to publish your interview and invite the candidate.
      </p>

      <Progress
        value={completion.progress}
        className="mt-2"
        label={`${Math.round(completion.progress * 100)}% complete`}
      />

      <ol className="flex flex-col mt-2 mb-8">
        {steps.map((step, index) => (
          <Step
            key={step.key}
            title={step.title}
            description={step.description}
            index={index}
            isComplete={!!completion.ordered[index]}
            isActive={completion.activeStep === index && !completion.allDone}
            isLast={index === steps.length - 1}
          />
        ))}
      </ol>

      <div className="flex flex-row-reverse gap-2">
        <Button className="w-fit" disabled={!completion.allDone}>
          Publish
        </Button>
        <Button variant="outline" className="w-fit" disabled={!completion.map.scenario}>
          Preview
        </Button>
      </div>
    </div>
  );
}
