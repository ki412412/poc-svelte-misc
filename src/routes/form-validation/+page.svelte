<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form);
</script>

<div><a href="/">Go Back</a></div>
<h1 class="mt-10 font-mono font-bold text-white text-9xl text-center">Form Validation</h1>
<p class="mt-10 text-center text-xl">Using Superforms💎</p>

<SuperDebug data={$form} />

<div class="w-fit m-auto text-lg mt-10">
    <form method="POST" class="flex flex-col gap-6" use:enhance>
        <div class="flex flex-col">
            <label for="name">Name</label>
            <input type="text" name="name" aria-invalid={$errors.name ? 'true' : undefined} bind:value={$form.name} {...$constraints.name} class="px-6 text-gray-900 rounded-full leading-10" />
            {#if $errors.name}<span class="text-red-600">{$errors.name}</span>{/if}
        </div>
    
        <div class="flex flex-col">
            <label for="email">E-mail</label>
            <input type="text" name="email" bind:value={$form.email} {...$constraints.email} class="px-6 text-gray-900 rounded-full leading-10" />
            {#if $errors.email}<span class="text-red-600">{$errors.email}</span>{/if}
        </div>
    
        <div class="self-center w-full">
            <button class="rounded-full w-full bg-amber-400 px-10 leading-10">Submit</button>
        </div>
    </form>

</div>
