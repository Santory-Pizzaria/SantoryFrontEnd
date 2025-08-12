<script>
export default {
  name: 'FeedBack',
  data() {
    return {
      feedbacks: [],
      novoFeedback: {
        opiniao: '',
        estrelas: 0
      },
      aviso: ''
    }
  },
  methods: {
    addFeedback() {
      if (this.novoFeedback.opiniao.trim() === '' || this.novoFeedback.estrelas === 0) {
        this.aviso = 'Por favor, escreva sua opinião e selecione uma quantidade de estrelas para avaliar.';
        setTimeout(() => { this.aviso = ''; }, 3000);
        return;
      }
      this.feedbacks.push({
        opiniao: this.novoFeedback.opiniao.trim(),
        estrelas: this.novoFeedback.estrelas
      });
      this.novoFeedback.opiniao = '';
      this.novoFeedback.estrelas = 0;
      this.aviso = '';
    }
  }
}
</script>

<template>
  <div class="feedback-pizza-bg">
    <img
      src="@/assets/imagens/seta-preta.png"
      alt="Voltar ao Menu"
      class="seta-voltar"
      @click="$router.push('/menu')"
    />
    <div v-if="aviso" class="feedback-aviso">{{ aviso }}</div>
    <div class="feedback-header">
      <img src="/logo.ico" alt="Logo Pizzaria" class="pizza-logo" />
      <h1 class="pizza-title">Avalie sua Experiência!</h1>
      <p class="pizza-sub">Sua opinião faz nossa pizza melhor 🍕</p>
    </div>
    <div class="feedback-card-form">
      <form @submit.prevent="addFeedback" class="feedback-form">
        <label class="feedback-label">Como foi sua experiência?</label>
        <textarea v-model="novoFeedback.opiniao" placeholder="Conte como foi seu pedido, sabor, atendimento..." required rows="3"/>
        <div class="star-rating pizza-stars">
          <span v-for="star in 5" :key="star" @click="novoFeedback.estrelas = star"
            :class="{ selected: star <= novoFeedback.estrelas }">
            ★
          </span>
        </div>
        <button type="submit">Enviar Avaliação</button>
      </form>
    </div>
    <h2 class="feedback-list-title">Avaliações Recentes</h2>
    <ul class="feedback-list pizza-feedback-list">
      <li v-for="(feedback, index) in feedbacks" :key="index" class="feedback-item pizza-feedback-item">
        <div class="feedback-user">
          <div class="avatar">🍕</div>
          <div>
            <div class="feedback-stars pizza-stars">
              <span v-for="star in 5" :key="star" :class="{ selected: star <= feedback.estrelas }">★</span>
            </div>
            <div class="feedback-opinion pizza-opinion">{{ feedback.opiniao }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.feedback-pizza-bg {
  min-height: 100vh;
  background: #fffdf7;
  padding: 0 0 40px 0;
}
.feedback-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
}
.pizza-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 2px 8px #ffb86c44;
  margin-bottom: 8px;
}
.pizza-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: #143642;
  margin-bottom: 2px;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #fff3e0;
}
.pizza-sub {
  color: #b9770e;
  font-size: 1.1rem;
  margin-bottom: 0;
}
.feedback-card-form {
  background: #f7f3e9;
  border-radius: 18px;
  border: 1.5px solid #b33c1a;
  box-shadow: 0 4px 24px #ffb86c33;
  max-width: 420px;
  margin: 0 auto 28px auto;
  padding: 28px 20px 20px 20px;
}
.feedback-label {
  font-weight: 600;
  color: #b33c1a;
  margin-bottom: 6px;
  display: block;
}
.feedback-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.feedback-form textarea {
  padding: 10px 14px;
  border: 1.5px solid #ffb86c;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: #f3e9dc;
  color: #143642;
  resize: none;
  transition: border 0.2s;
}
.feedback-form textarea:focus {
  border-color: #b33c1a;
}
.pizza-stars {
  display: flex;
  gap: 8px;
  font-size: 2.2rem;
  cursor: pointer;
  justify-content: center;
  margin: 8px 0 0 0;
}
.pizza-stars span {
  color: #ffe0b2;
  transition: color 0.2s, transform 0.2s;
  user-select: none;
}
.pizza-stars span.selected,
.pizza-stars span:hover {
  color: #b33c1a;
  transform: scale(1.18);
}
.pizza-stars span:hover~span {
  color: #ffe0b2;
}
.feedback-form button {
  padding: 12px 0;
  background: #b33c1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px #ffb86c44;
  margin-top: 8px;
}
.feedback-form button:hover {
  background: #143642;
  transform: translateY(-2px) scale(1.04);
}
.feedback-list-title {
  text-align: center;
  color: #143642;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 18px 0 10px 0;
  letter-spacing: 1px;
}
.pizza-feedback-list {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.pizza-feedback-item {
  background: #f7f3e9;
  border: 1.5px solid #b33c1a;
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 2px 8px #ffb86c22;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.feedback-user {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.avatar {
  width: 38px;
  height: 38px;
  background: #143642;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  box-shadow: 0 1px 4px #ffb86c33;
}
.pizza-opinion {
  font-size: 1.08rem;
  color: #b33c1a;
  margin-top: 2px;
  font-style: italic;
}
.seta-voltar {
  position: absolute;
  top: 18px;
  left: 18px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  z-index: 10;
  transition: filter 0.2s, transform 0.2s;
  filter: drop-shadow(0 2px 6px #00000044);
}
.seta-voltar:hover {
  filter: brightness(1.2) drop-shadow(0 4px 12px #00000066);
  transform: scale(1.08);
}
.feedback-aviso {
  background: #ffe0b2;
  color: #b33c1a;
  border: 1.5px solid #b33c1a;
  border-radius: 8px;
  padding: 10px 18px;
  margin: 12px auto 18px auto;
  max-width: 420px;
  text-align: center;
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 2px 8px #ffb86c44;
  animation: avisoFadeIn 0.3s;
}
@keyframes avisoFadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 600px) {
  .feedback-pizza-bg {
    padding: 0 0 16px 0;
  }
  .feedback-card-form {
    max-width: 98vw;
    padding: 16px 4vw 16px 4vw;
  }
  .pizza-feedback-list {
    max-width: 98vw;
  }
  .pizza-title {
    font-size: 1.3rem;
  }
  .pizza-stars {
    font-size: 1.3rem;
  }
  .pizza-feedback-item {
    padding: 10px 8px;
  }
  .avatar {
    width: 28px;
    height: 28px;
    font-size: 1.1rem;
  }
  .seta-voltar {
    width: 20px;
    height: 20px;
  }
}
</style>
