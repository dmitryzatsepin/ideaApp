import cors from 'cors'
import express from 'express'
import { applyTrpcToExpressApp } from './lib/trpc'
import { createAppContext, type AppContext } from './lib/ctx'
import { trpcRouter } from './router'
import { applyPassportToExpressApp } from './lib/passport'
import { env } from './lib/env'
import { presetDb } from './scripts/presetDb'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    await presetDb(ctx)
    const expressApp = express()
    expressApp.use(cors())
    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })
    applyPassportToExpressApp(expressApp, ctx)
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    expressApp.listen(env.PORT, () => {
      console.info(`Server is running on http://localhost:${env.PORT}`)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
