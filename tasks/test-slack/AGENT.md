# Test Slack Connector

This is a minimal test to verify the Slack MCP connector works in the remote agent environment.

## Step 1 — Discover Slack tools

Use `ToolSearch` with query `"slack"` to find all available Slack tools. Log what you find.

Then use `ToolSearch` with query `"select:<tool_name>"` to load the schemas for:
- The channel search tool (e.g. `slack_search_channels`)
- The send message tool (e.g. `slack_send_message`)

## Step 2 — Find #ai-news channel

Use the channel search tool to find the **#ai-news** channel and get its ID.

## Step 3 — Send a test message

Send this message to #ai-news:

> Slack connector test — sent from remote scheduled agent at [current timestamp]

## Step 4 — Report result

Log whether each step succeeded or failed. If any tool was not found, log the exact ToolSearch results so we can debug.
