<script>
    import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
    import SvelteFa from "svelte-fa";

    export let text = "";
    export let maxLen = 100;

    function truncate(str, n) {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    // show clickable icon of ">>" from fontawesome
</script>

<span>
    {#if text.length > maxLen}
        {truncate(text, maxLen)}
        <SvelteFa icon={faAngleDoubleRight} />
    {:else}
        {text}
    {/if}
</span>
