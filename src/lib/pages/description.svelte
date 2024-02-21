<div class="all">
  <div class="every" data-aos="fade-down">
    <div class="logo-sticker" data-aos="zoom-in" data-aos-duration="500">
      <img src="../../../static/images/logo.png" alt="" />
    </div>
    <div class="content">
      <section class="sec1">
        <div class="logo">
          <h1>MAISONS<br />D' ANTAN</h1>
          <br />
        </div>

        <p>
          MAISONS D'ANTAN papiers peints panoramiques, toute la beauté d’un
          paysage peint à la main. Une collection exceptionnelle qui s’enrichit
          chaque année de nouveaux décors. Chaque pièce est un voyage…
        </p>

        <br />

        <div class="socials">
          <i class="fal fa-instagram" />
          <i class="fal fa-facebook" />
          <div class="tiktok">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
              /></svg
            >
          </div>
        </div>
      </section>

      <section class="sec2">
        <div class="standart">
          <div class="link-hold">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#">NOS COLLECTIONS</a>
          </div>
          <div class="link-hold">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#">LA MAISON D'ANTAN</a>
          </div>
          <div class="link-hold">
            <a href="#">RELATIONS PRESSE</a>
          </div>
          <div class="link-hold">
            <a href="#">NOTICE DE POSE</a>
          </div>
          <div class="link-hold">
            <a href="#">FICHE TECHNIQUE</a>
          </div>
          <br />
          <br />
          <div class="link-hold">
            <!-- <hr /> -->

            <a href="#">PROFESSIONNELS DE LA <br />DECORATION</a>
          </div>
          <div class="link-hold">
            <a href="#">Inscrivez-vous</a>
          </div>
        </div>
      </section>

      <section class="sec3">
        <div class="standart">
          <h2>Showroom Alger</h2>
          <h2>RIVE GAUCHE</h2>
          <p>Said Hamdine, Bir Mourad Raïs, Algérie</p>
          <p>TEL: <a href="tel:+213553238410">+213 (0) 553 23 84 10</a></p>
          <u>HORAIRES D'OUVERTURE</u>
          <ul>
            <li>
              <p>De Samedi à Jeudi</p>
            </li>
            <li>
              <p>de 9h jusqu'à 18h</p>
            </li>
          </ul>

          <br /><br />

          <h2>Service Commercial</h2>
          <p>TEL: <a href="tel:+213553238410">+213 (0) 553 23 84 10</a></p>
          <p>
            EMAIL: <a href="mailto:contact@maisonsdantan.ml"
              >contact@maisonsdantan.ml</a
            >
          </p>

          <u>ACCEUIL TELEPHONIQUE</u>
          <p>9h jusqu'à 18h</p>
        </div>
      </section>
    </div>
    <hr />

    <br />
    <p class="end">&copy; 2023 MAISONS D'ANTAN, tout droits réservés.</p>
    <br />
  </div>
</div>

<style>
  .end {
    color: white;
  }

  hr {
    width: calc(100% - 400px);
  }

  section {
    padding: 15px;
    color: white;

    position: relative;

    /* ! */
    width: calc(100% / 3);
  }

  .sec2 {
    display: flex;
    justify-content: center;
  }

  .sec3 * {
    font-family: Montserrat, sans-serif !important;
    line-height: 40px;

    margin: auto;
  }

  .sec3 h2 {
    font-size: 18px;
  }

  .sec3 p,
  .sec3 u {
    font-weight: 200;
    font-size: 16px;
  }

  .sec3 li p {
    line-height: 1px;
  }

  .sec3 ul {
    margin: 0;
  }

  .standart {
    width: fit-content;
    height: fit-content;
  }

  section a {
    font-family: Montserrat, sans-serif;
    text-decoration: none;
    letter-spacing: 1px;
    color: white;
    font-weight: 200;
  }

  section a:hover {
    text-decoration: underline;
  }

  .link-hold:not(:last-child) {
    margin-bottom: 10px;
  }

  .logo {
    width: fit-content;
    height: fit-content;

    margin: auto;
    margin-bottom: 0;
    margin-top: 0;
  }

  /* .logo-img {
    width: 150px;
    filter: invert();
  } */

  .logo h1 {
    font-size: 40px;
    line-height: 33px;
  }

  .all {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
  }

  .logo-sticker {
    transform: translateY(-50%);
    background-color: white;
    padding: 20px;
    border-radius: 50%;

    width: 100px;
    height: 100px;

    position: absolute;
    top: 0;

    border: 5px solid white;
  }

  .logo-sticker img:not(.logo-sticker-img) {
    width: 100%;
    height: 100%;

    /* filter: invert(); */
  }

  .every {
    width: 100%;
    height: fit-content;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgb(29, 29, 29);
    /* border-top: 5px solid white; */
  }

  .content {
    max-width: 1400px;
    width: 100%;
    height: fit-content;

    padding-top: 150px;
    padding-bottom: 75px;

    display: flex;
    justify-content: stretch;
  }

  .socials {
    display: flex;
    flex-direction: row;
    max-width: 110px;
    width: 100%;

    justify-content: space-between;
    align-items: center;
  }

  .socials i {
    font-family: "Font Awesome 5 Brands";
    font-size: 30px;
  }

  .tiktok {
    fill: white;
    width: 25px;
  }

  @media screen and (max-width: 1414px) {
    section {
      padding: 30px;
    }
  }

  @media screen and (max-width: 880px) {
    .content {
      flex-direction: column;
      align-items: center;
    }

    section {
      padding: 0;
      width: fit-content;
    }

    section:not(:first-child) {
      margin-top: 80px;
    }

    .sec1 {
      text-align: center;
      padding: 20px;
    }

    .socials {
      margin: auto;
    }
  }
</style>
