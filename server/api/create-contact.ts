// server/api/insertData.ts
import { defineEventHandler } from 'h3'
import { sql } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  // 解析请求体中的数据
  const body = await readBody(event)

  try {
    // 插入数据到数据库表中
    const result = await sql`
      INSERT INTO Contact (Name, Email, Message)
      VALUES (${body.name}, ${body.email}, ${body.message})
    `

    // 返回成功响应
    return { success: true, message: 'Data inserted successfully', result }
  } catch (error) {
    // 返回错误响应
    event.res.statusCode = 500
    return { success: false, message: error.message }
  }
})
