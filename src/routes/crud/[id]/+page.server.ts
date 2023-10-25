import { superValidate, message } from 'sveltekit-superforms/server';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

import { users, userId, userSchema } from '$lib/users';

const crudSchema = userSchema.extend({
    id: userSchema.shape.id.optional()
});

export const load = async ({ url, params }) => {
    // READ user
    const user = users.find((u) => u.id == params.id);
    console.log(users);

    if (params.id && !user) throw error(404, 'User not found.');

    // If user is null, default values for the schema will be returned.
    const form = await superValidate(user, crudSchema);
    return { form, users };
};

export const actions: Actions = {
    update: async ({ request }) => {
        const formData = await request.formData();
        const form = await superValidate(formData, crudSchema);

        if (formData.has('delay')) {
            await new Promise((r) => setTimeout(r, 2000));
        }

        if (!form.valid) return fail(400, { form });

        const index = users.findIndex((u) => u.id == form.data.id);
        if (index == -1) throw error(404, 'User not found.');

        // UPDATE user
        users[index] = { ...form.data, id: form.data.id };
        return message(form, 'Updated!');
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const form = await superValidate(formData, crudSchema);

        if (formData.has('delay')) {
            await new Promise((r) => setTimeout(r, 2000));
        }

        if (!form.valid) return fail(400, { form });

        const index = users.findIndex((u) => u.id == form.data.id);
        if (index == -1) throw error(404, 'User not found.');

        // DELETE user
        users.splice(index, 1);
        throw redirect(303, '/crud');
    }
};