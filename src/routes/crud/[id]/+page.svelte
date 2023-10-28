<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import Code from '$lib/Code.svelte';

	export let data: PageData;

	const { form, errors, constraints, enhance, delayed, message } = superForm(data.form);

    let photoPreview: string | ArrayBuffer | null;
    let fileinput; // file input element

    function previewPhoto(e: Event) {
        const image = e.target?.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            photoPreview = e.target.result
        };
    }
</script>

<p class="mt-10 text-center text-xl">--- {!$form.id ? 'Create' : 'Update'} ---</p>

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
                    <div class="overflow-hidden">
                        {#if photoPreview}
                            <img class=" w-52 aspect-square rounded-full overflow-hidden" src={photoPreview} alt="Avatar" />
                        {:else}
                            {#if $form.avatar}
                                <img class=" w-52 aspect-square rounded-full overflow-hidden" src="{$form.avatar}" alt="Avatar" />
                            {:else}
                            <figure>
                                <svg class="w-52 h-52"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>                                  
                            </figure>
                            {/if}
                        {/if}
                    </div>
                    <button type="button" on:click={()=>{fileinput.click()}} class="self-end cursor-pointer -ml-5 hover:text-gray-200">
                        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                    </button>
                </div>
            </div>
            <input class="hidden" type="file" name="avatar" accept=".jpg, .jpeg, .png" on:change={(e)=>previewPhoto(e)} bind:this={fileinput} >
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
