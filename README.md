# Quasimorph Wiki

Unofficial English fan wiki for Quasimorph 1.0, built with vinext, React, TypeScript, and Tailwind CSS. The site has no accounts, database, or real-time AI calls. All three planning tools run in the visitor's browser.

## Local development

Requires Node.js 22.13+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000/`.

## Validation

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

## Deployment

The included `.openai/hosting.json` and vinext build are ready for Sites/Cloudflare Worker-compatible hosting. Build with `pnpm build`, then publish the generated deployable bundle through the configured hosting workflow.

The intended production hostname is `quasimorphwiki.com`. After a deployment is live, add that custom domain in the hosting dashboard and apply the DNS validation records supplied by the provider.

## Content policy

- First-party Steam announcements and the official Wiki are preferred sources.
- Community claims must be labeled and are never promoted to fact without corroboration.
- Version-sensitive data is omitted or marked `Verification pending` when it cannot be confirmed.
