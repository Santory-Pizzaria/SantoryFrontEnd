<template>
  <div class="mesa-card">
    <div class="mesa-circular">
      <span class="numero-mesa">{{ numero }}</span>
      <template v-for="cadeira in cadeiras" :key="cadeira">
        <div :class="['cadeira', 'cadeira-' + cadeira]">
          <img src="/src/assets/imagens/perfil.png" alt="Cadeira" />
        </div>
      </template>
    </div>
    <div class="qtd-cadeiras">{{ cadeiras }} cadeira(s)</div>
  </div>
</template>

<script>
export default {
  name: 'MesaCard',
  props: {
    numero: { type: Number, required: true },
    cadeiras: { type: Number, required: true }
  }
}
</script>

<style scoped>
.mesa-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 18px;
}
.mesa-circular {
  position: relative;
  width: 90px;
  height: 90px;
  background: #ffe5b4;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(44,62,80,0.13);
  display: flex;
  align-items: center;
  justify-content: center;
}
.numero-mesa {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  font-weight: bold;
  color: #b71c1c;
  z-index: 2;
}
.cadeira {
  position: absolute;
  width: 28px;
  height: 28px;
  background: none;
  z-index: 1;
}
.cadeira img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px #aaa);
}
.qtd-cadeiras {
  margin-top: 8px;
  font-size: 15px;
  color: #444;
}
/* Posicionamento das cadeiras ao redor da mesa (até 8 cadeiras) */
.cadeira-1 { top: -14px; left: 50%; transform: translate(-50%, 0); }
.cadeira-2 { top: 10px; right: -18px; }
.cadeira-3 { bottom: 10px; right: -18px; }
.cadeira-4 { bottom: -14px; left: 50%; transform: translate(-50%, 0); }
.cadeira-5 { bottom: 10px; left: -18px; }
.cadeira-6 { top: 10px; left: -18px; }
.cadeira-7 { top: -6px; left: 10px; }
.cadeira-8 { top: -6px; right: 10px; }
</style>
