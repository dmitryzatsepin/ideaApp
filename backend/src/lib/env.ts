import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const zEnv = z.object({
  PORT: z.string().trim().min(1),
  DATABASE_URL: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  PASSPORT_SALT: z.string().trim().min(1),
  INITIAL_ADMIN_PASSWORD: z.string().trim().min(1),
  WEBAPP_URL: z.string().trim().min(1),
})

// eslint-disable-next-line no-undef
export const env = zEnv.parse(process.env)
