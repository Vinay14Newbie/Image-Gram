import {z} from 'zod';

export const zodPostSchema = z.object({
    caption: z.string({message: "caption is required"}).min(1),   //this is how we can give custom error message
})