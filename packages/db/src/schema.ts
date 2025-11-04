import {
  boolean,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["candidate", "recruiter"]);

export const plansEnum = pgEnum("plans", ["trial", "starter", "pro"]);

export const memberRolesEnum = pgEnum("memberRoles", ["owner", "admin", "member"]);

export const organizationInviteStatusEnum = pgEnum("organizationInviteStatus", [
  "pending",
  "accepted",
  "rejected",
  "cancelled",
]);

export const interviewStatusEnum = pgEnum("interviewStatus", [
  "draft",
  "published",
  "completed",
  "cancelled",
]);

export const interviewModeEnum = pgEnum("interviewMode", ["async", "live"]);

export const interviewRunStatusEnum = pgEnum("interviewRunStatus", [
  "started",
  "completed",
  "abandoned",
]);

export const scenarioVisibilityEnum = pgEnum("scenarioVisibility", [
  "public",
  "private",
  "internal",
]);

export const scenarioDifficultyEnum = pgEnum("scenarioDifficulty", [
  "intern",
  "entry-level",
  "mid-level",
  "senior",
  "staff",
  "principal",
  "distinguished",
]);

export const recordingStatusEnum = pgEnum("recordingStatus", [
  "pending",
  "recording",
  "processing",
  "ready",
  "failed",
]);

export const personaRoleEnum = pgEnum("personaRole", [
  "product_manager",
  "tech_lead",
  "senior_engineer",
  "designer",
  "qa_engineer",
  "devops",
  "stakeholder",
]);

export const messageTypeEnum = pgEnum("messageType", [
  "text",
  "code_snippet",
  "file_attachment",
  "system_notification",
]);

export const scriptStepTypeEnum = pgEnum("scriptStepType", [
  "intro",
  "context",
  "requirements",
  "clarification",
  "hint",
  "checkpoint",
]);

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: boolean("email_verified").default(false),
    image: text("image"),
    isOnboarded: boolean("is_onboarded").default(false),
    organizationId: uuid("organization_id"),
    locale: text("locale").default("en"),
    timezone: text("timezone"),
    timezoneAutoSync: boolean("timezone_auto_sync").default(true),
    role: rolesEnum("role"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("users_email_idx").using("btree", table.email.asc().nullsLast()),
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizations.id],
      name: "users_organization_id_fk",
    }).onDelete("set null"),
  ]
);

export const sessions = pgTable("sessions", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  activeOrganizationId: uuid("active_organization_id"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
});

export const verifications = pgTable("verifications", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
});

export const organizations = pgTable("organizations", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text("name"),
  slug: text("slug").unique(),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  plan: plansEnum().default("trial").notNull(),
});

export const members = pgTable(
  "members",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    organizationId: uuid("organization_id").notNull(),
    role: memberRolesEnum().default("member").notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    }).defaultNow(),
  },
  (table) => [
    index("members_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
    index("members_organization_id_idx").using(
      "btree",
      table.organizationId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "members_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizations.id],
      name: "members_organization_id_fk",
    }).onDelete("cascade"),
  ]
);

export const organizationInvites = pgTable(
  "organization_invites",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    email: text("email").notNull(),
    inviterId: uuid("inviter_id").notNull(),
    organizationId: uuid("organization_id").notNull(),
    role: memberRolesEnum().default("member").notNull(),
    status: organizationInviteStatusEnum().default("pending").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("organization_invites_email_idx").using("btree", table.email.asc()),
    index("organization_invites_organization_id_idx").using(
      "btree",
      table.organizationId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.inviterId],
      foreignColumns: [users.id],
      name: "organization_invites_inviter_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizations.id],
      name: "organization_invites_organization_id_fk",
    }).onDelete("cascade"),
  ]
);

