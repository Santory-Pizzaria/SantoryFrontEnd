<script>
export default {
  name: "App",
  data() {
    return {
      form: {
        nome: "",
        numero: "",
        rua: "",
        complemento: "",
      },
    };
  },
  methods: {
    enviarFormulario() {
      console.log("Dados enviados:", this.form);
      alert("Endereço enviado com sucesso!");
    },
  },
};
</script>
<template>
  <div class="container-tudo">

    <div class="header">Endereço</div>
    <h2 class="subheader">Adicionar Endereço:</h2>

    <div class="card">

      <div class="left">
        <img src="/src/assets/imagens/logo.png" alt="Logo" class="logo-endereco" />
        <h3 class="title">Santory Pizzaria</h3>

        <h4 class="section-title">Contate-Nos</h4>
        <p>665, Rua Tecnicos Agricola, +55 47 4002-8922</p>
        <p>Seg - Sex: 9h - 20h<br />Sáb - Dom: 9h - 12h</p>
        <a href="mailto:email@exemplo.com" class="email">email@exemplo.com</a>

        <h4 class="section-title">Siga-nos</h4>
      </div>


      <form class="form" @submit.prevent="enviarFormulario">
        <input v-model="form.nome" type="text" placeholder="Nome Completo" />
        <input v-model="form.numero" type="text" placeholder="Numero" />
        <input v-model="form.rua" type="text" placeholder="Rua/Bairro" />
        <label for="complemento">Complemento:</label>
        <input id="complemento" v-model="form.complemento" type="text" />
        <button type="submit">Continuar</button>
      </form>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.header {
  background-color: orange;
  color: white;
  font-weight: bold;
  padding: 10px 0;
  font-size: 18px;
  text-align: center;
}

.subheader {
  margin: 15px 0;
  color: #444;
  text-align: center;
}

.card {
  background-color: #e5e5e5;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.left {
  width: 100%;
  max-width: 300px;
  text-align: center;
  margin-bottom: 20px;
}

.logo-endereco {
  width: 80px;
  margin-bottom: 10px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.section-title {
  color: teal;
  margin-top: 15px;
}

.email {
  color: #007bff;
  text-decoration: underline;
}

.form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

P {
  padding: 10px;
}

.form input {
  padding: 8px;
  border: none;
  border-bottom: 1px solid #999;
  background: transparent;
  outline: none;
}

.form button {
  background-color: teal;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form button:hover {
  background-color: #006666;
}
</style>
