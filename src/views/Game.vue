<template>
  <div v-if="gameData">
    <transition name="fade">
      <div v-if="!gameData.inited || showInfo" class="welcome-view card modal">
        <h4 v-if="!gameData.inited">Pomyślnie utworzono grę!</h4>
        <h3>Rozgrywka {{ gameData.name }}</h3>
        <p>
          Graczy - {{ gameData.players.length }} / {{ gameData.maxPlayers }}
        </p>
        <p>Liczba rund : {{ gameData.rounds }}</p>
        <button @click="copyLink()">
          Skopiuj link
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M448 384H256c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V320c0 35.3-28.7 64-64 64zM64 128h96v48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H256c8.8 0 16-7.2 16-16V416h48v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z"
            />
          </svg>
        </button>
        <p v-if="linkCopied">
          Link pomyślnie skopiowany. Zaproś znajomego do gry wysyłając mu go.
        </p>
        <p>--LUB--</p>
        <p>Użyj kodu QR do dołączenia do rozgrywki.</p>
        <QRCodeVue3
          :value="locationLink"
          :width="250"
          :backgroundOptions="{ color: '#eef2e6' }"
          :dotsOptions="{
            type: 'squares',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#1c6758' },
                { offset: 1, color: '#3d8361' },
              ],
            },
          }"
        />
        <button @click="closeGame">Zamknij</button>
      </div>
    </transition>
    <div class="actions">
      <button @click="showInfo = !showInfo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
          <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"
          />
        </svg>
      </button>
      <button @click="showPlayers = !showPlayers">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z"
          />
        </svg>
      </button>
    </div>
    <transition name="fade">
      <div v-if="showPlayers" class="show-players card modal">
        <div v-for="(player, idx) in gameData.players">
          {{ idx + 1 }}.
          {{ player.name }}
        </div>
      </div>
    </transition>
    <div v-if="showJoin" class="show-join card modal">
      <label for="">Nazwa gracza</label>
      <input type="text" v-model="playerName" />
      <button @click="login">Dołącz</button>
    </div>
    <div class="game-board">G</div>
  </div>
</template>
  
  <script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import games from "../services/games.ts";
import firebase from "firebase/app";
import "firebase/firestore";
import { useGameStore } from "@/store";
import QRCodeVue3 from "qrcode-vue3";
const props = defineProps<{
  id: string;
}>();
const gameData = ref(null);
const gameStore = useGameStore();
function onDataChange(snapshot) {
  const data = snapshot.val();
  console.log(data);
  gameData.value = data;
  gameStore.gameData = data;
}
const playerName = ref("");
const locationLink = window.location.href;
const linkCopied = ref(false);
const showInfo = ref(false);
const showPlayers = ref(false);
const showJoin = ref(false);
function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  linkCopied.value = true;
}

function closeGame() {
  showInfo.value = false;
  games
    .getOne(props.id)
    .update({
      inited: true,
    })
    .then(() => {
      console.log("Game closed");
      gameData.value.inited = true;
    })
    .catch((error) => {
      console.error(error);
    });
}

function joinGame() {
  if (!localStorage.getItem("ryzyk-fizyk-user")) {
    showJoin.value = true;
  }
}

function login() {
  let players = gameData.value.players;
  const playerId = Date.now();
  const newPlayer = {
    id: playerId,
    name: playerName.value,
  };
  if (players) {
    players.push(newPlayer);
  } else {
    players = [newPlayer];
  }
  console.log(players);
  localStorage.setItem(
    "ryzyk-fizyk-user",
    JSON.stringify({ [props.id]: playerId })
  );
  games
    .getOne(props.id)
    .update({
      players: players,
    })
    .then(() => {
      console.log("Player added");
      showJoin.value = false;
    })
    .catch((error) => {
      console.error(error);
    });
}

onMounted(() => {
  games.getOne(props.id).on("value", onDataChange);
  joinGame();
});
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 150px;
  z-index: 10;
  right: 15px;
  left: 15px;
}
.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
button {
  margin: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  svg {
    width: 30px;
    fill: white;
    height: 30px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.show-join {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>