<template>
  <div>tteette {{ attendants }}</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import dbService from "../services/dbService.js";
const attendants = ref([]);
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
      agreement: data.agreement,
      th: data.th,
      fr: data.fr,
      sat: data.sat,
    });
  });

  attendants.value = _tutorials;
}

onMounted(() => {
  console.log("teette");
  dbService.getAll().on("value", onDataChange);
});
</script>

<style scoped>
</style>