<script lang="ts">
    import Highlight from "svelte-highlight";
    import typescript from "svelte-highlight/languages/typescript";
    import "svelte-highlight/styles/github.css";

    export let code: string = '';
    export let url: string = '';

    let copied = false;

    if (url) {
        fetchCode(url);
    }

    async function fetchCode(url: string) {
        const response = await fetch(url);
        code = await response.text();
    };
    
    async function copyToClipboard() {
        // copy to clipboard
        await navigator.clipboard.writeText(code);

        // show message and reset after 1 second
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 1500);
    }
</script>

<div class="rounded-lg overflow-hidden bg-white relative">
    <Highlight language={typescript} {code}/>
    <button class="absolute top-4 right-4 z-10" on:click={copyToClipboard}>
        {#if copied}
            <span class="text-green-600 text-sm" >Copied!</span>
        {:else}
            <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
        {/if}
    </button>
</div>

