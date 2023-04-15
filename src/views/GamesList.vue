<template>
  <div>
    <h5>Lista gier</h5>
    <div class="table-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Nazwa gry</th>
            <th>Akcje</th>
            <th>Liczba graczy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in allGames" :key="game.key">
            <td>{{ game.name }}</td>
            <td>
              <router-link
                class="button"
                :to="{ name: 'game', params: { id: game.key } }"
              >
                <span>Dołącz</span>
              </router-link>
            </td>
            <td>
              <b>{{ game.players?.length }}</b>
              /
              {{ game.maxPlayers }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import games from "../services/games.ts";
const allGames = ref([]);
const filterString = ref("");
function onDataChange(items) {
  let _tutorials = [];
  console.log(items);
  items.forEach((item) => {
    let key = item.key;
    let data = item.val();
    _tutorials.push({
      key: key,
      name: data.name,
      maxPlayers: data.maxPlayers,
      players: data.players,
    });
  });

  allGames.value = _tutorials;
}

onMounted(() => {
  console.log("teette");
  games.getAll().on("value", onDataChange);
});
</script>

<style scoped>
</style>