# Auto Artifact Preview

VS Code extension. Renders any `.html` file anywhere under a repo's `docs/`
tree (the convention used across these repos for saved Claude Artifacts —
each one lives alongside the topic doc that references it, e.g.
`docs/site/architecture-map.html` next to `docs/site/architecture.md`, not in
one flat `docs/artifacts/` folder) as a live preview instead of showing the
HTML source, and closes the split it creates once you navigate to a different
file.

Unlike the CLI tools in this repo, this isn't consumed via a `file:`/symlink
dependency — VS Code extensions are installed per-machine, not per-repo. Once
installed, it's active in every workspace opened by this VS Code install
automatically; there is nothing to set up in a consuming repo.

Requires the `ms-vscode.live-server` extension (Microsoft's "Live Preview").

Uses the agency Oakroyd gold oakleaf (`icon.png`) as its Extensions-view icon,
so it reads at a glance as one of ours rather than a marketplace install.

## Install / reinstall after an edit

```sh
cd vscode-extensions/auto-artifact-preview
npx --yes @vscode/vsce package --allow-missing-repository --skip-license
code --install-extension auto-artifact-preview-<version>.vsix
rm auto-artifact-preview-<version>.vsix
```

Then reload the VS Code window (Cmd+Shift+P → "Reload Window"). Bump
`version` in `package.json` first if `code --install-extension` doesn't pick
up the change — a same-version reinstall isn't always honored.
