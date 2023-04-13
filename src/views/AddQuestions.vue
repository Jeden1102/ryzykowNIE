<template>
  <div class="add__attendant card">
    <label for="">Dodaj pytanie</label>
    <textarea v-model="question" type="text" style="height: 500px" />
    <button @click="addAttendant">Dodaj</button>
  </div>
</template>
  
  <script setup lang="ts">
import { ref } from "vue";
import dbService from "../services/dbService.js";
import { useToast } from "vue-toastification";

const question = ref("");
const emit = defineEmits(["refreshList"]);
const toast = useToast();
function addAttendant() {
  const questions = JSON.parse(question.value);
  questions.forEach((question) => {
    dbService
      .create(question)
      .then(() => {
        console.log("git");
      })
      .catch((e: any) => {});
  });
  question.value = "";
}
</script>
  
  <style >
.card {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.17);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
}
.add__attendant {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
  
  <!-- Hanna Kowalczyk;Sabina Ożóg;Alicja Borkowska;Hanna Marcinowska;Julia Pawleta;Adriana Dworak;Oskar Konieczny;Anna Paruszewska;Alicja Pieniążek;Zuzanna Kazek;Kornelia Pawełczuk;Maja Ryniak;Magdalena Konik;Weronika Bienias;Emilia Hanko;Malwina Makara;Kaja Wojtas;Anna Kowalczyk;Oliwia Boska;Julia Wąsiak;Maria Olchowy;Paulina Spychała;Ewa Siłka;Wojciech Janicki;Ola Zima;Anna Kodura;Wiktoria;Kopczewska;Karolina Hajbura;Agata Twardochleb;Wiktoria Felusiak;Kaja Fiedeń;Hanna Gorczyńska;Wojciech Okuniewicz;Olga Borosz;Jasmine Duda;Marta Popów;Oliwier Gotwald;Hanna Stachurska;Mateusz Nieckarz;Zuzanna Bernacka;Daria Perkowska -->