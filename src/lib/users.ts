import { z } from 'zod';

// See https://zod.dev/?id=primitives for schema syntax
export const userSchema = z.object({
    id: z.string().regex(/^\d+$/),
    name: z.string().min(2),
    email: z.string().email(),
    avatar: z.string().url().optional().nullable(),
});

type UserDB = z.infer<typeof userSchema>[];

// Let's worry about id collisions later
export const userId = () => String(Math.random()).slice(2);

// A simple user "database"
export const users: UserDB = [
    {
        id: userId(),
        name: '🙋‍♂️David Davis',
        email: 'david@example.com',
        avatar: null 
    },
    {
        id: userId(),
        name: '🙋‍♀️Rachel Ray',
        email: 'Rrachel@example.com',
        avatar: null,
    },
    {
        id: userId(),
        name: '🙋George Michel',
        email: 'george@example.com',
        avatar: null,
    }
];