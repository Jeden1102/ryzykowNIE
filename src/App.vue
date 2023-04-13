<template>
  <header>
    <h1>Ryzykow<span>NIE</span></h1>
  </header>
  <TheNavigation />
  <div class="container">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import TheNavigation from "@/components/TheNavigation.vue";
</script>
<style lang="scss">
#app {
  background: $background;
}
header {
  h1 {
    font-weight: 500;
    text-align: center;
    span {
      font-weight: bold;
      color: $secondary-green;
    }
  }
}
</style>
