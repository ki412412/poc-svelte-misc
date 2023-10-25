import type { PageServerLoad } from './$types';
import { users } from '$lib/users';

export const load = (async () => {
    return {
        users: users
    };
}) satisfies PageServerLoad;