<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

    export let data: PageData;

    const { form, errors, constraints, enhance, delayed, message } = superForm(data.form);
</script>

<div>
    {#if $page.url.pathname !== `/crud`}
        <a href="/crud">Go Back</a>
    {:else}
        <a href="/">Go Back</a>
    {/if}
</div>
<h1 class="mt-10 font-mono font-bold text-white text-9xl text-center">CRUD</h1>

<slot/>
