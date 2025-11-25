<script>
import MesaCard from './MesaCard.vue';

import { useRouter } from 'vue-router';
import { createReserva } from '@/utils/api.js';


export default {
  name: 'ReservasLocal',
  components: { MesaCard },
  data() {
    return {
      reserva: {
        nome: '',
        telefone: '',
        data: '',
        horario: '',
        pessoas: 1,
      },
      erros: {},
      mensagem: '',
      mesas: [
        { numero: 1, cadeiras: 4 },
        { numero: 2, cadeiras: 6 },
        { numero: 3, cadeiras: 2 },
        { numero: 4, cadeiras: 8 },
        { numero: 5, cadeiras: 4 },
        { numero: 6, cadeiras: 6 }
      ],
      formularioVisivel: false,
      mesaSelecionada: null,
      montandoMesa: false
    }
  },
  computed: {
    dataMinima() {
      return new Date().toISOString().split('T')[0];
    },
    mesasDisponiveis() {
      // Filtra mesas que não estão reservadas para o período selecionado
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      if (!this.reserva.data || !this.reserva.horario) return this.mesas;
      return this.mesas.filter(mesa => {
        const reservasMesa = reservas.filter(r => r.mesa === mesa.numero && r.data === this.reserva.data && r.status !== 'Cancelada');
        // Verifica se há conflito de horário
        return !reservasMesa.some(r => {
          // Conflito se o intervalo selecionado sobrepõe o intervalo da reserva existente
          return (
            (this.reserva.horario < r.horario && this.reserva.horario > r.horario)
          );
        });
      });
    }
  },
  methods: {
    selecionarMesa(mesa) {
      this.mesaSelecionada = mesa;
      this.reserva.pessoas = mesa.cadeiras;
      this.formularioVisivel = true;
      this.montandoMesa = false;
    },
    selecionarMontarMesa() {
      this.mesaSelecionada = null;
      this.formularioVisivel = true;
      this.montandoMesa = true;
      this.reserva.pessoas = 1;
    },
    voltarEscolha() {
      this.formularioVisivel = false;
      this.mesaSelecionada = null;
      this.montandoMesa = false;
      this.mensagem = '';
      this.reserva = { nome: '', telefone: '', data: '', horario: '', pessoas: 1 };

      this.erros = {};
    },
    validarFormulario() {
      this.erros = {};
      if (!this.reserva.nome || this.reserva.nome.trim().length < 3) {
        this.erros.nome = 'Informe um nome válido (mínimo 3 letras).';
      }
      const telRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
      if (!this.reserva.telefone || !telRegex.test(this.reserva.telefone)) {
        this.erros.telefone = 'Telefone inválido. Use o formato (99) 99999-9999.';
      }
      if (!this.reserva.data) {
        this.erros.data = 'Escolha uma data.';
      } else if (this.reserva.data < this.dataMinima) {
        this.erros.data = 'A data não pode ser anterior a hoje.';
      }
      if (!this.reserva.horario) {
        this.erros.horario = 'Escolha um horário.';
      }
      if (!this.reserva.pessoas || this.reserva.pessoas < 1) {
        this.erros.pessoas = 'Informe ao menos 1 pessoa.';
      } else if (this.reserva.pessoas > 20) {
        this.erros.pessoas = 'Máximo de 20 pessoas por reserva.';
      }
      return Object.keys(this.erros).length === 0;
    },

    async enviarReserva() {
      if (!this.validarFormulario()) {
        this.mensagem = '';
        return;
      }

      // Buscar usuário logado do localStorage
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      if (!usuarioLogado || !usuarioLogado.id) {
        this.mensagem = 'Você precisa estar logado para reservar.';
        return;
      }

      // Montar payload para o backend
      const payload = {
        usuario: usuarioLogado.id,
        data: `${this.reserva.data}T${this.reserva.horario}`,
        mesa: this.mesaSelecionada ? this.mesaSelecionada.numero : null,
        quantidade_pessoas: this.reserva.pessoas,
        horario: this.reserva.horario
      };

      try {
        await createReserva(payload);
        this.mensagem = `Reserva realizada para ${this.reserva.nome} no dia ${this.reserva.data} às ${this.reserva.horario}.`;
        this.reserva = { nome: '', telefone: '', data: '', horario: '', pessoas: 1 };
        this.erros = {};
      } catch {
        this.mensagem = 'Erro ao realizar reserva. Tente novamente.';

      }
    },
    irParaMenu() {
      this.$router.push({ name: 'menu' });
    },
    salvarReserva(reserva) {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      reserva.id = Date.now();
      reserva.usuarioId = usuarioLogado.id;
      reservas.push(reserva);
      localStorage.setItem('reservas', JSON.stringify(reservas));
    }
  }
}
</script>

