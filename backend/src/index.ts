import cors from 'cors'
import express from 'express'
import { applyTrpcToExpressApp } from './lib/trpc'
import { type AppContext, createAppContext } from './lib/ctx'
import { trpcRouter } from './router'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors())
    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    const PORT = 3000
    expressApp.listen(PORT, () => {
      console.info(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
