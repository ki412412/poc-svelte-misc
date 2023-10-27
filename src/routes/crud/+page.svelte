<script lang="ts">
    import type { PageData } from './$types';
    import Code from '$lib/Code.svelte';
    
    export let data: PageData;
</script>

<p class="mt-10 text-center text-xl">--- Read ---</p>

<div class="w-fit m-auto text-lg mt-10">
    <div class="mt-8 flex flex-col gap-8 min-w-fit w-64">

        {#each data.users as user}
            <div class="rounded-full bg-white text-center cursor-pointer hover:bg-amber-400 hover:scale-110 ease-in duration-75">
                <a href="/crud/{user.id}" class="px-6 block text-gray-900 rounded-full leading-10">{user.name}</a>
            </div>
        {/each}
        
        <div class="self-center">
            <a href="/crud/create" class=" text-gray-900 leading-10">
                <button class="rounded-full w-32 h-32 bg-white text-center cursor-pointer hover:bg-amber-400 hover:scale-110 ease-in duration-75">
                    Create✨
                </button>
            </a>
        </div>
    </div>
</div>

<section class="mt-10">
    <p class="mt-10 font-mono font-bold text-white text-3xl">💻 Source Code</p>

    <div class="mt-6 flex flex-col gap-6">
        <div>
            <legend>+page.server.svelte</legend>
            <Code url={'https://raw.githubusercontent.com/ki412412/poc-svelte-misc/main/src/routes/crud/%2Bpage.server.ts'}/>
        </div>
        <div class="">
            <legend>+page.svelte</legend>
            <Code url={'https://raw.githubusercontent.com/ki412412/poc-svelte-misc/main/src/routes/crud/%2Bpage.svelte'}/>
        </div>
    </div>
</section>


