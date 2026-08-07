const vscode = require('vscode');
const path = require('path');

const DOCS_SEGMENT = `${path.sep}docs${path.sep}`;
const POLL_INTERVAL_MS = 700;

const output = vscode.window.createOutputChannel('Auto Artifact Preview');

// The group we personally opened the render into, last time we did so. We
// deliberately do NOT identify it later by inspecting tab.input type: VS
// Code reports tab.input as undefined for webviews owned by a *different*
// extension (Live Preview owns this one, not us), so instanceof checks can
// never work here. Remembering our own group object sidesteps that.
let previewGroup;

// Saved Claude Artifacts live alongside the topic doc that references them
// (e.g. docs/site/architecture-map.html next to docs/site/architecture.md),
// not in one flat docs/artifacts/ folder — so any HTML anywhere under a
// top-level docs/ tree counts. Site source under public_html/ and generated
// output elsewhere don't match, since neither lives under docs/.
function isArtifactHtml(document) {
  if (!document || document.uri.scheme !== 'file') return false;
  const fsPath = document.uri.fsPath;
  return fsPath.endsWith('.html') && fsPath.includes(DOCS_SEGMENT);
}

function findTabForUri(uri) {
  for (const group of vscode.window.tabGroups.all) {
    for (const tab of group.tabs) {
      if (
        tab.input instanceof vscode.TabInputText &&
        tab.input.uri.toString() === uri.toString()
      ) {
        return tab;
      }
    }
  }
  return undefined;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Closes the tracked preview group once the user has navigated away to a
// different, real editor group. A webview tab can't share a slot with a
// text editor, so opening any other file while the preview is active forces
// VS Code to split beside it; this collapses that split back down. Runs off
// a plain interval rather than a specific VS Code event, since no single
// tab/editor-change event reliably fires for every way this state can arise
// (fresh navigation vs. a restored window layout).
async function closeStalePreviewGroup() {
  if (!previewGroup) return;

  if (previewGroup.tabs.length === 0) {
    previewGroup = undefined; // already closed, by us or by the user
    return;
  }

  if (previewGroup.isActive) return; // user is looking at it right now

  const somethingElseIsActive = vscode.window.tabGroups.all.some(
    (g) => g !== previewGroup && g.isActive && g.tabs.length > 0,
  );
  if (!somethingElseIsActive) return;

  await vscode.window.tabGroups.close(previewGroup);
  previewGroup = undefined;
}

function activate(context) {
  const inFlight = new Set();

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(async (editor) => {
      if (!editor) return;
      const document = editor.document;
      if (!isArtifactHtml(document)) return;

      const key = document.uri.toString();
      if (inFlight.has(key)) return;
      inFlight.add(key);

      try {
        await vscode.commands.executeCommand(
          'livePreview.start.preview.atFile',
          document.uri,
        );
        await delay(300);

        // Re-look-up the source tab now, rather than trusting a reference
        // captured before the preview command ran: on a repeat open, Live
        // Preview reuses the same group as the source tab instead of
        // opening a new one, so a stale group reference would end up
        // closing the render along with the source.
        const sourceTab = findTabForUri(document.uri);
        if (sourceTab) {
          await vscode.window.tabGroups.close(sourceTab);
        }
        await delay(150);

        previewGroup = vscode.window.tabGroups.activeTabGroup;
      } catch (err) {
        output.appendLine(`[error] ${err && err.stack ? err.stack : err}`);
      } finally {
        setTimeout(() => inFlight.delete(key), 1500);
      }
    }),
  );

  const interval = setInterval(() => {
    closeStalePreviewGroup().catch((err) => {
      output.appendLine(
        `[error] poll cleanup failed: ${err && err.stack ? err.stack : err}`,
      );
    });
  }, POLL_INTERVAL_MS);
  context.subscriptions.push({ dispose: () => clearInterval(interval) });
}

function deactivate() {}

module.exports = { activate, deactivate };
