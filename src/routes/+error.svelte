<script>
    import Page from "$lib/Components/Page.svelte";
    import { page } from "$app/stores";
    import {
        faQuestion,
        faExclamationCircle,
    } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    let title = $page.status === 404 ? "Page introuvable" : "Erreur";
    let description =
        $page.status === 404
            ? "La page que vous cherchez n'existe pas."
            : "Une erreur innatendue est survenue.";
</script>

<Page {title} description={description + " | MAISONS D'ANTAN"} centered>
    <div class="error">
        <h1 class="icon" data-aos="fade-right">
            <Fa
                icon={$page.status === 404 ? faQuestion : faExclamationCircle}
            />
        </h1>

        <h1>
            {title}
            {$page?.status ? "(" + $page.status + ")" : ""}
        </h1>
        <p>La page que vous cherchez n'existe pas.</p>

        {#if $page?.error?.message}
            <p>Référence: {$page?.error?.message}</p>
        {/if}

        <a href="/">Retour à la page d'accueil</a>
    </div>
</Page>

<style>
    .icon {
        font-size: 5rem;
        margin-bottom: calc(var(--gap) / 2);
    }

    .error {
        width: 100%;
        height: 100%;

        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .error a {
        margin-top: var(--gap);
    }
</style>
