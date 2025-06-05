<template>
  <div class="feedback-container">
    <h2>Feedbacks dos Usuários</h2>
    <form @submit.prevent="addFeedback" class="feedback-form">
      <input v-model="novoFeedback.opiniao" placeholder="Deixe sua opinião sobre a pizzaria" required />
      <div class="star-rating">
        <span v-for="star in 5" :key="star" @click="novoFeedback.estrelas = star" :class="{ selected: star <= novoFeedback.estrelas }">
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

<style scoped>
.feedback-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.feedback-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
.star-rating {
  display: flex;
  gap: 4px;
  font-size: 1.5rem;
  cursor: pointer;
}
.star-rating span {
  color: #ccc;
  transition: color 0.2s;
}
.star-rating span.selected {
  color: #FFD700;
}
.feedback-list {
  list-style: none;
  padding: 0;
}
.feedback-item {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 8px;
}
.feedback-opinion {
  margin-bottom: 4px;
}
.feedback-stars {
  color: #FFD700;
  font-size: 1.2rem;
}
.feedback-stars span {
  color: #ccc;
}
.feedback-stars span.selected {
  color: #FFD700;
}
</style>

