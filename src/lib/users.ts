import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// See https://zod.dev/?id=primitives for schema syntax
export const userSchema = z.object({
    id: z.string().regex(/^\d+$/),
    name: z.string().min(2),
    email: z.string().email(),
    avatar: z.string().url().optional(),
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
        photo: null 
    },
    {
        id: userId(),
        name: '🙋‍♀️Rachel Ray',
        email: 'Rrachel@example.com',
        photo: null,
    },
    {
        id: userId(),
        name: '🙋George Michel',
        email: 'george@example.com',
        photo: null,
    }
];