<template>
  <div class="q-pa-md">
    <q-table
      :rows="getResultList"
      :columns="columns"
      row-key="report_id"
      :rows-per-page-options="[]"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn round outline size="sm" class="q-mr-xs" icon="visibility" color="primary" @click="viewResult(props.row.report_id)" />
          <q-btn round outline size="sm" class="q-ml-xs" icon="delete" color="negative" @click="openDialogDelete(props.row.report_id)" />
        </q-td>
      </template>

      <template #no-data>
        <div class="text-center q-pa-md">
          <q-icon name="warning" size="2em" color="warning" />
          <div class="q-mt-xs q-ml-sm float-right">No se encontraron resultados de evaluaciones de calidad para visualizar</div>
        </div>
      </template>
    </q-table>
  </div>

  <q-dialog v-model = "openDialog">
    <Confirmation :close="() => openDialog = false" :confirm="deleteResult" :title="constants.results.deleteResult" />
  </q-dialog>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import { ResultsStore } from 'src/stores/resultsStore';
import Confirmation from 'src/modules/shared/components/Confirmation.vue';
import constants from 'src/assets/jsons/es.json';

const resultsModuleStore = ResultsStore();

export default defineComponent({
  name: 'ResultsList',

  components: {
    Confirmation
  },

  setup () {
    return {
      constants,
      router: useRouter(),
      openDialog: ref(false),
      selectedResultId: ref(''),

      columns: [
        { name: 'report_name', label: 'Nombre de evaluación', align: 'left', field: 'report_name', sortable: true },
        { name: 'report_date', label: 'Fecha de evaluación',  align: 'center', field: 'report_date', sortable: true },
        { name: 'actions', label: 'Acciones', align: 'center' }
      ]
    }
  },

  created() {
    resultsModuleStore.clearState();
    resultsModuleStore.getResultResumeList();
  },

  computed: {
    getResultList () {
      return resultsModuleStore.getResultList;
    }
  },

  methods: {
    viewResult (resultId: string) {
      resultsModuleStore.getResultById(resultId);
      setTimeout(() => this.router.push({ name: 'FormResult' }), 1000);
    },

    deleteResult () {
      resultsModuleStore.deleteResultById(this.selectedResultId);
      this.openDialog = false;
    },

    openDialogDelete (resultId: string) {
      this.selectedResultId = resultId;
      this.openDialog = true;
    }
  }
})
</script>
