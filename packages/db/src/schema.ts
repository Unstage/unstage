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
    scenarioVersionId: uuid("scenario_version_id"),
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
