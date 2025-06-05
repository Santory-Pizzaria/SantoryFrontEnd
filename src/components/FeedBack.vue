<script>
export default {
  name: 'FeedBack',
  data() {
    return {
      feedbacks: [],
      novoFeedback: {
        opiniao: '',
        estrelas: 0
      }
    }
  },
  methods: {
    addFeedback() {
      if (this.novoFeedback.opiniao.trim() !== '' && this.novoFeedback.estrelas > 0) {
        this.feedbacks.push({
          opiniao: this.novoFeedback.opiniao.trim(),
          estrelas: this.novoFeedback.estrelas
        });
        this.novoFeedback.opiniao = '';
        this.novoFeedback.estrelas = 0;
      }
    }
  }
}
</script>

<template>
  <div class="feedback-container">
    <h2>Feedbacks dos Usuários</h2>
    <form @submit.prevent="addFeedback" class="feedback-form">
      <input v-model="novoFeedback.opiniao" placeholder="Deixe sua opinião sobre a pizzaria" required />
      <div class="star-rating">
        <span v-for="star in 5" :key="star" @click="novoFeedback.estrelas = star"
          :class="{ selected: star <= novoFeedback.estrelas }">
          ★
        </span>
      </div>
      <button type="submit">Enviar</button>
    </form>
    <ul class="feedback-list">
      <li v-for="(feedback, index) in feedbacks" :key="index" class="feedback-item">
        <div class="feedback-opinion">{{ feedback.opiniao }}</div>
        <div class="feedback-stars">
          <span v-for="star in 5" :key="star" :class="{ selected: star <= feedback.estrelas }">★</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.feedback-container {
  max-width: 420px;
  margin: 32px auto;
  padding: 28px 20px 20px 20px;
  background: var(--color-background-soft);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(44, 62, 80, 0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1.5px solid var(--color-border);
}

.feedback-container h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 18px;
  letter-spacing: 1px;
}

.feedback-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.feedback-form input {
  padding: 10px 14px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  background: var(--color-background);
  color: var(--color-text);
}

.feedback-form input:focus {
  border-color: var(--color-border-hover);
}

.star-rating {
  display: flex;
  gap: 6px;
  font-size: 2rem;
  cursor: pointer;
  justify-content: flex-start;
}

.star-rating span {
  color: #e0e0e0;
  transition: color 0.2s, transform 0.2s;
  user-select: none;
}

.star-rating span.selected,
.star-rating span:hover,
.star-rating span:hover~span.selected {
  color: #FFD700;
  transform: scale(1.15);
}

.star-rating span:hover~span {
  color: #e0e0e0;
}

.feedback-form button {
  padding: 10px 0;
  background: linear-gradient(90deg, var(--vt-c-indigo) 0%, #ffb86c 100%);
  color: var(--vt-c-white);
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
}

.feedback-form button:hover {
  background: linear-gradient(90deg, #ffb86c 0%, var(--vt-c-indigo) 100%);
  transform: translateY(-2px) scale(1.03);
}

.feedback-list {
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feedback-item {
  background: var(--color-background);
  border: 1.5px solid var(--color-border);
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.06);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.feedback-opinion {
  font-size: 1.05rem;
  color: var(--color-text);
  margin-bottom: 2px;
}

.feedback-stars {
  display: flex;
  gap: 2px;
  font-size: 1.3rem;
}

.feedback-stars span {
  color: #e0e0e0;
  transition: color 0.2s;
}

.feedback-stars span.selected {
  color: #FFD700;
}

@media (max-width: 600px) {
  .feedback-container {
    max-width: 98vw;
    padding: 16px 4vw 16px 4vw;
  }

  .feedback-form input,
  .feedback-form button {
    font-size: 0.98rem;
  }

  .star-rating {
    font-size: 1.4rem;
  }

  .feedback-item {
    padding: 10px 8px;
  }
}
</style>
