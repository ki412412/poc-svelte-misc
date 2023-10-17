<script lang="ts">
    export let title: string;
    export let url: string;
</script>

<div>
    <a href={url}>
        <div class="rounded-md bg-amber-400 p-10 h-72 w-72 flex justify-center items-center hover:bg-amber-300 hover:translate-x-1 hover:translate-y-1 ease-in duration-100">
            <!-- center text horizontaly and vertiacaly -->
            <div class="text-5xl font-bold">{title}</div>
        </div>
    </a>
</div>