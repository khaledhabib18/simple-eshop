import { string, z } from "zod";

export const ProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.float32(),
    tags: z.array(z.string()),
});
