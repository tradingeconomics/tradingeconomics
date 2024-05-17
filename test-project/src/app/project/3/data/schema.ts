import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const staffSchema = z.object({
  id: z.string().optional(),
  accountId: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
  email: z.string(),
  role: z.string(),
  isActive: z.boolean().optional()
})

export type Task = z.infer<typeof staffSchema>
