<script>
  import logo from "$lib/assets/logosmall.png";
  import codiha from "$lib/assets/codiha.svg";
  import footerImage from "$lib/assets/hero.jpg";

  import Logo from "$lib/Components/Logo/Logo.svelte";
  import LinkIcon from "$lib/Components/LinkIcon.svelte";
  import Container from "$lib/Components/Container.svelte";

  import { Fa } from "svelte-fa";
  import { onMount } from "svelte";

  import {
    faPhone,
    faShoppingBag,
    faBook,
    faFileAlt,
    faUserTie,
    faUserPlus,
    faEnvelope,
    faHelmetSafety,
  } from "@fortawesome/free-solid-svg-icons";

  import {
    faInstagram,
    faFacebook,
    faTiktok,
  } from "@fortawesome/free-brands-svg-icons";

  let animate = false;
  let logoElement;

  onMount(() => {
    new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (animate = true)),
      { threshold: 0.5 },
    ).observe(logoElement);
  });
</script>

<div class="wrapper-all">
  <img class="footer-image" src={footerImage} alt="" />

  <footer>
    <div class="sticker" data-aos="zoom-in" data-aos-duration="500">
      <img src={logo} alt="" />
    </div>

    <Container>
      <div class="content" data-aos="fade-down">
        <section class="branding">
          <div class="logo" bind:this={logoElement}>
            <Logo bind:animate />
          </div>

          <p class="description">
            Papiers peints panoramiques, toute la beauté d’un paysage peint à la
            content. Une collection exceptionnelle qui s’enrichit chaque année
            de nouveaux décors. Chaque pièce est un voyage…
          </p>

          <div class="useful">
            <div class="socials">
              <Fa icon={faInstagram} />
              <Fa icon={faFacebook} />
              <Fa icon={faTiktok} class="tiktok" />
            </div>

            <a class="codiha" href="https://www.codiha.com" target="_blank">
              Site réalisé par l'agence
              <img src={codiha} width="15rem" alt="" /> Codiha
            </a>
          </div>
        </section>

        <section class="links">
          <div class="wrapper">
            <LinkIcon
              class="link"
              href="/products"
              icon={faShoppingBag}
              name="Nos Collections"
            />

            <LinkIcon
              class="link"
              href="/guide/notice-de-pose"
              icon={faBook}
              name="Notice de pose"
            />

            <LinkIcon
              class="link"
              href="/guide/fiche-technique"
              icon={faFileAlt}
              name="Fiche technique"
            />

            <LinkIcon
              class="link"
              href="/guide/professionels"
              icon={faHelmetSafety}
              name="Pros de Décoration"
            />

            <LinkIcon
              class="link"
              href="/signup"
              icon={faUserPlus}
              name="Inscrivez-vous"
            />
          </div>
        </section>

        <section class="informations">
          <div class="info">
            <h2>Showroom Alger</h2>
            <p>Said Hamdine, Bir Mourad Raïs, Algérie</p>
          </div>

          <div class="info">
            <u>Acceuil Téléphonique</u>
            <ul>
              <li>
                <p>De Samedi à Jeudi</p>
              </li>
              <li>
                <p>de 9h jusqu'à 18h</p>
              </li>
            </ul>
          </div>

          <div class="info">
            <h2>Service Commercial</h2>

            <LinkIcon
              class="link"
              href="mailto:contact@maisonsdantan.co"
              icon={faEnvelope}
              name="contact@maisonsdantan.co"
            />

            <LinkIcon
              class="link"
              href="tel:+213559620682"
              icon={faPhone}
              name="0559 620 682"
            />
          </div>
        </section>
      </div>
    </Container>
  </footer>

  <p class="copyright">
    {new Date().getFullYear()} MAISONS D'ANTAN, tout droits réservés.
  </p>
</div>

<style>
  .wrapper-all {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
  }

  .footer-image {
    width: 100%;
  }

  .informations {
    display: flex;
    flex-direction: column;

    font-family: var(--f-third);
    gap: calc(var(--gap) / 2);
  }

  .informations .info {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) / 4);
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: fit-content;
    min-height: var(--min-section-height);
    background-color: rgb(29, 29, 29);
    color: white;
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* align-items: flex-start; */
    align-items: center;

    width: 100%;
    padding: calc(var(--gap) * 2) 0;
    gap: var(--gap);
  }

  .content > section {
    flex: 1;
  }

  .codiha {
    opacity: 0.5;
    font-size: 12px;
  }

  .logo {
    width: 100%;
    height: fit-content;

    filter: invert();
  }

  .sticker {
    position: absolute;
    top: 0;
    transform: translateY(-50%);

    background-color: white;

    padding: 1rem;
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }

  .sticker img:not(.sticker-img) {
    width: 100%;
    height: 100%;
  }

  .socials {
    display: flex;
    flex-direction: row;
    max-width: 110px;
    width: 100%;

    justify-content: space-between;
    align-items: center;
  }

  .branding {
    display: flex;
    flex-direction: column;

    gap: calc(var(--gap) / 2);
  }

  .branding .description {
    text-align: justify;
    font-size: 0.8rem;
  }

  .branding .useful {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) / 2);
  }

  .branding .useful .codiha {
    font-size: 0.8rem;
    color: white;
    text-decoration: none;
  }

  .branding .useful .codiha:visited {
    color: white;
  }

  .branding .useful .codiha:hover {
    text-decoration: underline;
  }

  .links {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
  }

  .links :global(.link),
  .info :global(.link) {
    color: white;
    width: 100%;
    letter-spacing: 1px;
    font-family: var(--f-third);
  }

  .links .wrapper {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }

  @media screen and (max-width: 880px) {
    .content {
      flex-direction: column;
      align-items: center;
    }

    section:not(:first-child) {
      margin-top: 80px;
    }
  }
</style>
