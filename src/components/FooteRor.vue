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
  background: #181d1b;
  color: #fff;
  font-family: 'Montserrat', 'Playfair Display', serif;
  margin-top: 40px;
  border-top: 4px solid #b33c1a;
}
.footer-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 24px 24px;
  gap: 2.5rem;
}
.footer-col {
  flex: 1 1 300px;
  min-width: 220px;
  margin-bottom: 18px;
}
.footer-bemvindo h3,
.footer-facebook h3 {
  font-size: 1.13rem;
  letter-spacing: 1px;
  color: #fffbe6;
  margin-bottom: 0.5rem;
}
.footer-bemvindo hr,
.footer-facebook hr {
  border: none;
  border-top: 2px solid #b33c1a;
  width: 36px;
  margin: 0 0 1rem 0;
}
.footer-bemvindo p {
  color: #e0e0e0;
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
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
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #23272f;
  color: #fffbe6;
  font-size: 1.3rem;
  box-shadow: 0 2px 8px #0002;
  border: 2px solid #b33c1a;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.footer-social-circles a:hover {
  background: #b33c1a;
  color: #fff;
  border-color: #388e3c;
}
.footer-social-icon {
  width: 24px;
  height: 24px;
}
.footer-btn {
  background: transparent;
  color: #fffbe6;
  border: 2px solid #fffbe6;
  padding: 0.8rem 2.2rem;
  font-size: 1.08rem;
  border-radius: 4px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.footer-btn:hover {
  background: #b33c1a;
  color: #fff;
  border-color: #388e3c;
}
.footer-facebook .footer-fb-box {
  background: #23272f;
  border-radius: 10px;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  box-shadow: 0 2px 8px #0002;
  margin-top: 0.7rem;
}
.fb-img {
  width: 38px;
  border-radius: 8px;
  margin-bottom: 0.2rem;
}
.fb-title {
  color: #fffbe6;
  font-weight: 700;
  font-size: 1.08rem;
}
.fb-sub {
  color: #b3e59f;
  font-size: 0.98rem;
}
.footer-bar-inspirado {
  background: #101312;
  color: #b3b3b3;
  text-align: center;
  padding: 18px 0 10px 0;
  font-size: 1rem;
  letter-spacing: 1.1px;
  border-top: 1.5px solid #23272f;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.footer-bar-inspirado a {
  color: #b3e59f;
  text-decoration: underline;
}
.footer-agencia {
  font-size: 0.98rem;
  color: #b3e59f;
}
@media (max-width: 900px) {
  .footer-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 24px 8px 8px 8px;
  }
  .footer-col {
    min-width: 0;
  }
}
</style>
