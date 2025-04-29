import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

// Configure Neon-specific connection settings
const migrationClient = postgres(process.env.DATABASE_URL!, {
  max: 1,
  ssl: 'require', // Neon requires SSL
  idle_timeout: 20, // Recommended for serverless
  connect_timeout: 30, // Give Neon more time to spin up
})

const main = async () => {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: 'drizzle/migrations',
    })

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Error during migration:', error)
    process.exit(1) // Exit with error code
  } finally {
    await migrationClient.end() // Ensure connection is closed
  }
}

main()