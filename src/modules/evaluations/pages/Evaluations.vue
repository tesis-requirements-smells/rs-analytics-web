<template>
  <div class="q-pa-md">
    <q-toolbar>
      <p class="text-title q-mt-md">Evaluaciones de calidad</p>
      <q-space />
      <q-btn class="buttons" icon="add" color="primary" to="/evaluacion" label="Nuevo" />
    </q-toolbar>

    <q-separator color="darkGrey" />

    <EvaluationsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EvaluationsList from '../components/EvaluationsList.vue';

export default defineComponent({
  name: 'EvaluationsPage',

  components: {
    EvaluationsList
  }
})
</script>

<style lang="scss">
  @import 'src/assets/styles/main.scss';
</style>
