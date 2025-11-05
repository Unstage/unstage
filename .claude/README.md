# Claude Code Commands

This directory contains custom slash commands for Claude Code to help with Unstage development.

## Available Commands

### `/setup`
Guides new developers through complete local development setup.

**Use when:**
- Setting up Unstage for the first time
- Onboarding new team members
- After a fresh clone of the repository

**What it does:**
- Checks prerequisites (Node.js, pnpm, PostgreSQL)
- Guides through environment variable setup
- Sets up database with migrations
- Builds all packages
- Starts development servers
- Verifies everything works

**Example:**
```
/setup
```

---

### `/troubleshoot`
Diagnoses and fixes common development issues.

**Use when:**
- Apps won't start
- Getting build errors
- Database connection issues
- Authentication problems
- Any development environment issue

**What it does:**
- Gathers information about the issue
- Provides solutions for common problems
- Runs diagnostic commands
- Offers step-by-step fixes
- Includes troubleshooting checklist

**Example:**
```
/troubleshoot
```

---

### `/add-package`
Guides you through adding a new package or app to the monorepo.

**Use when:**
- Creating a new shared package
- Adding a new app to the workspace
- Need to understand monorepo structure
- Want to follow best practices

**What it does:**
- Creates proper package structure
- Sets up TypeScript configuration
- Adds to workspace
- Ensures proper naming conventions
- Provides best practices

**Example:**
```
/add-package
```

## How to Use

Simply type `/` in Claude Code followed by the command name:

```
/setup
/troubleshoot
/add-package
```

Claude will then guide you through the process interactively, running commands and checking results as needed.

## Creating New Commands

To add more commands, create a new `.md` file in `.claude/commands/`:

```markdown
---
description: Brief description of what this command does
---

Your command prompt goes here. This will be the instructions Claude follows
when the command is invoked.

Include:
- Clear steps
- Code examples
- Troubleshooting tips
- Success criteria
```

Command files support:
- Markdown formatting
- Code blocks
- Step-by-step instructions
- Any instructions you'd give to Claude

## Tips

1. **Be Specific**: Commands work best with clear, specific tasks
2. **Interactive**: Commands can ask questions and adapt based on responses
3. **Combine Tools**: Commands have access to all of Claude's tools (bash, file operations, etc.)
4. **Iterative**: Commands can verify each step before proceeding

## Examples

**Complete setup for new developer:**
```
Hi! I'm new to the team and need to set up Unstage locally.
/setup
```

**Debug a problem:**
```
I'm getting a "port already in use" error when starting the API
/troubleshoot
```

**Add new functionality:**
```
I need to create a new package for PDF generation
/add-package
```

## More Information

- [Claude Code Documentation](https://docs.claude.com/claude-code)
- [Slash Commands Guide](https://docs.claude.com/claude-code/slash-commands)
- [Custom Skills](https://docs.claude.com/claude-code/skills)
