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
      aviso: '',
      filtroEstrelas: '',
      usuarioLogado: ''
    }
  },
  methods: {
    addFeedback() {
      if (this.novoFeedback.opiniao.trim() === '' || this.novoFeedback.estrelas === 0) {
        this.aviso = 'Por favor, escreva sua opinião e selecione uma quantidade de estrelas para avaliar.';
        setTimeout(() => { this.aviso = ''; }, 3000);
        return;
      }
      // Pega o nome do usuário logado
      let usuario = '';
      try {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        usuario = usuarioLogado?.nome || '';
      } catch { usuario = ''; }
      this.feedbacks.push({
        id: Date.now() + Math.random(), // id único
        opiniao: this.novoFeedback.opiniao.trim(),
        estrelas: this.novoFeedback.estrelas,
        usuario: usuario
      });
      this.novoFeedback.opiniao = '';
      this.novoFeedback.estrelas = 0;
      this.aviso = '';
    },
    deletarFeedback(id) {
      this.feedbacks = this.feedbacks.filter(fb => fb.id !== id);
    }
  },
  mounted() {
    // Carregar feedbacks do localStorage ao iniciar
    const salvos = localStorage.getItem('feedbacks');
    if (salvos) {
      try {
        this.feedbacks = JSON.parse(salvos);
      } catch {
        this.feedbacks = [];
      }
    }
    try {
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
      this.usuarioLogado = usuario?.nome || '';
    } catch { this.usuarioLogado = ''; }
  },
  watch: {
    feedbacks: {
      handler(novo) {
        localStorage.setItem('feedbacks', JSON.stringify(novo));
      },
      deep: true
    }
  },
  computed: {
    feedbacksFiltrados() {
      let lista = [...this.feedbacks].reverse();
      if (this.filtroEstrelas) {
        return lista.filter(fb => fb.estrelas === Number(this.filtroEstrelas));
      }
      return lista;
    }
  }
}
</script>

