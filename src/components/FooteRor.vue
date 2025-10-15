<template>
  <footer class="footer-inspirado-italia">
    <div class="footer-main">
      <div class="footer-col footer-bemvindo">
        <h3>BEM VINDO</h3>
        <hr />
        <p>
          Com mais de 20 anos de tradição. Além de pizzas artesanais, oferecemos combos, massas, bebidas e sobremesas típicas italianas.<br>
          Ambiente acolhedor e atendimento especial para você e sua família.
        </p>
        <div class="footer-social-circles">
          <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" class="footer-social-icon" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" class="footer-social-icon" />
          </a>
          <a href="https://wa.link/h475ec" target="_blank" aria-label="Whatsapp">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="Whatsapp" class="footer-social-icon" />
          </a>
        </div>
      </div>
      <div class="footer-col footer-facebook">
        <h3>CURTA NOSSA PÁGINA</h3>
        <hr />
        <div class="footer-fb-box">
          <img src="/src/assets/imagens/estrela.png" alt="Facebook" class="fb-img" />
          <span class="fb-title">Santory Pizzaria</span>
          <span class="fb-sub">Siga-nos no Facebook</span>
        </div>
      </div>
    </div>
    <div class="footer-bar-inspirado">
      <span>
        Copyright {{ new Date().getFullYear() }} © Santory Pizzaria | Joinville - SC |
        <a href="mailto:contato@santory.com">contato@santory.com</a>
      </span>
      <span class="footer-agencia">Desenvolvido por Higor do Amaral Fritz</span>
    </div>
  </footer>
</template>

<style scoped>
.footer-inspirado-italia {
  background: linear-gradient(120deg, #181d1b 80%, #b33c1a 100%);
  color: #fff;
  font-family: 'Montserrat', 'Playfair Display', serif;
  margin-top: 40px;
  border-top: 4px solid #b33c1a;
  box-shadow: 0 -4px 32px #b33c1a22;
  position: relative;
}
.footer-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 32px 32px 32px;
  gap: 3.5rem;
  position: relative;
  z-index: 1;
}
.footer-col {
  flex: 1 1 320px;
  min-width: 220px;
  margin-bottom: 18px;
  background: rgba(255,255,255,0.04);
  border-radius: 18px;
  padding: 18px 22px 18px 22px;
  box-shadow: 0 2px 12px #b33c1a11;
}
.footer-bemvindo h3,
.footer-facebook h3 {
  font-size: 1.18rem;
  letter-spacing: 1.2px;
  color: #ffe5b4;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}
.footer-bemvindo hr,
.footer-facebook hr {
  border: none;
  border-top: 2px solid #ff9800;
  width: 38px;
  margin: 0 0 1rem 0;
}
.footer-bemvindo p {
  color: #e0e0e0;
  font-size: 1.08rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  text-align: justify;
}
.footer-social-circles {
  display: flex;
  gap: 18px;
  margin-top: 10px;
}
.footer-social-circles a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #23272f;
  color: #fffbe6;
  font-size: 1.3rem;
  box-shadow: 0 2px 8px #0002;
  border: 2.5px solid #b33c1a;
  transition: background 0.2s, color 0.2s, border 0.2s, transform 0.2s;
}
.footer-social-circles a:hover {
  background: #ff9800;
  color: #fff;
  border-color: #ffe066;
  transform: scale(1.08) rotate(-6deg);
}
.footer-social-icon {
  width: 26px;
  height: 26px;
}
.footer-facebook .footer-fb-box {
  background: #23272f;
  border-radius: 12px;
  padding: 1.3rem 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  box-shadow: 0 2px 8px #0002;
  margin-top: 0.7rem;
}
.fb-img {
  width: 40px;
  border-radius: 8px;
  margin-bottom: 0.2rem;
  box-shadow: 0 2px 8px #b33c1a22;
}
.fb-title {
  color: #fffbe6;
  font-weight: 700;
  font-size: 1.13rem;
  letter-spacing: 1px;
}
.fb-sub {
  color: #b3e59f;
  font-size: 1.01rem;
}
.footer-bar-inspirado {
  background: #101312;
  color: #b3b3b3;
  text-align: center;
  padding: 18px 0 10px 0;
  font-size: 1.01rem;
  letter-spacing: 1.1px;
  border-top: 1.5px solid #23272f;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 2;
}
.footer-bar-inspirado a {
  color: #ffe066;
  text-decoration: underline;
  font-weight: 600;
}
.footer-agencia {
  font-size: 0.99rem;
  color: #ffe066;
  font-style: italic;
  letter-spacing: 0.5px;
}
@media (max-width: 900px) {
  .footer-main {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
    padding: 24px 8px 8px 8px;
  }
  .footer-col {
    min-width: 0;
    padding: 14px 8px 14px 8px;
  }
}
@media (max-width: 600px) {
  .footer-main {
    padding: 18px 2vw 8px 2vw;
    gap: 1.1rem;
  }
  .footer-col {
    border-radius: 8px;
    padding: 10px 4vw 10px 4vw;
  }
  .footer-bar-inspirado {
    font-size: 0.93rem;
    padding: 10px 0 6px 0;
  }
  .footer-agencia {
    font-size: 0.91rem;
  }
}
</style>
