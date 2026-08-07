# Changelog

## 1.2.1

- Added a screenshot to the README (no functional change; version bump
  needed to force a reinstall since same-version reinstalls aren't always
  honoured).

## 1.2.0

- Added two settings so the extension isn't hardcoded to one repo's
  conventions: `autoArtifactPreview.docsFolderNames` (which top-level folder
  names to watch, default `["docs"]`) and
  `autoArtifactPreview.autoClosePreview` (whether to auto-close the preview
  split on navigate-away, default `true`).
- Added package metadata (`repository`, `bugs`, `homepage`, `license`,
  `author`, `keywords`) and rewrote the README for an end user rather than
  just the maintainer.
- Added `LICENSE` (MIT).

## 1.1.0

- Detect artifacts by any `docs/` tree instead of a flat `docs/artifacts/`
  path.
- Added the gold oakleaf icon.

## 1.0.0

- Initial release: auto-renders saved Claude Artifact HTML files under
  `docs/` in Live Preview instead of showing source, and collapses the split
  back down once you navigate away.
