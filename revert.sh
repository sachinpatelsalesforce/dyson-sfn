#!/usr/bin/env bash
# Revert storefront to the baseline-dysonuk-20261117 tag.
# Run from the project root: bash revert.sh
# Optionally pass a PD library backup zip to also restore PD content:
#   bash revert.sh ./backups/pd-library-20261117.zip

set -euo pipefail

TAG="baseline-dysonuk-20261117"
SERVER="zzse-015.dx.commercecloud.salesforce.com"
PD_BACKUP="${1:-./backups/dysonuk-pd-backup-20261117.zip}"

echo ""
echo "=== Reverting code to $TAG ==="
echo ""

# 1. Confirm the tag exists
if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "ERROR: Tag '$TAG' not found. Run: git fetch --tags"
  exit 1
fi

# 2. Reset working tree to the tag (keeps branch pointer on main)
git checkout "$TAG" -- .
echo "✓ Files reset to $TAG"

# 3. Rebuild
echo ""
echo "=== Building ==="
pnpm build
echo "✓ Build complete"

# 4. Push to MRT
echo ""
echo "=== Pushing to MRT ==="
pnpm push
echo "✓ Bundle pushed — allow ~3 min for MRT redeploy"

# 5. Redeploy cartridge (requires browser login)
echo ""
echo "=== Deploying cartridge (browser login required) ==="
node_modules/.bin/sfnext deploy-cartridge --user-auth
echo "✓ Cartridge deployed"

# 6. Optionally restore PD library
if [[ -n "$PD_BACKUP" ]]; then
  if [[ ! -f "$PD_BACKUP" ]]; then
    echo ""
    echo "WARNING: PD backup file not found: $PD_BACKUP — skipping PD restore"
  else
    echo ""
    echo "=== Restoring Page Designer library from $PD_BACKUP ==="
    b2c job import "$PD_BACKUP" \
      --server "$SERVER" \
      --user-auth \
      --show-log
    echo "✓ PD library restored — republish pages in BM if needed"
  fi
else
  echo ""
  echo "NOTE: No PD backup supplied. If you need to restore PD content, run:"
  echo "  b2c job import ./backups/<backup>.zip --server $SERVER --user-auth"
  echo "Then republish the homepage in BM Page Designer."
fi

echo ""
echo "=== Revert complete ==="
echo "Live URL: https://sekitzzsecc41ba08599f2c8e.zzse-015.my.commercecloud.salesforce.com/dysonuk/en-US/"
