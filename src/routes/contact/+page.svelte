<script>
    import Page from "$lib/Components/Page.svelte";
    import Button from "$lib/Components/ui/Button.svelte";
    import Input from "$lib/Components/ui/Input.svelte";
    import { endpoint } from "$lib/store";
    import {
        faInstagram,
        faWhatsapp,
    } from "@fortawesome/free-brands-svg-icons";
    import {
        faArrowRotateBack,
        faEnvelope,
        faPaperPlane,
        faPhone,
        faSearch,
        faUser,
    } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    let nameData = { value: "", valid: true };
    let emailData = { value: "", valid: true };
    let phoneData = { value: "", valid: true };
    let messageData = "";

    function submit() {
        let url = $endpoint + "/contact";

        if (
            nameData.valid &&
            emailData.valid &&
            phoneData.valid &&
            messageData
        ) {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    name: nameData.value,
                    email: emailData.value,
                    message: messageData,
                    phone: phoneData.value,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        nameData.value = "";
                        emailData.value = "";
                        phoneData.value = "";
                        messageData = "";

                        alert("Votre message a été envoyé avec succès.");
                    } else {
                        alert("Une erreur s'est produite. Veuillez réessayer.");
                    }
                })
                .catch((err) => {
                    alert("Une erreur s'est produite. Veuillez réessayer.");
                });
        } else if (
            !(
                nameData.value &&
                emailData.value &&
                phoneData.value &&
                messageData
            )
        ) {
            alert("Veuillez remplir tous les champs.");
        } else {
            alert("Veuillez entrer des informations valides.");
        }
    }
</script>

<Page
    centerX
    title="Contact"
    description="Vous pouvez nous contacter en utilisant le formulaire ci-dessous."
    centerY
>
    <div class="wrapper">
        <div class="info">
            <h1>Contact</h1>
            <p>
                Vous pouvez nous contacter en utilisant le formulaire
                ci-dessous.
            </p>

            <br />

            <a
                class="whatsapp"
                target="_blank"
                href="https://api.whatsapp.com/send?phone=+213559620682&text=Bonjour, je veux passer une commande chez MAISONS D'ANTAN."
            >
                <Fa icon={faWhatsapp} />
                Contactez-nous sur WhatsApp !
            </a>
        </div>

        <div class="form">
            <Input
                placeholder="Nom & Prénom"
                icon={faUser}
                transform={(name) =>
                    name
                        .replace(/\s+/g, " ")
                        .trimStart()
                        .split(" ")
                        .map(
                            (word) =>
                                (word[0] || "").toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                bind:value={nameData.value}
                bind:valid={nameData.valid}
            />

            <Input
                placeholder="Numéro de téléphone"
                icon={faPhone}
                type="tel"
                transform={(phone) =>
                    phone
                        .replace(/\s+/g, "")
                        .replace(/[^0-9+]/g, "")
                        .replace(/^0/, "+213 ")}
                bind:value={phoneData.value}
                bind:valid={phoneData.valid}
            />

            <Input
                placeholder="Email"
                icon={faEnvelope}
                verify={(email) =>
                    !!String(email)
                        .toLowerCase()
                        .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        )}
                transform={(email) =>
                    email.trim().replace(/\s+/g, "").replace(/@+/g, "@")}
                bind:value={emailData.value}
                bind:valid={emailData.valid}
            />

            <Input placeholder="Message" multiline bind:value={messageData} />

            <div class="bottom-info">
                <Button
                    style="width: 100%"
                    title="Envoyer"
                    onClick={() => submit()}
                    icon={faPaperPlane}
                />

                <div class="contact-social">
                    <!-- with style=instagram gradient -->
                    <a
                        target="_blank"
                        href="https://api.whatsapp.com/send?phone=+213559620682&text=Bonjour,%20je%20veux%20passer%20une%20commande%20chez%20MAISONS%20D%27ANTAN."
                    >
                        <Fa icon={faWhatsapp} />
                    </a>

                    <a
                        href="https://instagram.com/maisonsdantan"
                        target="_blank"
                    >
                        <Fa icon={faInstagram} />
                    </a>

                    <a target="_blank" href="tel:+213559620682">
                        <Fa icon={faPhone} />
                    </a>
                </div>
            </div>
        </div>
    </div>
</Page>

<style>
    .contact-social {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
    }

    .contact-social a {
        font-size: 2rem;
        color: var(--secondary);

        transition: transform var(--animation-duration);
    }

    .contact-social a:hover {
        transform: scale(0.9);
    }

    .bottom-info {
        margin-top: 0.2rem;
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;

        gap: 0.8rem;
    }

    .wrapper {
        width: 100%;
        height: 100%;

        max-width: var(--inner-maxw);

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.5rem;
    }

    .info {
        height: fit-content;
    }
</style>
