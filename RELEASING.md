# Releasing

## What `VSCE_PAT` is

`vsce publish` authenticates to the Marketplace with an Azure DevOps
**Personal Access Token** (PAT), scoped to `Marketplace: Manage`, read from
the `VSCE_PAT` environment variable. It's set as an `export` line in
`~/.zshrc` on the release machine — not committed anywhere, not stored in
this repo. Tokens expire (30 days if you took the default), so this is a
recurring task, not a one-off.

## Publish a new version

```sh
# bump "version" in package.json first
npx --yes @vscode/vsce publish
```

This packages and uploads in one step. `VSCE_PAT` must already be set in
your shell — see below if `vsce` complains it's missing or invalid.

## Create a new token when the old one expires

1. Go to [marketplace.visualstudio.com/manage/publishers/arr-mckie](https://marketplace.visualstudio.com/manage/publishers/arr-mckie)
   to confirm you're signed in as the account that owns the `arr-mckie`
   publisher (currently `mac@bcs.org`).
2. Go to **dev.azure.com**, sign in with the same account.
   - If it drops you into an org dashboard, skip to step 4.
   - If it asks you to create an organization and then blocks on
     *"Select an Azure subscription for billing"* with no subscriptions
     found — this is a real requirement, not a glitch. Click
     **"Get started with Azure"** and complete the free-trial signup (card
     required for identity verification only; a DevOps org on the free tier
     costs nothing regardless of trial status). Come back to the "Almost
     done…" screen afterwards, pick the new subscription, **Continue**.
3. You should now be at an Azure DevOps org dashboard.
4. Gear icon (top right) → **Personal access tokens** → **+ New Token**.
5. Fill in:
   - **Name**: anything memorable, e.g. `vsce-publish`
   - **Organization**: doesn't matter which one
   - **Expiration**: pick whatever's convenient — longer means less of this
   - **Scopes**: **Custom defined**, then **"Show all scopes"** → find
     **Marketplace** → check **Manage**
6. **Create**, then copy the token shown (long, no dashes, ~52+ chars) —
   it's shown once.
7. Update your shell:
   ```sh
   # edit the existing VSCE_PAT line in ~/.zshrc with the new token, then:
   source ~/.zshrc
   [ -n "$VSCE_PAT" ] && echo "VSCE_PAT is set" || echo "not set"
   ```
8. Retry `npx --yes @vscode/vsce publish`.

## Why this exists as a separate doc

The Azure subscription requirement in step 2 isn't documented anywhere
obvious and looks like a dead end the first time you hit it — worth writing
down once rather than re-discovering it at every token expiry.