<template>
  <div class="feedback-bg-novo">
    <header class="feedback-header-novo">
      <img
        src="@/assets/imagens/seta-preta.png"
        alt="Voltar ao Menu"
        class="seta-voltar-novo"
        @click="$router.push('/menu')"
      />
      <div class="header-center-novo">

        <div>
          <h1 class="pizza-title-novo">Deixe sua Avaliação!</h1>
          <p class="pizza-sub-novo">Sua opinião faz nossa pizza melhor 🍕</p>
        </div>
      </div>
    </header>
    <main class="feedback-main-novo">
      <section class="feedback-form-section-novo">
        <form @submit.prevent="addFeedback" class="feedback-form-novo">
          <label class="feedback-label-novo">Como foi sua experiência?</label>
          <textarea v-model="novoFeedback.opiniao" placeholder="Conte como foi seu pedido, sabor, atendimento..." required rows="3"/>
          <div class="star-rating-novo">
            <span v-for="star in 5" :key="star" @click="novoFeedback.estrelas = star"
              :class="{ selected: star <= novoFeedback.estrelas }">
              ★
            </span>
          </div>
          <button type="submit">Enviar Avaliação</button>
          <div v-if="aviso" class="feedback-aviso-novo">{{ aviso }}</div>
        </form>
      </section>
      <section class="feedback-list-section-novo">
        <h2 class="feedback-list-title-novo">Avaliações Recentes</h2>
        <div class="feedback-filter-novo">
          <label>Filtrar por estrelas:</label>
          <select v-model="filtroEstrelas">
            <option value="">Todas</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} estrela{{ n > 1 ? 's' : '' }}</option>
          </select>
        </div>
        <ul class="feedback-list-novo">
          <li v-for="feedback in feedbacksFiltrados" :key="feedback.id" class="feedback-item-novo">
            <div class="feedback-user-novo">
              <div class="avatar-novo">🍕</div>
              <div>
                <div class="feedback-stars-novo">
                  <span v-for="star in 5" :key="star" :class="{ selected: star <= feedback.estrelas }">★</span>
                </div>
                <div class="feedback-opinion-novo">{{ feedback.opiniao }}</div>
                <div v-if="feedback.usuario" class="feedback-usuario-nome">— {{ feedback.usuario }}
                  <button v-if="feedback.usuario === usuarioLogado" class="btn-deletar-feedback" @click="deletarFeedback(feedback.id)">Excluir</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.feedback-bg-novo {
  min-height: 100vh;
  background: url('@/assets/imagens/fundo.png') center center/cover no-repeat;
  padding: 0 0 40px 0;
  display: flex;
  flex-direction: column;
  position: relative;
}
.feedback-bg-novo::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.85);
  z-index: 0;
}
.feedback-header-novo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px 12px 32px;
  background: #fff;
  border-bottom: 2px solid #b33c1a;
  box-shadow: 0 2px 12px #b33c1a22;
  position: relative;
  z-index: 1;
}
.header-center-novo {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 0.2rem;
}
.pizza-logo-novo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 2px 8px #b33c1a22;
  margin: 0 auto 8px auto;
  display: block;
}
.pizza-title-novo {
  font-size: 2rem;
  font-weight: 800;
  color: #b33c1a;
  margin-bottom: 2px;
  letter-spacing: 1px;
  text-align: center;
  font-family: 'Playfair Display', serif;
}
.pizza-sub-novo {
  color: #444;
  font-size: 1.1rem;
  margin-bottom: 0;
  text-align: center;
}
.seta-voltar-novo {
  width: 32px;
  height: 32px;
  cursor: pointer;
  filter: drop-shadow(0 2px 6px #b33c1a22);
  transition: filter 0.2s, transform 0.2s;
}
.seta-voltar-novo:hover {
  filter: brightness(1.2) drop-shadow(0 4px 12px #b33c1a44);
  transform: scale(1.08);
}
.feedback-main-novo {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  margin-top: 24px;
  position: relative;
  z-index: 1;
}
.feedback-form-section-novo {
  flex: 1 1 340px;
  max-width: 400px;
  background: #fff;
  border-radius: 18px;
  border: 1.5px solid #ff9800;
  box-shadow: 0 4px 24px #b33c1a11;
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 280px;
}
.feedback-form-novo {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.feedback-label-novo {
  font-weight: 600;
  color: #b33c1a;
  margin-bottom: 6px;
  display: block;
}
.feedback-form-novo textarea {
  padding: 10px 14px;
  border: 1.5px solid #ff9800;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: #fffbe6;
  color: #222;
  resize: none;
  transition: border 0.2s;
}
.feedback-form-novo textarea:focus {
  border-color: #b33c1a;
}
.star-rating-novo {
  display: flex;
  gap: 8px;
  font-size: 2.2rem;
  cursor: pointer;
  justify-content: center;
  margin: 8px 0 0 0;
}
.star-rating-novo span {
  color: #e0e0e0;
  transition: color 0.2s, transform 0.2s;
  user-select: none;
}
.star-rating-novo span.selected,
.star-rating-novo span:hover {
  color: #ff9800;
  transform: scale(1.18);
}
.star-rating-novo span:hover~span {
  color: #e0e0e0;
}
.feedback-form-novo button {
  padding: 12px 0;
  background: linear-gradient(90deg, #ff9800 0%, #b33c1a 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px #b33c1a22;
  margin-top: 8px;
}
.feedback-form-novo button:hover {
  background: linear-gradient(90deg, #b33c1a 0%, #ff9800 100%);
  transform: translateY(-2px) scale(1.04);
}
.feedback-aviso-novo {
  background: #fffbe6;
  color: #b33c1a;
  border: 1.5px solid #ff9800;
  border-radius: 8px;
  padding: 10px 18px;
  margin: 12px auto 0 auto;
  max-width: 320px;
  text-align: center;
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 2px 8px #b33c1a22;
  animation: avisoFadeIn 0.3s;
}
@keyframes avisoFadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.feedback-list-section-novo {
  flex: 2 1 420px;
  max-width: 520px;
  background: #fff;
  border-radius: 18px;
  border: 1.5px solid #ff9800;
  box-shadow: 0 4px 24px #b33c1a11;
  padding: 32px 24px 24px 24px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.feedback-list-title-novo {
  text-align: center;
  color: #b33c1a;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 18px 0;
  letter-spacing: 1px;
}
.feedback-filter-novo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  font-size: 1.08rem;
}
.feedback-filter-novo select {
  padding: 4px 10px;
  border-radius: 6px;
  border: 1.5px solid #ff9800;
  font-size: 1rem;
  background: #fffbe6;
  color: #b33c1a;
}
.feedback-list-novo {
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.feedback-item-novo {
  background: #fffbe6;
  border: 1.5px solid #ff9800;
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 2px 8px #b33c1a11;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}
.feedback-user-novo {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.avatar-novo {
  width: 38px;
  height: 38px;
  background: #ff9800;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  box-shadow: 0 1px 4px #b33c1a22;
  color: #fff;
}
.feedback-stars-novo {
  display: flex;
  gap: 2px;
  font-size: 1.1rem;
  color: #e0e0e0;
}
.feedback-stars-novo span.selected {
  color: #ff9800;
}
.feedback-opinion-novo {
  font-size: 1.08rem;
  color: #222;
  margin-top: 2px;
  font-style: italic;
}
.feedback-usuario-nome {
  font-size: 0.95rem;
  color: #b33c1a;
  margin-top: 4px;
  font-weight: 600;
}
.btn-deletar-feedback {
  background: #e63946;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 4px 14px;
  font-size: 0.98rem;
  font-weight: 600;
  margin-left: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-deletar-feedback:hover {
  background: #b33c1a;
}
@media (max-width: 900px) {
  .feedback-bg-novo {
    padding: 0 0 24px 0;
  }
  .feedback-main-novo {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
  .feedback-form-section-novo, .feedback-list-section-novo {
    max-width: 98vw;
    min-width: 0;
    padding: 18px 4vw 18px 4vw;
  }
  .feedback-header-novo {
    position: relative;
    padding-left: 52px; /* espaço para a seta à esquerda */
  }
  .seta-voltar-novo {
    position: absolute !important;
    left: 12px !important;
    top: 12px !important;
    margin-bottom: 0;
    transform: none;
  }
  .feedback-header-novo {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 12px 4vw 8px 4vw;
  }
  .seta-voltar-novo {
    position: static;
    transform: none;
    margin-bottom: 6px;
    left: unset;
    top: unset;
  }
  .header-center-novo {
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
  .pizza-logo-novo {
    margin: 0 auto 8px auto;
    display: block;
    width: 44px;
    height: 44px;
  }
  .pizza-title-novo {
    font-size: 1.1rem;
    text-align: center;
    width: 100%;
  }
  .pizza-sub-novo {
    font-size: 0.98rem;
    text-align: center;
    width: 100%;
  }
}
</style>
