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
import games from "../services/games.ts";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const pwdNeeded = ref(false);
const playerId = Date.now();
const gameSettings = reactive({
  name: "",
  username: "",
  maxPlayers: "",
  rounds: "",
  password: "",
  inited: false,
  players: [
    {
      name: "",
      id: playerId,
    },
  ],
});
function addGame() {
  games
    .create(gameSettings)
    .then((ref) => {
      localStorage.setItem(
        "ryzyk-fizyk-user",
        JSON.stringify({ [ref.key]: playerId })
      );
      router.push(`/game/${ref.key}`);
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