export const interviews = pgTable(
  "interviews",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    organizationId: uuid("organization_id").notNull(),
    ownerId: uuid("owner_id").notNull(),
    title: text(),
    description: text(),
    status: interviewStatusEnum().default("draft").notNull(),
    mode: interviewModeEnum().default("async").notNull(),
    timeLimitMinutes: integer("time_limit_minutes"),
    candidateEmail: text("candidate_email"),
    candidateName: text("candidate_name"),
    candidateUserId: uuid("candidate_user_id"), // nullable link if they have an account
    asyncInterviewDeadlineAt: timestamp("async_interview_deadline_at", {
      withTimezone: true,
      mode: "date",
    }),
    liveInterviewStartsAt: timestamp("live_interview_starts_at", {
      withTimezone: true,
      mode: "date",
    }),
    scenarioId: uuid("scenario_id"),
    publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
    archivedAt: timestamp("archived_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("interviews_id_idx").using("btree", table.id.asc().nullsLast().op("uuid_ops")),
    index("interviews_organization_id_idx").using(
      "btree",
      table.organizationId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizations.id],
      name: "interviews_organization_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.ownerId],
      foreignColumns: [users.id],
      name: "interviews_owner_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.candidateUserId],
      foreignColumns: [users.id],
      name: "interviews_candidate_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.scenarioId],
      foreignColumns: [scenarios.id],
      name: "interviews_scenario_id_fk",
    }).onDelete("set null"),
  ]
);

export const interviewInvites = pgTable(
  "interview_invites",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    interviewId: uuid("interview_id").notNull(),
    verificationId: uuid("verification_id").notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true, mode: "date" }),
    revokedAt: timestamp("revoked_at", { withTimezone: true, mode: "date" }),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("interview_invites_interview_id_idx").using(
      "btree",
      table.interviewId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.interviewId],
      foreignColumns: [interviews.id],
      name: "interview_invites_interview_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.verificationId],
      foreignColumns: [verifications.id],
      name: "interview_invites_verification_id_fk",
    }).onDelete("cascade"),
  ]
);

export const interviewRuns = pgTable(
  "interview_runs",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    interviewId: uuid("interview_id").notNull(),
    candidateUserId: uuid("candidate_user_id").notNull(),
    status: interviewRunStatusEnum().default("started").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true, mode: "date" }),
    durationSeconds: integer("duration_seconds"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
  },
  (table) => [
    index("interview_runs_interview_id_idx").using(
      "btree",
      table.interviewId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.interviewId],
      foreignColumns: [interviews.id],
      name: "interview_runs_interview_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.candidateUserId],
      foreignColumns: [users.id],
      name: "interview_runs_candidate_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const apikeys = pgTable(
  "apikeys",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text("name"),
    keyHash: text("key_hash").notNull().unique(),
    userId: uuid("user_id").notNull(),
    organizationId: uuid("organization_id"),
    scopes: text("scopes").array(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true, mode: "date" }),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("apikeys_key_hash_idx").using("btree", table.keyHash.asc().nullsLast()),
    index("apikeys_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
    index("apikeys_organization_id_idx").using(
      "btree",
      table.organizationId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "apikeys_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizations.id],
      name: "apikeys_organization_id_fk",
    }).onDelete("cascade"),
  ]
);

export const scenarios = pgTable(
  "scenarios",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    title: text("title").notNull(),
    description: text("description"),
    content: text("content"),
    visibility: scenarioVisibilityEnum().default("private").notNull(),
    difficulty: scenarioDifficultyEnum(),
    estimatedDurationMinutes: integer("estimated_duration_minutes"),
    roleRelevance: text("role_relevance"),
    techStack: text("tech_stack").array(),
    skills: text("skills").array(),
    organizationId: uuid("organization_id"),
    createdById: uuid("created_by_id"),
    parentScenarioId: uuid("parent_scenario_id"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("scenarios_organization_id_idx").using(
      "btree",
      table.organizationId.asc().nullsLast().op("uuid_ops")
    ),
    index("scenarios_visibility_idx").using("btree", table.visibility.asc()),
    index("scenarios_difficulty_idx").using("btree", table.difficulty.asc().nullsLast()),
    index("scenarios_role_relevance_idx").using("btree", table.roleRelevance.asc().nullsLast()),
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizations.id],
      name: "scenarios_organization_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.createdById],
      foreignColumns: [users.id],
      name: "scenarios_created_by_id_fk",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.parentScenarioId],
      foreignColumns: [table.id],
      name: "scenarios_parent_scenario_id_fk",
    }).onDelete("set null"),
  ]
);


export const interviewRepositories = pgTable(
  "interview_repositories",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    interviewId: uuid("interview_id").notNull(),
    repositoryUrl: text("repository_url").notNull(),
    cloneUrl: text("clone_url").notNull(),
    templateRepositoryUrl: text("template_repository_url"),
    branchName: text("branch_name").default("main"),
    submissionInstructions: text("submission_instructions"),
    setupInstructions: text("setup_instructions"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("interview_repositories_interview_id_idx").using(
      "btree",
      table.interviewId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.interviewId],
      foreignColumns: [interviews.id],
      name: "interview_repositories_interview_id_fk",
    }).onDelete("cascade"),
  ]
);

