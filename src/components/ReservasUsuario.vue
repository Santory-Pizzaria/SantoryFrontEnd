<script>
export default {
  name: 'ReservasUsuario',
  data() {
    return {
      reservas: []
    }
  },
  mounted() {
    this.carregarReservas();
  },
  methods: {
    carregarReservas() {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      const todasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      if (usuarioLogado && usuarioLogado.id) {
        this.reservas = todasReservas.filter(r => r.usuarioId === usuarioLogado.id);
        this.atualizarStatusReservas();
      } else {
        this.reservas = [];
      }
    },
    atualizarStatusReservas() {
      const hoje = new Date();
      this.reservas.forEach(reserva => {
        // Considera reserva aberta se a data/hora for maior ou igual ao momento atual
        const dataHoraReserva = new Date(reserva.data + ' ' + reserva.horario);
        if (dataHoraReserva >= hoje) {
          reserva.status = 'Aberta';
        } else {
          reserva.status = 'Encerrada';
        }
      });
      // Atualiza no localStorage
      const todasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      this.reservas.forEach(reserva => {
        const idx = todasReservas.findIndex(r => r.id === reserva.id);
        if (idx !== -1) {
          todasReservas[idx].status = reserva.status;
        }
      });
      localStorage.setItem('reservas', JSON.stringify(todasReservas));
    },
    cancelarReserva(id) {
      if (window.confirm('⚠️ Tem certeza que deseja cancelar sua reserva?\n\nAo cancelar, sua mesa ficará disponível para outros clientes.\n\nClique em OK para confirmar ou Cancelar para voltar.')) {
        let todasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
        todasReservas = todasReservas.filter(r => r.id !== id);
        localStorage.setItem('reservas', JSON.stringify(todasReservas));
        this.carregarReservas();
      }
    }
  },
  watch: {
    reservas: {
      handler() {
        this.atualizarStatusReservas();
      },
      deep: true
    }
  }
}
</script>
<template>
  <div class="reservas-bg-fundo"></div>
  <div class="seta-voltar-menu" @click="$router.push('/menu')">
    <img src="@/assets/imagens/seta-preta.png" alt="Voltar ao menu" />
  </div>
  <div class="reservas-usuario-container">
    <h2>Minhas Reservas</h2>
    <div v-if="reservas.length === 0" class="sem-reservas">Nenhuma reserva encontrada.</div>
    <ul v-else class="lista-reservas">
      <li v-for="reserva in reservas" :key="reserva.id" class="reserva-item">
        <div><strong>Data:</strong> {{ reserva.data }}</div>
        <div><strong>Horário:</strong> {{ reserva.horario }}</div>
        <div><strong>Mesa:</strong> {{ reserva.mesa }}</div>
        <div><strong>Pessoas:</strong> {{ reserva.qtdPessoas }}</div>
        <div><strong>Status:</strong> {{ reserva.status }}</div>
        <button v-if="reserva.status === 'Aberta'" class="btn-cancelar-reserva" @click="cancelarReserva(reserva.id)">Cancelar</button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.seta-voltar-menu {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 1000;
  cursor: pointer;
  background: rgba(255,255,255,0.7);
  border-radius: 50%;
  box-shadow: 0 2px 8px #b33c1a22;
  padding: 6px;
  transition: background 0.2s;
}
.seta-voltar-menu:hover {
  background: #ff9800;
}
.seta-voltar-menu img {
  width: 32px;
  height: 32px;
  display: block;
}
.reservas-usuario-container {
  position: relative;
  z-index: 1;
  background: #fffbe6;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b33c1a22;
  padding: 32px 18px;
  max-width: 480px;
  margin: 32px auto;
}
.reservas-usuario-container h2 {
  color: #b33c1a;
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 18px;
  text-align: center;
}
.sem-reservas {
  color: #b33c1a;
  text-align: center;
  font-size: 1.08rem;
  margin-top: 18px;
}
.lista-reservas {
  list-style: none;
  padding: 0;
  margin: 0;
}
.reserva-item {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 6px #b33c1a11;
  padding: 16px 12px;
  margin-bottom: 14px;
  font-size: 1rem;
  color: #222e3a;
}
.reserva-item strong {
  color: #b33c1a;
}
.reservas-bg-fundo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: url('@/assets/imagens/fundo.png') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.18;
  pointer-events: none;
}
.btn-cancelar-reserva {
  background: #e63946;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 2px 8px #e6394622;
  transition: background 0.2s;
}
.btn-cancelar-reserva:hover {
  background: #b33c1a;
}
</style>
