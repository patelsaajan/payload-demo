/**
 * Check if the database is available.
 * During Docker builds in environments like Railway, the database may not be accessible.
 * This utility allows us to skip static generation when the DB is unavailable.
 */
export function isDatabaseAvailable(): boolean {
  const dbUri = process.env.DATABASE_URI

  // If no database URI is set, assume database is not available
  if (!dbUri) {
    return false
  }

  // If the URI points to localhost, it likely won't be available in Docker build
  // This is common in Railway and similar platforms where the DB is only accessible at runtime
  if (dbUri.includes('127.0.0.1') || dbUri.includes('localhost')) {
    return false
  }

  return true
}
