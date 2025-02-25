import { z } from 'zod'
import { zCreateIdeaTrpcInput } from '../../ideas/createIdea/input'

export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput.extend({
  ideaId: z.string().min(1),
})
