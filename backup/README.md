# Firebase Backup Migration

This folder contains a fallback migration script to copy Firestore data from an old Firebase project into a new Firebase project.

## 1) Prepare env file

```bash
cp backup/.env.backup.example backup/.env.backup.local
```

Fill values using service account credentials for both projects.

## 2) Dry run (recommended first)

```bash
node backup/migrate-firestore.js --env-file=backup/.env.backup.local
```

Set `DRY_RUN=true` in `backup/.env.backup.local` to verify read access without writing.

## 3) Real migration

Set `DRY_RUN=false` and run:

```bash
node backup/migrate-firestore.js --env-file=backup/.env.backup.local
```

## 4) Netlify cutover

After migration finishes:

1. Update Netlify environment variables to the new Firebase project values.
2. Trigger redeploy.
3. Verify auth + Firestore reads/writes on production.

## Notes

- Script migrates top-level collections and all nested subcollections recursively.
- Existing docs in target with same IDs will be overwritten.
- To migrate only selected collections, set `COLLECTIONS=collectionA,collectionB`.
