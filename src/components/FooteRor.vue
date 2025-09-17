<template>
  <footer class="footer-italiana-novo">
    <div class="footer-content-novo">
      <div class="footer-col footer-logo-col">
        <img src="/src/assets/imagens/logo.png" alt="Santory Pizzaria" class="footer-logo-novo" />
        <h2 class="footer-nome-novo">Santory Pizzaria</h2>
        <p class="footer-slogan-novo">O melhor pedaço do seu dia!</p>
      </div>
      <div class="footer-col footer-info-col">
        <h3>Contato</h3>
        <ul>
          <li><b>Endereço:</b> Porto Grande, 123 - Porto Grande</li>
          <li><b>Telefone:</b> <a href="tel:+554755555555">(47) 5555-5555</a></li>
          <li><b>Funcionamento:</b> 18:00 - 23:00</li>
        </ul>
      </div>
      <div class="footer-col footer-social-col">
        <h3>Redes Sociais</h3>
        <div class="footer-social-links">
          <a href="https://wa.link/h475ec" target="_blank" aria-label="Whatsapp"><img src="/src/assets/imagens/whatsapp.png" alt="Whatsapp" /></a>
          <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" /></a>
          <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" /></a>
        </div>
      </div>
    </div>
    <div class="footer-bar-novo">
      <span>&copy; {{ new Date().getFullYear() }} Santory Pizzaria. Todos os direitos reservados.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer-italiana-novo {
  background: linear-gradient(120deg, #232323 70%, #b33c1a 100%);
  color: #fffbe6;
  border-top: 6px solid #b33c1a;
  box-shadow: 0 -2px 24px #b33c1a22;
  font-family: 'Playfair Display', serif;
  margin-top: 40px;
}
.footer-content-novo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 18px 12px 18px;
  gap: 2.5rem;
}
.footer-col {
  flex: 1 1 220px;
  min-width: 180px;
  margin-bottom: 18px;
}
.footer-logo-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.footer-logo-novo {
  width: 70px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 8px #b33c1a22;
  border: 2.5px solid #b33c1a;
}
.footer-nome-novo {
  font-size: 1.6rem;
  color: #ffe5b4;
  margin: 0;
  font-family: 'Dancing Script', cursive, serif;
  letter-spacing: 1.5px;
}
.footer-slogan-novo {
  color: #b3e59f;
  font-size: 1.1rem;
  margin: 0;
  font-style: italic;
  opacity: 0.9;
}
.footer-info-col h3,
.footer-social-col h3 {
  color: #ffe5b4;
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
  font-family: 'Playfair Display', serif;
}
.footer-info-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #fffbe6;
  font-size: 1.05rem;
  line-height: 1.7;
}
.footer-info-col a {
  color: #b3e59f;
  text-decoration: underline;
}
.footer-social-links {
  display: flex;
  gap: 18px;
  align-items: center;
}
.footer-social-links img {
  width: 32px;
  height: 32px;
  background: #fffbe6;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 2px 8px #b33c1a22;
  border: 2px solid #b33c1a;
  transition: transform 0.2s, background 0.2s, border 0.2s;
}
.footer-social-links img:hover {
  transform: scale(1.13) rotate(-6deg);
  background: #ffe5b4;
  border-color: #388e3c;
}
.footer-bar-novo {
  background: #b33c1a;
  color: #fffbe6;
  text-align: center;
  padding: 14px 0 10px 0;
  font-size: 1.08rem;
  letter-spacing: 1.2px;
  border-top: 2px solid #ffe5b4;
  font-family: 'Playfair Display', serif;
}
@media (max-width: 900px) {
  .footer-content-novo {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 18px 8px 8px 8px;
  }
  .footer-logo-novo {
    width: 48px;
  }
  .footer-nome-novo {
    font-size: 1.2rem;
  }
  .footer-info-col ul {
    font-size: 0.98rem;
  }
  .footer-social-links img {
    width: 24px;
    height: 24px;
  }
  .footer-bar-novo {
    font-size: 0.98rem;
  }
}
</style>
