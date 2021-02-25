<template>
<div class="scorestable">
<p class="status">Вы играете... {{status}}</p>
  <p class="scores">Очки: {{scores}}</p>
  <p>Таблица Шульте. Генерируется случайным образом поле (5 на 5). Собирайте числовую последовательность от 1 до 25 строго по порядку. </p>
</div>
</template>
<script>
export default {
   props: {
       scores:{
           type: Number,
           required: true
       },
       status:{
           type: String,
           required: true
       }
       
   }
}
</script>
