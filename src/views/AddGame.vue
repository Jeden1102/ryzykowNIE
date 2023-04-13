<template>
  <div>
    <h4>Utwórz grę</h4>
    <div class="box">
      <label for="">Nazwa gry</label>
      <input type="text" v-model="gameSettings.name" />
    </div>
    <div class="box">
      <label for="">Nazwa gracza</label>
      <input type="text" v-model="gameSettings.players[0].name" />
    </div>
    <div class="box">
      <label for="">Max. liczba graczy</label>
      <input type="number" v-model="gameSettings.maxPlayers" />
    </div>
    <div class="box">
      <label for="">Liczba rund</label>
      <input type="number" v-model="gameSettings.rounds" />
    </div>
    <div class="box">
      <label for="">Wymagaj hasła do dołączenia</label>
      <div class="checkbox-wrapper">
        <input id="pwd" type="checkbox" class="switch" v-model="pwdNeeded" />
      </div>
      <input v-if="pwdNeeded" type="text" v-model="gameSettings.password" />
    </div>
    <div class="box">
      <button @click="addGame">Utwórz</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import games from "../services/games.js";
const pwdNeeded = ref(false);
const gameSettings = reactive({
  name: "",
  username: "",
  maxPlayers: "",
  rounds: "",
  password: "",
  players: [
    {
      name: "",
      id: Date.now(),
    },
  ],
});
function addGame() {
  games
    .create(gameSettings)
    .then(() => {
      console.log("git");
    })
    .catch((e: any) => {});
}
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 8px 0;
}
</style>