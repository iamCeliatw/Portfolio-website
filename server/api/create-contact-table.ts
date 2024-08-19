import { defineEventHandler } from 'h3'
import { sql } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  try {
    const result =
      await sql`CREATE TABLE IF NOT EXISTS Contact ( Name varchar(255), Email varchar(255), Message varchar(255) );`
    event.res.statusCode = 200
    return { result }
  } catch (error) {
    event.res.statusCode = 500
    return { error: error.message }
  }
})
//insert a new contact into the table
// Path: server/api/create-contact.ts
