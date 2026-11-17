# Backups

## Page Designer Library Backup

The PD library (`dysonuk-SharedLibrary`) must be exported manually from BM — the API client
doesn't have the `sfcc-site-archive-export` job permission.

### How to export (do this before making PD changes)

1. Log into BM: https://zzse-015.dx.commercecloud.salesforce.com/on/demandware.store/Sites-Site/
2. Go to **Administration → Site Development → Site Import & Export**
3. Under **Export**, select:
   - **Libraries**: `dysonuk-SharedLibrary`
4. Click **Export** — BM runs the job and creates a ZIP in Impex
5. Download the ZIP and place it in this `backups/` folder, e.g. `backups/pd-library-YYYYMMDD.zip`

### How to restore (see revert.sh)

```bash
b2c job import ./backups/pd-library-YYYYMMDD.zip --server zzse-015.dx.commercecloud.salesforce.com --user-auth
```

---

## Git Baseline Tag

The current code baseline is tagged:

```
baseline-dysonuk-20261117
```

To see it:
```bash
git show baseline-dysonuk-20261117 --stat
```

To revert code to this tag, run `./revert.sh` (see below).
