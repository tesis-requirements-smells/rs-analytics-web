<template>
  <q-card class="q-pa-md">
    <div class="row items-start q-mb-sm justify-center">
      <p class="text-paragraph">{{ title }}</p>
    </div>
    <div class="row justify-end">
      <q-btn class="buttons q-mr-sm" icon="check" color="primary" @click="confirm()" label="Confirmar" />
      <q-btn class="buttons" icon="close" color="negative" @click="close()" label="Cancelar" />
    </div>
  </q-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfirmationComponent',
  
  props: {
    title: {
      type: String,
      default: '',
    },
    confirm: {
      type: Function,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    }
  }
})
</script>
