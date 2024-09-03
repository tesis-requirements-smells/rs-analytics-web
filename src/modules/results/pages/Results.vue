<template>
  <div class="q-pa-md">
    <q-toolbar>
      <p class="text-title q-mt-md">Resultados de evaluaciones de calidad</p>
    </q-toolbar>

    <q-separator color="darkGrey" />

    <ResultsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ResultsList from '../components/ResultsList.vue';

export default defineComponent({
  name: 'ResultsPage',

  components: {
    ResultsList
  }
})
</script>

<style lang="scss">
  @import 'src/assets/styles/main.scss';
</style>
