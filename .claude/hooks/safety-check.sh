#!/usr/bin/env bash
# PreToolUse hook for Bash — blocks commands that are irreversible or
# touch shared state. settings.json deny rules are glob-based; this adds
# regex patterns the glob syntax cannot express (e.g. force-push to main).

COMMAND=$(jq -r '.tool_input.command // empty')

[[ -z "$COMMAND" ]] && exit 0

BLOCKED_PATTERNS=(
  'rm -rf (/|~/?)( |$)'
  'rm -rf /\*'
  'git push (--force|-f)[^|;&]*(main|master)'
  'git reset --hard'
  'git clean -[a-z]*f'
  '(npm|pnpm) publish'
  '(^|[;&| ])npm (install|i|ci)( |$)'
  'git add (-A|--all|\.)( |$)'
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "Blocked by .claude/hooks/safety-check.sh: command matches '$pattern'. Use pnpm, stage files by name, and ask the user before destructive git operations." >&2
    exit 2
  fi
done

exit 0
