# Auto Artifact Preview

VS Code extension. Renders any `docs/artifacts/*.html` file (the convention
used across these repos for saved Claude Artifacts) as a live preview instead
of showing the HTML source, and closes the split it creates once you navigate
to a different file.

Unlike the CLI tools in this repo, this isn't consumed via a `file:`/symlink
dependency — VS Code extensions are installed per-machine, not per-repo. Once
installed, it's active in every workspace opened by this VS Code install
automatically; there is nothing to set up in a consuming repo.

Requires the `ms-vscode.live-server` extension (Microsoft's "Live Preview").

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