<template>
  <div class="reserva-bg-novo">
    <button class="seta-voltar-fixa" @click="irParaMenu" title="Voltar ao menu">
      <img src="@/assets/imagens/seta-preta.png" alt="Voltar ao menu" />
    </button>
    <div v-if="mensagem" class="mensagem-topo-direita">
      <span>{{ mensagem }}</span>
    </div>
    <div class="reserva-card-novo">
      <header class="reserva-header-novo">
        <img src="@/assets/imagens/logo.png" alt="Logo" class="logo-reserva-novo" />
        <h1 class="reserva-title-novo">Reserve sua Mesa</h1>
      </header>
      <main class="reserva-main-novo">
        <div v-if="!formularioVisivel" class="mesas-grid-novo">
          <MesaCard v-for="mesa in mesasDisponiveis" :key="mesa.numero" :numero="mesa.numero" :cadeiras="mesa.cadeiras" @click="selecionarMesa(mesa)" />
          <div class="novo-montar-mesa-btn" @click="selecionarMontarMesa">
            <img src="@/assets/imagens/adicionar.png" alt="Montar" class="montar-mesa-icone" />
            <span>Montar Mesa</span>
          </div>
        </div>
        <form v-else class="reserva-form-novo" @submit.prevent="enviarReserva">
          <div class="form-row-novo">
            <div v-if="montandoMesa" class="form-group-novo">
              <label for="cadeiras">Cadeiras</label>
              <input type="number" id="cadeiras" v-model.number="reserva.pessoas" min="1" max="20" />
            </div>
            <div class="form-group-novo">
              <label for="nome">Nome</label>
              <input type="text" id="nome" v-model="reserva.nome" :class="{'erro': erros.nome}" placeholder="Seu nome completo" />
              <span v-if="erros.nome" class="erro-msg">{{ erros.nome }}</span>
            </div>
          </div>
          <div class="form-row-novo">
            <div class="form-group-novo">
              <label for="telefone">Telefone</label>
              <input type="tel" id="telefone" v-model="reserva.telefone" :class="{'erro': erros.telefone}" placeholder="(99) 99999-9999" maxlength="15" />
              <span v-if="erros.telefone" class="erro-msg">{{ erros.telefone }}</span>
            </div>
            <div class="form-group-novo">
              <label for="data">Data</label>
              <input type="date" id="data" v-model="reserva.data" :class="{'erro': erros.data}" :min="dataMinima" />
              <span v-if="erros.data" class="erro-msg">{{ erros.data }}</span>
            </div>
          </div>
          <div class="form-row-novo">
            <div class="form-group-novo">
              <label for="horario">Horário</label>
              <input type="time" id="horario" v-model="reserva.horario" :class="{'erro': erros.horario}" />
              <span v-if="erros.horario" class="erro-msg">{{ erros.horario }}</span>
            </div>
          </div>
          <button type="submit" class="btn-reservar">Reservar Mesa</button>
          <button type="button" class="btn-voltar" @click="voltarEscolha">Voltar</button>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.reserva-bg-novo {
  min-height: 100vh;
  background: url('@/assets/imagens/fundo.png') center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reserva-card-novo {
  background: #fffbe6;
  border-radius: 32px;
  box-shadow: 0 8px 40px #b33c1a33;
  max-width: 520px;
  width: 100%;
  padding: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  min-height: 540px;
  border: 2px solid #ff9800;
  position: relative;
}
.reserva-header-novo {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 32px 40px 16px 40px;
  border-bottom: 2px solid #ff9800;
  background: linear-gradient(90deg, #fffbe6 0%, #ffe5b4 100%);
  border-radius: 32px 32px 0 0;
}
.logo-reserva-novo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
.reserva-title-novo {
  font-size: 2.1rem;
  font-weight: 800;
  color: #b33c1a;
  margin: 0;
  letter-spacing: 2px;
  font-family: 'Playfair Display', serif;
}
.reserva-main-novo {
  flex: 1;
  padding: 32px 40px 0 40px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.mesas-grid-novo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
}
.novo-montar-mesa-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffe5b4;
  border: 2px dashed #b33c1a;
  border-radius: 16px;
  padding: 18px 24px;
  cursor: pointer;
  font-weight: 600;
  color: #b33c1a;
  font-size: 1.1rem;
  transition: background 0.2s, border 0.2s;
}
.novo-montar-mesa-btn:hover {
  background: #fffbe6;
  border-color: #ff9800;
}
.montar-mesa-icone {
  width: 38px;
  height: 38px;
  margin-bottom: 6px;
}
.reserva-form-novo {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-row-novo {
  display: flex;
  gap: 18px;
}
.form-group-novo {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
}
.full-width-novo {
  flex: 1 1 100%;
}
.botoes-form-novo {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.btn-reservar-novo {
  flex: 1;
  padding: 12px;
  background: linear-gradient(90deg, #e63946 60%, #ffb347 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(230,57,70,0.08);
  transition: background 0.2s, box-shadow 0.2s;
}
.btn-reservar-novo:hover {
  background: linear-gradient(90deg, #b71c1c 60%, #ffb347 100%);
  box-shadow: 0 4px 16px rgba(230,57,70,0.13);
}
.btn-voltar-novo {
  flex: 1;
  padding: 12px;
  background: #bdbdbd;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-voltar-novo:hover {
  background: #888;
}
.mensagem-topo-novo {
  margin-top: 18px;
  font-size: 1.1em;
  color: #388e3c;
  font-weight: bold;
  text-align: center;
  background: #e8f5e9;
  border-radius: 8px;
  padding: 10px 0;
  box-shadow: 0 2px 8px #b33c1a11;
}
.mensagem-topo-global-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 9999;
  background: #e8f5e9;
  color: #388e3c;
  font-size: 1.15em;
  font-weight: bold;
  text-align: center;
  padding: 18px 0 14px 0;
  border-bottom: 2px solid #b33c1a;
  box-shadow: 0 2px 12px #b33c1a22;
  border-radius: 0 0 16px 16px;
  white-space: pre-line;
}
.mensagem-topo-direita {
  position: fixed;
  top: 32px;
  right: 32px;
  min-width: 320px;
  max-width: 90vw;
  z-index: 9999;
  background: #fffbe6;
  color: #b33c1a;
  font-size: 1.08em;
  font-weight: bold;
  text-align: left;
  padding: 18px 24px 16px 18px;
  border-left: 6px solid #ff9800;
  border-radius: 12px 18px 18px 12px;
  box-shadow: 0 4px 24px #b33c1a22;
  white-space: pre-line;
  animation: slidein 0.4s;
}
.seta-voltar-fixa {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 10001;
  background: transparent;
  border: none;
  border-radius: 50%;
  box-shadow: none;
  padding: 4px;
  cursor: pointer;
  transition: background 0.2s, filter 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.seta-voltar-fixa img {
  width: 32px;
  height: 32px;
  display: block;
}
.seta-voltar-fixa:hover {
  background: #ffe5b4;
  filter: brightness(1.2) drop-shadow(0 4px 12px #b33c1a66);
  transform: scale(1.08);
}
@keyframes slidein {
  from { opacity: 0; right: 0; }
  to { opacity: 1; right: 32px; }
}
@media (max-width: 700px) {
  .reserva-card-novo {
    max-width: 99vw;
    min-height: 0;
    padding: 0 0 16px 0;
    border-radius: 16px;
  }
  .reserva-header-novo, .reserva-main-novo {
    padding-left: 4vw;
    padding-right: 4vw;
  }
  .reserva-title-novo {
    font-size: 1.3rem;
    letter-spacing: 1px;
  }
  .logo-reserva-novo {
    width: 38px;
    height: 38px;
  }
  .form-row-novo {
    flex-direction: column;
    gap: 0;
  }
  .seta-voltar-fixa {
    top: 8px;
    left: 8px;
    padding: 2px;
  }
  .seta-voltar-fixa img {
    width: 22px;
    height: 22px;
  }
}
</style>
