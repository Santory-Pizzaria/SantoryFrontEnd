<script>
import MesaCard from './MesaCard.vue';

export default {
  name: 'ReservasLocal',
  components: { MesaCard },
  data() {
    return {
      reserva: {
        nome: '',
        telefone: '',
        data: '',
        hora: '',
        pessoas: 1,
        observacao: ''
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
      this.reserva = { nome: '', telefone: '', data: '', hora: '', pessoas: 1, observacao: '' };
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
      if (!this.reserva.hora) {
        this.erros.hora = 'Escolha um horário.';
      }
      if (!this.reserva.pessoas || this.reserva.pessoas < 1) {
        this.erros.pessoas = 'Informe ao menos 1 pessoa.';
      } else if (this.reserva.pessoas > 20) {
        this.erros.pessoas = 'Máximo de 20 pessoas por reserva.';
      }
      return Object.keys(this.erros).length === 0;
    },
    enviarReserva() {
      if (this.validarFormulario()) {
        // Salva a reserva no localStorage
        this.salvarReserva({
          nome: this.reserva.nome,
          telefone: this.reserva.telefone,
          data: this.reserva.data,
          horario: this.reserva.hora,
          qtdPessoas: this.reserva.pessoas,
          observacao: this.reserva.observacao,
          mesa: this.mesaSelecionada ? this.mesaSelecionada.numero : 'Montada',
          status: 'Aberta'
        });
        this.mensagem = `Reserva realizada para ${this.reserva.nome} no dia ${this.reserva.data} às ${this.reserva.hora}.`;
        this.reserva = { nome: '', telefone: '', data: '', hora: '', pessoas: 1, observacao: '' };
        this.erros = {};
        this.formularioVisivel = false;
        this.mesaSelecionada = null;
        this.montandoMesa = false;
      } else {
        this.mensagem = '';
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
  <div class="reserva-container">
    <div v-if="formularioVisivel" class="seta-voltar" @click="voltarEscolha">
      <img src="@/assets/imagens/seta-preta.png" alt="Voltar" />
    </div>
    <div v-if="!formularioVisivel" class="seta-voltar" @click="irParaMenu">
      <img src="@/assets/imagens/seta-preta.png" alt="Voltar ao menu" />
    </div>
    <h2>Reserva de Mesas</h2>
    <div v-if="!formularioVisivel" class="mesas-grid">
      <MesaCard v-for="mesa in mesas" :key="mesa.numero" :numero="mesa.numero" :cadeiras="mesa.cadeiras" @click="selecionarMesa(mesa)" />
      <div class="novo-montar-mesa-btn" @click="selecionarMontarMesa">
        <span class="montar-mesa-icone-wrapper">
          <img src="@/assets/imagens/adicionar.png" alt="Montar" class="montar-mesa-icone" />
        </span>
        <span class="montar-mesa-label">Montar Mesa</span>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="enviarReserva" class="reserva-form" novalidate>
        <div v-if="montandoMesa" class="form-group">
          <label for="cadeiras">Quantidade de Cadeiras</label>
          <div class="input-wrapper">
            <input type="number" id="cadeiras" v-model.number="reserva.pessoas" min="1" max="20" />
          </div>
        </div>
        <div class="form-group">
          <label for="nome">Nome</label>
          <div class="input-wrapper">
            <input type="text" id="nome" v-model="reserva.nome" :class="{'erro': erros.nome}" placeholder="Digite seu nome completo" autocomplete="off" />
            <span v-if="erros.nome" class="erro-msg">{{ erros.nome }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <div class="input-wrapper">
            <input type="tel" id="telefone" v-model="reserva.telefone" :class="{'erro': erros.telefone}" placeholder="(99) 99999-9999" maxlength="15" autocomplete="off" />
            <span v-if="erros.telefone" class="erro-msg">{{ erros.telefone }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="data">Data</label>
          <div class="input-wrapper">
            <input type="date" id="data" v-model="reserva.data" :class="{'erro': erros.data}" :min="dataMinima" />
            <span v-if="erros.data" class="erro-msg">{{ erros.data }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="hora">Horário</label>
          <div class="input-wrapper">
            <input type="time" id="hora" v-model="reserva.hora" :class="{'erro': erros.hora}" />
            <span v-if="erros.hora" class="erro-msg">{{ erros.hora }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="observacao">Observação</label>
          <div class="input-wrapper">
            <textarea id="observacao" v-model="reserva.observacao" placeholder="Alguma observação? (opcional)" rows="2"></textarea>
          </div>
        </div>
        <button type="submit" class="btn-reservar">Reservar Mesa</button>
        <button type="button" class="btn-voltar" @click="voltarEscolha">Voltar</button>
      </form>
      <div v-if="mensagem" class="mensagem">{{ mensagem }}</div>
    </div>
  </div>
</template>

<style scoped>
.reserva-container {
  max-width: 420px;
  margin: 48px auto;
  padding: 32px 28px 24px 28px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(44,62,80,0.13);
  font-family: 'Roboto', Arial, sans-serif;
}
.reserva-container h2 {
  text-align: center;
  margin-bottom: 28px;
  color: #e63946;
  font-weight: 700;
  letter-spacing: 1px;
}
.mesas-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
}
.reserva-form .form-group {
  margin-bottom: 22px;
}
.reserva-form label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #222;
  letter-spacing: 0.5px;
}
.input-wrapper {
  position: relative;
}
.reserva-form input {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #bdbdbd;
  border-radius: 6px;
  font-size: 15px;
  outline: none;
  transition: border 0.2s;
  background: #fafafa;
}
.reserva-form input:focus {
  border-color: #e63946;
  background: #fff;
}
.reserva-form input.erro {
  border-color: #e63946;
  background: #fff0f0;
}
.erro-msg {
  color: #e63946;
  font-size: 13px;
  margin-top: 2px;
  position: absolute;
  left: 0;
  top: 38px;
}
.btn-reservar {
  width: 100%;
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
  margin-top: 10px;
}
.btn-reservar:hover {
  background: linear-gradient(90deg, #b71c1c 60%, #ffb347 100%);
  box-shadow: 0 4px 16px rgba(230,57,70,0.13);
}
.mensagem {
  margin-top: 28px;
  color: #388e3c;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
  background: #e8f5e9;
  border-radius: 6px;
  padding: 10px 0;
}
.mesa-card.montar-mesa {
  cursor: pointer;
  opacity: 0.85;
  border: 2px dashed #e63946;
  background: #fff7e6;
  transition: box-shadow 0.2s, opacity 0.2s;
}
.mesa-card.montar-mesa:hover {
  opacity: 1;
  box-shadow: 0 0 0 3px #ffe5b4;
}
.mesa-circular.especial {
  background: #fff3e0;
  border: 2px dashed #e63946;
}
.btn-voltar {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: #bdbdbd;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-voltar:hover {
  background: #888;
}
.reserva-form textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1.5px solid #bdbdbd;
  border-radius: 6px;
  font-size: 15px;
  background: #fafafa;
  resize: vertical;
}
.seta-voltar {
  position: absolute;
  top: 18px;
  left: 18px;
  cursor: pointer;
  z-index: 10;
}
.seta-voltar img {
  width: 32px;
  height: 32px;
}
.montar-mesa-icone {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
}
.novo-montar-mesa-btn {
  cursor: pointer;
  opacity: 0.85;
  border: none;
  background: #e63946;
  color: #fff;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 500;
  transition: background 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}
.novo-montar-mesa-btn:hover {
  background: #b71c1c;
  box-shadow: 0 4px 16px rgba(230,57,70,0.13);
}
.montar-mesa-icone-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
