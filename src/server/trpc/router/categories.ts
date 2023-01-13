import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const categoriesRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const categoriesDB = await ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        parentId: true,
      },
    });

    return categoriesDB;
  }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        hasParent: z.boolean().default(false),
        parentId: z.number().min(1).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.category.create({
          data: {
            name: input.name,
            parentId: input.parentId,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    try {
      await ctx.prisma.category.delete({
        where: {
          id: input,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.number().min(1),
        name: z.string().min(2),
        hasParent: z.boolean().default(false),
        parentId: z.number().min(1).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.category.update({
        where: { id: input.id },
        data: {
          name: input.name,
          parentId: input.parentId,
        },
      });
    }),
});

export default categoriesRouter;
