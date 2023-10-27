<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import Code from '$lib/Code.svelte';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form);
</script>

<p class="mt-10 text-center text-xl">--- {!$form.id ? 'Create' : 'Update'} ---</p>

<div class="w-fit m-auto text-lg mt-10">
    {#if $message}
        <h3 class="text-center text-lime-400" class:!text-red-600={$page.status >= 400} >{$message}</h3>
    {/if}

    <form method="POST" use:enhance class="flex flex-col gap-6">
        <input type="hidden" name="id" bind:value={$form.id} />
    
        <div class="flex flex-col">
            <label for="name">Name</label>
            <input
                name="name"
                aria-invalid={$errors.name ? 'true' : undefined}
                bind:value={$form.name}
                {...$constraints.name}
                class="px-6 text-gray-900 rounded-full leading-10" 
            />
            {#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
        </div>
    
        <div class="flex flex-col">
            <label for="email">E-mail</label>
            <input
                name="email"
                type="email"
                aria-invalid={$errors.email ? 'true' : undefined}
                bind:value={$form.email}
                {...$constraints.email}
                class="px-6 text-gray-900 rounded-full leading-10" 
            />
            {#if $errors.email}<span class="text-red-600">{$errors.email}</span>{/if}
        </div>

        <div class="mt-3">
            <button class="rounded-full w-full bg-amber-400 px-10 leading-10">Submit</button>

            {#if $delayed}Working...{/if}
        
            {#if $form.id}
                <button
                    name="delete"
                    on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
                    class="mt-3 text-sm text-red-900 text-right w-full bg-transparent hover:text-red-700"
                >
                    Delete this user
                </button>
            {/if}
        </div>
        
    </form>
</div>


<section class="mt-10">
    <p class="mt-10 font-mono font-bold text-white text-3xl">💻 Source Code</p>

    <div class="mt-6 flex flex-col gap-6">
        <div>
            <legend>+page.server.svelte</legend>
            <Code url={'https://raw.githubusercontent.com/ki412412/poc-svelte-misc/main/src/routes/crud/create/%2Bpage.server.ts'}/>
        </div>
        <div class="">
            <legend>+page.svelte</legend>
            <Code url={'https://raw.githubusercontent.com/ki412412/poc-svelte-misc/main/src/routes/crud/create/%2Bpage.svelte'}/>
        </div>
    </div>
</section>

