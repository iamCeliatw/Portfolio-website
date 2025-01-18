// server/api/insertData.ts
import { defineEventHandler } from 'h3'
import { sql } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    const result = await sql`
      INSERT INTO Contact (Name, Email, Message)
      VALUES (${body.name}, ${body.email}, ${body.message})
    `

    return { success: true, message: 'Data inserted successfully', result }
  } catch (error) {
    event.res.statusCode = 500
    return { success: false, message: error.message }
  }
})
