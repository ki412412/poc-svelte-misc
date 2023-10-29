<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import Code from '$lib/Code.svelte';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form);

    function showPreview(event: Event) {
        const target = event.target;
        const files = target.files;

        if (files.length > 0) {
            const src = URL.createObjectURL(files[0]);
            const preview = document.getElementById('avatar-preview') as HTMLImageElement;
            preview.src = src;
        }
    }
</script>

<p class="mt-10 text-center text-xl">--- {!$form.id ? 'Create' : 'Update'} ---</p>

<!-- <SuperDebug data={data}/> -->
<div class="w-fit m-auto text-lg mt-10">
    {#if $message}
        <h3 class="text-center text-lime-400" class:!text-red-600={$page.status >= 400} >{$message}</h3>
    {/if}

    <form method="POST" use:enhance class="flex flex-col gap-6" enctype="multipart/form-data">
        <input type="hidden" name="id" bind:value={$form.id} />
        <div>
            <!-- Avatar -->
            <div>
                <div class="flex items-center justify-center overflow-hidden">
                    <label for="avatar" class="overflow-hidden hover:cursor-pointer">
                        <img class="w-52 aspect-square rounded-full overflow-hidden"
                            id="avatar-preview" 
                            src={data.form.data.avatar ?? `https://ui-avatars.com/api/?name=${$form.name}`}
                            alt="Avatar"
                        />
                    </label>
                    <label for="avatar" class="self-end cursor-pointer -ml-5 hover:text-gray-200">
                        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                    </label>
                </div>
            </div>
            <input class="hidden" type="file" id="avatar" name="avatar" accept=".jpg, .jpeg, .png" on:change={showPreview} />
            {#if $errors.avatar}<span class="text-red-600">{$errors.avatar}</span>{/if}
        </div>
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
            <button formaction="?/update" class="rounded-full w-full bg-amber-400 px-10 leading-10">Submit</button>

            {#if $delayed}Working...{/if}
        
            {#if $form.id}
                <button
                    name="delete"
                    formaction="?/delete"
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
            <Code url={'https://raw.githubusercontent.com/ki412412/poc-svelte-misc/main/src/routes/crud/%5Bid%5D/%2Bpage.server.ts'}/>
        </div>
        <div class="">
            <legend>+page.svelte</legend>
            <Code url={'https://raw.githubusercontent.com/ki412412/poc-svelte-misc/main/src/routes/crud/%5Bid%5D/%2Bpage.svelte'}/>
        </div>
    </div>
</section>
