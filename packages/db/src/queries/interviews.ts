import type { Database } from "@unstage/db";
import { interviews } from "../schema";

type CreateInterviewParams = {
  organizationId: string;
  ownerId: string;
  title: string;
  description?: string;
  mode: "async" | "live";
  timeLimitMinutes?: number;
  candidateEmail?: string;
  candidateName?: string;
  candidateUserId?: string;
  asyncInterviewDeadlineAt?: Date;
  liveInterviewStartsAt?: Date;
};

export async function createInterview(db: Database, input: CreateInterviewParams) {
  const {
    organizationId,
    ownerId,
    title,
    description,
    mode,
    timeLimitMinutes,
    candidateEmail,
    candidateName,
    candidateUserId,
    asyncInterviewDeadlineAt,
    liveInterviewStartsAt,
  } = input;
  return await db
    .insert(interviews)
    .values({
      organizationId,
      ownerId,
      title,
      description,
      mode,
      timeLimitMinutes,
      candidateEmail,
      candidateName,
      candidateUserId,
      asyncInterviewDeadlineAt,
      liveInterviewStartsAt,
    })
    .returning({
      id: interviews.id,
    });
}
