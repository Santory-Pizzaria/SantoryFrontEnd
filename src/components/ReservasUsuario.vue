<script>
export default {
  name: 'ReservasUsuario',
  data() {
    return {
      reservas: [],
      alertaCancelamento: '',
      showConfirmCancel: false,
      reservaSelecionadaId: null,
    }
  },
  mounted() {
    this.carregarReservas();
  },
  methods: {
    carregarReservas() {
      const usuario = JSON.parse(localStorage.getItem('user') || 'null');
      const todasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      if (usuario && usuario.id) {
        // Normaliza campos para o componente
        const minhas = todasReservas
          .filter(r => (r.usuarioId || r.usuario) === usuario.id)
          .map(r => ({
            id: r.id,
            data: r.data?.split('T')[0] || r.data || '',
            horario: r.horario || r.horaInicio || '',
            mesa: r.mesa || null,
            qtdPessoas: r.qtdPessoas || r.pessoas || 1,
            status: r.status || 'Aberta',
          }));
        this.reservas = minhas;
        this.atualizarStatusReservas();
      } else {
        this.reservas = [];
      }
    },
    atualizarStatusReservas() {
      const hoje = new Date();
      this.reservas.forEach(reserva => {
        const dataStr = reserva.data || '';
        const dataHoraFim = dataStr ? new Date(`${dataStr} 23:59`) : hoje;
        reserva.status = hoje <= dataHoraFim ? 'Aberta' : 'Encerrada';
      });
      // Atualiza no localStorage mantendo outros campos
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
      let todasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      todasReservas = todasReservas.filter(r => r.id !== id);
      localStorage.setItem('reservas', JSON.stringify(todasReservas));
      this.carregarReservas();
      this.alertaCancelamento = 'Reserva cancelada com sucesso!';
      setTimeout(() => { this.alertaCancelamento = ''; }, 3000);
    },
    pedirConfirmacaoCancelamento(id) {
      this.reservaSelecionadaId = id;
      this.showConfirmCancel = true;
    },
    confirmarCancelamento() {
      const id = this.reservaSelecionadaId;
      this.showConfirmCancel = false;
      this.reservaSelecionadaId = null;
      if (!id) return;
      let todasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      todasReservas = todasReservas.filter(r => r.id !== id);
      localStorage.setItem('reservas', JSON.stringify(todasReservas));
      this.carregarReservas();
      this.alertaCancelamento = 'Reserva cancelada com sucesso!';
      setTimeout(() => { this.alertaCancelamento = ''; }, 3000);
    },
    fecharModalConfirm() {
      this.showConfirmCancel = false;
      this.reservaSelecionadaId = null;
    },
    formatarData(data) {
      if (!data) return '';
      const partes = data.split('-');
      if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
      }
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
        <div><strong>Horário:</strong> {{ reserva.horario }}</div>
        <div><strong>Mesa:</strong> {{ reserva.mesa ?? 'Montada' }}</div>
        <div><strong>Pessoas:</strong> {{ reserva.qtdPessoas }}</div>
        <div><strong>Status:</strong> {{ reserva.status }}</div>
        <button v-if="reserva.status === 'Aberta'" class="btn-cancelar-reserva" @click="pedirConfirmacaoCancelamento(reserva.id)">Cancelar</button>
      </li>
    </ul>
  </div>

  <!-- Modal de confirmação de cancelamento -->
  <div v-if="showConfirmCancel" class="modal-overlay" @click.self="fecharModalConfirm">
    <div class="modal-content top-center">
      <div class="modal-header">
        <img src="@/assets/imagens/alerta.png" alt="Atenção" />
        <h3>Confirmar cancelamento</h3>
      </div>
      <p>
        Tem certeza que deseja cancelar sua reserva? Ao cancelar, sua mesa ficará disponível para outros clientes.
      </p>
      <div class="modal-actions">
        <button class="btn-modal-cancelar" @click="fecharModalConfirm">Voltar</button>
        <button class="btn-modal-confirmar" @click="confirmarCancelamento">Confirmar</button>
      </div>
    </div>
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
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
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

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 10000;
}
.modal-content.top-center {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #fffbe6;
  border-radius: 16px;
  box-shadow: 0 8px 32px #b33c1a33;
  border: 2px solid #ff9800;
  width: 92vw;
  max-width: 420px;
  padding: 18px 16px;
  animation: alertaFadeIn 0.3s;
}
.modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.modal-header img {
  width: 28px;
  height: 28px;
}
.modal-content p { color: #222e3a; margin: 10px 0 16px 0; }
.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.btn-modal-cancelar {
  background: #ffe5b4;
  color: #b33c1a;
  border: 1.5px solid #ff9800;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 700;
}
.btn-modal-confirmar {
  background: linear-gradient(90deg, #e63946 0%, #b33c1a 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 700;
}
@media (max-width: 600px) {
  .modal-content.top-center {
    top: 10px;
    width: 96vw;
  }
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
    left: 50%;
    transform: translateX(-50%);
    min-width: 0;
    max-width: 90vw;
    padding: 10px 4vw;
    font-size: 0.98rem;
  }
}
</style>
