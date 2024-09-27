<script>
    import Page from "$lib/Components/Page.svelte";
    import Button from "$lib/Components/ui/Button.svelte";
    import pdf from "$lib/assets/guide.jpg";
    import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import Fa from "svelte-fa";

    function isIE() {
        const ua = window.navigator.userAgent;
        const msie = ua.indexOf("MSIE ");
        const trident = ua.indexOf("Trident/");
        const edge = ua.indexOf("Edge/");
        return msie > 0 || trident > 0 || edge > 0;
    }

    onMount(() => {
        if (isIE()) window.location.href = pdf;
    });
</script>

<Page
    title="Notice de pose - Document Officiel"
    description="Téléchargez le guide de pose de nos produits"
>
    <div class="content">
        <Button
            title="Télécharger le guide de pose"
            icon={faArrowDown}
            url={pdf}
        />

        <iframe
            title="GUIDE DE POSE"
            src={pdf}
            style="aspect-ratio: 16/9;"
            width="100%"
        ></iframe>
    </div>
</Page>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        gap: 20px;

        height: 100%;
    }

    button {
        background-color: var(--second);
        border: none;
        border-radius: var(--radius);
        padding: 10px;
        font-size: 1.5rem;
        cursor: pointer;

        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
