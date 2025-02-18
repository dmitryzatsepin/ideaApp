import crypto from 'crypto'
import { env } from '../lib/env'

export const getPasswordHash = (password: string) => {
  return crypto.createHash('sha256').update(`${env.PASSPORT_SALT}${password}`).digest('hex')
}