export const screenRecordings = pgTable(
  "screen_recordings",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    interviewRunId: uuid("interview_run_id").notNull(),
    fileName: text("file_name"),
    filePath: text("file_path"),
    fileSize: integer("file_size"),
    durationSeconds: integer("duration_seconds"),
    status: recordingStatusEnum().default("pending").notNull(),
    uploadUrl: text("upload_url"),
    processingStartedAt: timestamp("processing_started_at", { withTimezone: true, mode: "date" }),
    processingCompletedAt: timestamp("processing_completed_at", {
      withTimezone: true,
      mode: "date",
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("screen_recordings_interview_run_id_idx").using(
      "btree",
      table.interviewRunId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.interviewRunId],
      foreignColumns: [interviewRuns.id],
      name: "screen_recordings_interview_run_id_fk",
    }).onDelete("cascade"),
  ]
);

export const aiPersonas = pgTable(
  "ai_personas",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    scenarioId: uuid("scenario_id").notNull(),
    name: text("name").notNull(),
    avatar: text("avatar"),
    ttsVoiceId: text("tts_voice_id"),
    role: personaRoleEnum().notNull(),
    personality: text("personality"),
    expertise: text("expertise").array(),
    communicationStyle: text("communication_style"),
    systemPrompt: text("system_prompt").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("ai_personas_scenario_id_idx").using(
      "btree",
      table.scenarioId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.scenarioId],
      foreignColumns: [scenarios.id],
      name: "ai_personas_scenario_id_fk",
    }).onDelete("cascade"),
  ]
);

export const chatMessages = pgTable(
  "chat_messages",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    interviewRunId: uuid("interview_run_id"),
    scenarioId: uuid("scenario_id").notNull(),
    personaId: uuid("persona_id"),
    candidateUserId: uuid("candidate_user_id"),
    content: text("content").notNull(),
    messageType: messageTypeEnum().default("text").notNull(),
    isFromCandidate: boolean("is_from_candidate").default(false).notNull(),
    isPreloaded: boolean("is_preloaded").default(false).notNull(),
    metadata: text("metadata"), // JSON for attachments, code snippets, etc.
    sentAt: timestamp("sent_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    readAt: timestamp("read_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("chat_messages_interview_run_id_idx").using(
      "btree",
      table.interviewRunId.asc().nullsLast().op("uuid_ops")
    ),
    index("chat_messages_scenario_id_idx").using(
      "btree",
      table.scenarioId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.interviewRunId],
      foreignColumns: [interviewRuns.id],
      name: "chat_messages_interview_run_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.scenarioId],
      foreignColumns: [scenarios.id],
      name: "chat_messages_scenario_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.personaId],
      foreignColumns: [aiPersonas.id],
      name: "chat_messages_persona_id_fk",
    }).onDelete("set null"),
    foreignKey({
      columns: [table.candidateUserId],
      foreignColumns: [users.id],
      name: "chat_messages_candidate_user_id_fk",
    }).onDelete("set null"),
  ]
);

export const scenarioScripts = pgTable(
  "scenario_scripts",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    scenarioId: uuid("scenario_id").notNull(),
    stepOrder: integer("step_order").notNull(),
    stepType: scriptStepTypeEnum().notNull(),
    personaId: uuid("persona_id"),
    content: text("content").notNull(),
    triggerConditions: text("trigger_conditions"), // JSON for when this step should be presented
    delaySeconds: integer("delay_seconds").default(0),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  },
  (table) => [
    index("scenario_scripts_scenario_id_idx").using(
      "btree",
      table.scenarioId.asc().nullsLast().op("uuid_ops")
    ),
    index("scenario_scripts_step_order_idx").using("btree", table.stepOrder.asc()),
    foreignKey({
      columns: [table.scenarioId],
      foreignColumns: [scenarios.id],
      name: "scenario_scripts_scenario_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.personaId],
      foreignColumns: [aiPersonas.id],
      name: "scenario_scripts_persona_id_fk",
    }).onDelete("set null"),
  ]
);
