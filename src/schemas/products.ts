import { string, z } from "zod";

export const ProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.float32(),
    inStock: z.int(),
    tags: z.array(z.string()),
    images: z.array(z.string()),
});
