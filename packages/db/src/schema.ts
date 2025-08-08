import {
  boolean,
  foreignKey,
  index,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["candidate", "recruiter"]);

export const plansEnum = pgEnum("plans", ["trial", "starter", "pro"]);

export const teamRolesEnum = pgEnum("teamRoles", ["owner", "member"]);

export const interviewStatusEnum = pgEnum("interviewStatus", [
  "draft",
  "scheduled",
  "completed",
  "cancelled",
]);

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    fullName: text("full_name"),
    email: text("email").unique(),
    emailVerified: boolean("email_verified").default(false),
    avatarUrl: text("avatar_url"),
    teamId: uuid("team_id"),
    isOnboarded: boolean("is_onboarded").default(false),
    locale: text("locale").default("en"),
    timezone: text("timezone"),
    timezoneAutoSync: boolean("timezone_auto_sync").default(true),
    role: rolesEnum("role"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("users_email_idx").using("btree", table.email.asc().nullsLast()),
    index("users_team_id_idx").using("btree", table.teamId.asc().nullsLast().op("uuid_ops")),
    foreignKey({
      columns: [table.teamId],
      foreignColumns: [teams.id],
      name: "users_team_id_fk",
    }).onDelete("set null"),
  ]
);

export const sessions = pgTable("sessions", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
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
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
});

export const verifications = pgTable("verifications", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
});

export const teams = pgTable("teams", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  name: text(),
  logoUrl: text("logo_url"),
  canceledAt: timestamp("canceled_at", {
    withTimezone: true,
    mode: "string",
  }),
  plan: plansEnum().default("trial").notNull(),
});

export const usersOnTeam = pgTable(
  "users_on_team",
  {
    userId: uuid("user_id").notNull(),
    teamId: uuid("team_id").notNull(),
    id: uuid().defaultRandom().notNull(),
    role: teamRolesEnum(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
  },
  (table) => [
    index("users_on_team_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("uuid_ops")
    ),
    index("users_on_team_team_id_idx").using(
      "btree",
      table.teamId.asc().nullsLast().op("uuid_ops")
    ),
    primaryKey({ columns: [table.userId, table.teamId, table.id], name: "users_on_team_pk" }),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "users_on_team_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.teamId],
      foreignColumns: [teams.id],
      name: "users_on_team_team_id_fk",
    }).onDelete("cascade"),
  ]
);

export const interview = pgTable(
  "interviews",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    title: text(),
    description: text(),
    status: interviewStatusEnum(),
    startAt: timestamp("start_at", { withTimezone: true, mode: "string" }),
    endAt: timestamp("end_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [index("interviews_id_idx").using("btree", table.id.asc().nullsLast().op("uuid_ops"))]
);

export const interviewParticipants = pgTable(
  "interview_participants",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    interviewId: uuid("interview_id").notNull(),
    userId: uuid("user_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("interview_participants_interview_id_idx").using(
      "btree",
      table.interviewId.asc().nullsLast().op("uuid_ops")
    ),
    index("interview_participants_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("uuid_ops")
    ),
    foreignKey({
      columns: [table.interviewId],
      foreignColumns: [interview.id],
      name: "interview_participants_interview_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "interview_participants_user_id_fk",
    }).onDelete("cascade"),
  ]
);

export const interviewInvites = pgTable(
  "interview_invites",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    email: text("email").notNull(),
    interviewId: uuid("interview_id").notNull(),
    verificationId: uuid("verification_id").notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("interview_invites_email_idx").using("btree", table.email.asc()),
    foreignKey({
      columns: [table.interviewId],
      foreignColumns: [interview.id],
      name: "interview_invites_interview_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.verificationId],
      foreignColumns: [verifications.id],
      name: "interview_invites_verification_id_fk",
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
    teamId: uuid("team_id"),
    scopes: text("scopes").array(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true, mode: "string" }),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("apikeys_key_hash_idx").using("btree", table.keyHash.asc().nullsLast()),
    index("apikeys_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
    index("apikeys_team_id_idx").using("btree", table.teamId.asc().nullsLast().op("uuid_ops")),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "apikeys_user_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.teamId],
      foreignColumns: [teams.id],
      name: "apikeys_team_id_fk",
    }).onDelete("cascade"),
  ]
);
