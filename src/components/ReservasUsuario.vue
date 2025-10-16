<script>
export default {
  name: 'ReservasUsuario',
  data() {
    return {
      reservas: [],
      alertaCancelamento: ''
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
        // Considera reserva aberta se a data/hora for maior OU IGUAL ao momento atual
        // Corrige para considerar reserva aberta até o fim do horário reservado
        // Se reserva for para hoje, considera aberta até 23:59
        const dataHoraFim = new Date(reserva.data + ' 23:59');
        if (hoje <= dataHoraFim) {
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
      this.alertaCancelamento = '';
      if (window.confirm('⚠️ Tem certeza que deseja cancelar sua reserva?\n\nAo cancelar, sua mesa ficará disponível para outros clientes.\n\nClique em OK para confirmar ou Cancelar para voltar.')) {
        let todasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
        todasReservas = todasReservas.filter(r => r.id !== id);
        localStorage.setItem('reservas', JSON.stringify(todasReservas));
        this.carregarReservas();
        // Alerta personalizado
        this.alertaCancelamento = 'Reserva cancelada com sucesso!';
        setTimeout(() => { this.alertaCancelamento = ''; }, 3000);
      }
    },
    formatarData(data) {
      // Espera data no formato YYYY-MM-DD ou similar
      if (!data) return '';
      const partes = data.split('-');
      if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
      }
      // fallback: retorna como está
      return data;
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
  <div v-if="alertaCancelamento" class="alerta-cancelamento-reserva">
    <img src="@/assets/imagens/alerta.png" alt="Alerta" class="alerta-icon" />
    <span>{{ alertaCancelamento }}</span>
  </div>
  <div class="seta-voltar-menu" @click="$router.push('/menu')">
    <img src="@/assets/imagens/seta-preta.png" alt="Voltar ao menu" />
  </div>
  <div class="reservas-usuario-container">
    <h2>Minhas Reservas</h2>
    <div v-if="reservas.length === 0" class="sem-reservas">Nenhuma reserva encontrada.</div>
    <ul v-else class="lista-reservas">
      <li v-for="reserva in reservas" :key="reserva.id" class="reserva-item">
        <div><strong>Data:</strong> {{ formatarData(reserva.data) }}</div>
        <div><strong>Horário:</strong> {{ reserva.horaInicio }} - {{ reserva.horaFim }}</div>
        <div><strong>Mesa:</strong> {{ reserva.mesa }}</div>
        <div><strong>Pessoas:</strong> {{ reserva.qtdPessoas }}</div>
        <div><strong>Status:</strong> {{ reserva.status }}</div>
        <button v-if="reserva.status === 'Aberta'" class="btn-cancelar-reserva" @click="cancelarReserva(reserva.id)">Cancelar</button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.reservas-bg-fundo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: url('@/assets/imagens/fundo.png') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.95;
  pointer-events: none;
}

.seta-voltar-menu {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 1000;
  cursor: pointer;
  border-radius: 50%;
  padding: 6px;
  transition: background 0.2s, box-shadow 0.2s;
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
  border-radius: 22px;
  box-shadow: 0 8px 32px #b33c1a22;
  padding: 40px 28px 32px 28px;
  max-width: 500px;
  margin: 48px auto 32px auto;
  animation: fadeInReserva 0.7s;
}
@keyframes fadeInReserva {
  from { opacity: 0; transform: translateY(30px) scale(0.97);}
  to { opacity: 1; transform: translateY(0) scale(1);}
}
.reservas-usuario-container h2 {
  color: #b33c1a;
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 24px;
  text-align: center;
  font-weight: 800;
  letter-spacing: 1px;
}
.sem-reservas {
  color: #b33c1a;
  text-align: center;
  font-size: 1.15rem;
  margin-top: 28px;
  font-weight: 600;
}
.lista-reservas {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.reserva-item {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #b33c1a11;
  padding: 20px 18px 16px 18px;
  font-size: 1.08rem;
  color: #222e3a;
  margin-bottom: 0;
  border: 1.5px solid #ff9800;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: box-shadow 0.2s, border 0.2s;
}
.reserva-item:hover {
  box-shadow: 0 6px 20px #b33c1a33;
  border-color: #b33c1a;
}
.reserva-item strong {
  color: #b33c1a;
}
.btn-cancelar-reserva {
  background: linear-gradient(90deg, #e63946 0%, #b33c1a 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 22px;
  font-weight: 700;
  font-size: 1.08rem;
  cursor: pointer;
  margin-top: 12px;
  box-shadow: 0 2px 8px #e6394622;
  transition: background 0.2s, transform 0.2s;
}
.btn-cancelar-reserva:hover {
  background: linear-gradient(90deg, #b33c1a 0%, #e63946 100%);
  transform: translateY(-2px) scale(1.04);
}

.alerta-cancelamento-reserva {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 9999;
  background: linear-gradient(90deg, #e63946 0%, #b33c1a 100%);
  color: #fff;
  font-size: 1.08rem;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 4px 16px #b33c1a22;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: alertaFadeIn 0.4s;
  min-width: 220px;
  text-align: center;
}
.alerta-icon {
  width: 28px;
  height: 28px;
}
@keyframes alertaFadeIn {
  from { opacity: 0; transform: translateY(-20px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (max-width: 700px) {
  .reservas-usuario-container {
    max-width: 99vw;
    padding: 1.2rem 2vw 1.2rem 2vw;
    border-radius: 12px;
  }
  .reservas-usuario-container h2 {
    font-size: 1.2rem;
  }
  .reserva-item {
    font-size: 0.98rem;
    padding: 14px 6vw 10px 6vw;
    border-radius: 8px;
  }
  .btn-cancelar-reserva {
    font-size: 0.98rem;
    padding: 7px 10px;
  }
  .seta-voltar-menu {
    top: 8px;
    left: 8px;
    padding: 2px;
  }
  .seta-voltar-menu img {
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 600px) {
  .alerta-cancelamento-reserva {
    top: 10px;
    right: 4vw;
    min-width: 0;
    max-width: 90vw;
    padding: 10px 4vw;
    font-size: 0.98rem;
  }
  .alerta-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
