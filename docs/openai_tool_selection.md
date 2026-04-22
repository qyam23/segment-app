# OpenAI Tool Selection for This Repository

## Summary

For this repository, the right Codex tooling setup is minimal:

1. use a repo-local/custom skill for project workflow
2. use React/web-app guidance only when touching React implementation details
3. do not adopt deployment plugins yet
4. do not create a packaged custom plugin yet

## Practical recommendation

- main project workflow: `segment-app-engineering`
- React implementation helper: `build-web-apps:react-best-practices`
- OpenAI documentation questions only: `openai-docs`

## Not needed now

- deployment workflows
- GitHub PR workflows
- Gmail/Calendar/Drive
- Hugging Face
- Android testing
