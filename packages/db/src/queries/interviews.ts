import type { Database } from "@unstage/db";
import type { InferSelectModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { interviews } from "../schema";

export type Interview = InferSelectModel<typeof interviews>;

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

export async function getInterviewById(db: Database, id: string) {
  const [result] = await db.select().from(interviews).where(eq(interviews.id, id));
  return result;
}

type UpdateInterviewParams = Partial<Omit<CreateInterviewParams, "organizationId" | "ownerId">>;

export async function updateInterview(db: Database, id: string, input: UpdateInterviewParams) {
  const [result] = await db
    .update(interviews)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(interviews.id, id))
    .returning();
  return result;
}
