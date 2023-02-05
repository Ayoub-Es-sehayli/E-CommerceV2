import { z } from "zod";


export const ProductCategorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2),
  hasParent: z.boolean().default(false),
  parentId: z.number().optional(),
});

export type ProductCategoryDto = z.infer<typeof ProductCategorySchema>;
