<template>
  <div class="q-pa-md">
    <q-table
      :rows="getEvaluationList"
      :columns="columns"
      row-key="input_id"
      :rows-per-page-options="[]"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn round outline size="sm" class="q-mr-xs" icon="edit" color="primary" @click="editEvaluation(props.row.input_id)" />
          <q-btn round outline size="sm" class="q-ml-xs" icon="delete" color="negative" @click="openDialogDelete(props.row.input_id)" />
        </q-td>
      </template>

      <template #no-data>
        <div class="text-center q-pa-md">
          <q-icon name="warning" size="2em" color="warning" />
          <div class="q-mt-xs q-ml-sm float-right">No se encontraron evaluaciones de calidad para visualizar</div>
        </div>
      </template>
    </q-table>
  </div>

  <q-dialog v-model = "openDialog">
    <Confirmation :close="() => openDialog = false" :confirm="deleteEvaluation" :title="constants.evaluations.deleteEvaluation" />
  </q-dialog>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import { EvaluationsStore, EvaluationResumeDTO } from 'src/stores/evaluationsStore';
import Confirmation from 'src/modules/shared/components/Confirmation.vue';
import constants from 'src/assets/jsons/es.json';

const evaluationsModuleStore = EvaluationsStore();

export default defineComponent({
  name: 'EvaluationsList',

  components: {
    Confirmation
  },

  setup () {
    return {
      constants,
      router: useRouter(),
      openDialog: ref(false),
      selectedEvaluationId: ref(''),

      columns: [
        { name: 'input_id', label: 'Nombre de evaluación', field: (row: EvaluationResumeDTO) => `Evaluación de calidad #${row.input_id}`, align: 'left', sortable: true },
        { name: 'input_modification_date', label: 'Fecha de modificación', field: 'input_modification_date', align: 'center', sortable: true },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center', sortable: false }
      ]
    }
  },

  created () {
    evaluationsModuleStore.clearState();
    evaluationsModuleStore.getEvaluationResumeList();
  },

  computed: {
    getEvaluationList () {
      return evaluationsModuleStore.getEvaluationList;
    }
  },

  methods: {
    editEvaluation (evaluationId: string) {
      evaluationsModuleStore.getEvaluationById(evaluationId);
      setTimeout(() => this.router.push({ name: 'FormEvaluation' }), 1000);
    },

    deleteEvaluation () {
      evaluationsModuleStore.deleteEvaluationById(this.selectedEvaluationId);
      this.openDialog = false;
    },

    openDialogDelete (evaluationId: string) {
      this.selectedEvaluationId = evaluationId;
      this.openDialog = true;
    }
  }
})
</script>
