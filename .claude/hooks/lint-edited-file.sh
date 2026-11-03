#!/usr/bin/env bash
# PostToolUse hook for Edit|Write — lints the edited file right away so
# Claude fixes problems in the same turn instead of at commit time.
# Exit 2 feeds ESLint output back to Claude; exit 0 stays silent.

FILE_PATH=$(jq -r '.tool_input.file_path // empty')

case "$FILE_PATH" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs) ;;
  *) exit 0 ;;
esac

cd "$CLAUDE_PROJECT_DIR" || exit 0

if ! OUTPUT=$(pnpm exec eslint --max-warnings=0 --no-warn-ignored "$FILE_PATH" 2>&1); then
  echo "ESLint found problems in $FILE_PATH — fix them (do not disable rules):" >&2
  echo "$OUTPUT" >&2
  exit 2
fi

exit 0
