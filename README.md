# AI Rejig Scheduled Outputs

Private repo for Claude Code scheduled agents running for RT / AI Rejig Labs.

## Structure

```
tasks/                      ← one folder per scheduled task
  daily-ai-brief/
    AGENT.md                ← instructions the cloud agent follows
    references/             ← context files (rt-profile, etc.)
  good-morning/
    AGENT.md
outputs/                    ← all agent outputs land here
  briefs/                   ← daily AI briefs (YYYY-MM-DD.md)
```

## Active Scheduled Tasks

| Task | Schedule | Trigger ID |
|------|----------|------------|
| Daily AI Brief | 7am Bangkok daily | trig_01BeTByj3WSkovYiHmR6ypzb |

## Adding a New Task

1. Create `tasks/your-task-name/AGENT.md` with the instructions
2. Create a new trigger on Claude Code pointing to this repo
3. Set the trigger prompt to: "Read tasks/your-task-name/AGENT.md and follow it exactly."
4. Add the task to the table above
