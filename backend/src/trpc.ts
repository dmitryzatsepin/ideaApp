// import { initTRPC } from '@trpc/server'
// import _ from 'lodash'
// import { z } from 'zod'

// const trpc = initTRPC.create()

// // console.log(ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])))

// export const trpcRouter = trpc.router({
//   getIdeas: trpc.procedure.query(() => {
//     return { ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])) }
//   }),
//   getIdea: trpc.procedure
//     .input(
//       z.object({
//         ideaNick: z.string(),
//       })
//     )
//     .query(({ input }) => {
//       const idea = ideas.find((idea) => idea.nick === input.ideaNick)
//       return { idea: idea || null }
//     }),
// })

// export type TrpcRouter = typeof trpcRouter
