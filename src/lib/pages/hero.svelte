<div class="hero">
  <div class="info">
    <p data-aos="fade-right" data-aos-duration="2500">
      Le papier peint panoramique...
      <br />L'art du paysage
    </p>
    <p
      class="foo"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="2500"
    >
      par MAISONS D'ANTAN
    </p>
  </div>
</div>

<style>
  @keyframes logo-animation {
    0% {
      stroke-opacity: 0.6;
    }
    15% {
      fill: rgba(62, 62, 62, 0);
    }
    55% {
      stroke-dashoffset: 0;
      stroke-opacity: 1;
    }
    100% {
      fill: var(--two);
      stroke-dashoffset: 0;
      stroke-width: 0;
    }
  }

  .hero {
    background-image: url("../../background2.jpg");
    background-repeat: no-repeat;
    background-position: center center;

    height: calc(100vh);
    background-color: #dcdcdc;

    display: flex;
    justify-content: right;
    align-items: center;

    padding: 80px;
    padding-top: 188.2px;
  }

  @media (max-width: 620px) {
    .hero {
      background-position: center;
    }
  }

  .info {
    text-align: right;
    color: white;
  }

  .info * {
    user-select: none;
  }

  .info p:not(.foo) {
    font-size: 70px;
    font-family: "Gilda Display", serif;

    font-weight: 100;
    color: white;

    letter-spacing: 10px;
  }

  .foo {
    font-size: 30px;
    /* font-family: "Montserrat", sans-serif; */
    font-weight: 500;

    letter-spacing: 0px;

    margin-top: 20px;
  }

  @media screen and (max-width: 820px) {
    .hero {
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .info p {
      text-align: left;
    }
    .info p:not(.foo) {
      font-size: 30px !important;
    }

    .foo {
      font-size: 20px !important;
    }
  }
</style>
