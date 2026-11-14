---
title: "auto-artifact-preview · DEVLOG"
---

# auto-artifact-preview — DEVLOG

What's been done, newest first. Entries before 14 Nov 2026 were backfilled from the git history, grouped by theme within each day.

Release notes for each published version are in [CHANGELOG](../CHANGELOG.md).

## 2026-11-09

- **Obsidian links.** Added Parent/Related footers to the hub note `auto-artifact-preview.md` (parent: the shared hub) so the vault graph hangs together, and fixed a link path in it.
- **Front-matter titles.** `README.md` got a front-matter `title` so notes with the same file name can be told apart in Obsidian.

## 2026-08-16

- **Workspace file.** Added `auto-artifact-preview.code-workspace`, matching the convention used across the other repos.

## 2026-08-08

- **Own public repo.** The extension split out of the private `site-tools` repo into its own public repo; `package.json` now points at it and the publisher id is the real Marketplace one (`arr-mckie`). Because `vsce` rewrites relative README image links against a public repo that now resolves, the screenshot went back to a plain relative link instead of the data-URI workaround.
- **Marketplace release notes.** Added `RELEASING.md`, documenting the `vsce publish` and access-token renewal flow, including the Azure subscription requirement that Microsoft's own docs don't make obvious. The README's Install section now gives the Marketplace install command instead of the pre-publish `.vsix` steps.

## 2026-08-07

- **Detect artifacts anywhere under `docs/` (1.1.0).** Consuming repos had moved saved Claude Artifacts from a flat `docs/artifacts/` folder into topic subfolders, so the hard-coded path match stopped finding anything; it now matches any `.html` under `docs/`. The extension also got its own gold oakleaf icon, regenerated the same day from a source with real transparency rather than a baked-in white background.
- **Shared lint/format style.** `extension.js` and `package.json` were reformatted to the shared ESLint + Prettier config introduced across repos at the time.
- **Configurable and packageable (1.2.0).** Replaced the hard-coded `docs/` check with a `docsFolderNames` setting and added an `autoClosePreview` toggle, so the extension fits repos with other folder conventions. Filled in the package metadata, added `LICENSE` (MIT) and `CHANGELOG.md`, and rewrote the README for end users with a screenshot.
- **README screenshot in the Details tab (1.2.1, 1.2.2).** The screenshot showed as broken in VS Code's Extensions view because relative image links resolve against the `repository` field, which pointed at a private repo. Tried `--no-rewrite-relative-links` first, then embedded the screenshot as a base64 `data:` URI (WebP, resized to 900px); the patch versions were needed because same-version reinstalls aren't reliably picked up.

## 2026-07-26

- **First version.** Added the Auto Artifact Preview VS Code extension: it shows `docs/artifacts/*.html` files as a live render in Live Preview instead of source, and closes the split when you navigate away. It lives outside any single repo because it's installed per machine and applies to all of them.
