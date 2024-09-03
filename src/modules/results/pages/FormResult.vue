<template>
  <div class="q-pa-md">
    <q-toolbar>
      <p class="text-title q-mt-md">Resultado de evaluación de calidad</p>
      <q-space />
      <q-btn class="buttons q-mr-sm" icon="download" color="primary" @click="downloadResult" label="Descargar" />
      <q-btn class="buttons" icon="close" color="negative" to="/resultados" label="Cancelar" />
    </q-toolbar>

    <q-separator color="darkGrey" />

    <div class="q-pa-md q-gutter-y-md">
      <div class="row">
        <div class="col-8">
          <p class="text-paragraph text-bold text-primary">Resultado para cada Historia de Usuario</p>
        </div>
        <div class="col-4">
          <q-pagination
            class="float-right"
            v-model="selectedRequirement"
            :max="data?.results_by_requirement?.length || 0"
            input
          />
        </div>
      </div>

      <q-card>
        <q-card-section class="bg-grey-3" style="height: 36px">
          <p class="text-bold" style="margin-top: -8px">Historia de usuario: {{ data?.results_by_requirement[selectedRequirement-1].req_code }}</p>
        </q-card-section>
        <q-card-section>
          <p>{{ data?.results_by_requirement[selectedRequirement-1].req_detail }}</p>
        </q-card-section>
      </q-card>

      <q-card v-for="metricRequirement in data?.results_by_requirement[selectedRequirement-1].results" :key="metricRequirement.metric_id">
        <q-card-section>
          <div class="row q-mb-xs">
            <div class="col-9 q-pt-sm">
              <p class="text-bold">{{ metricRequirement.metric_name }} ({{ metricRequirement.metric_id }})</p>
            </div>
            <div class="col-3">
              <q-chip class="float-right" :color="getSeverityColor(metricRequirement.severity)" text-color="white">
                {{ metricRequirement.score.toFixed(2) }}
              </q-chip>
            </div>
          </div>

          <p class="text-italic" v-html="highlightSmells(data?.results_by_requirement[selectedRequirement-1].req_detail, metricRequirement.tags)"></p>
          <p>
            <span class="text-bold">Clasificación: </span> {{ metricRequirement.classification }} <br/>
            <span class="text-bold">Descripción: </span> {{ metricRequirement.description }}
          </p>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-md q-gutter-y-md">
      <p class="text-paragraph text-bold text-primary">Resultado para todas las Historias de Usuario</p>
      
      <q-card v-for="metricGeneral in data?.results_general" :key="metricGeneral.metric_id">
        <q-card-section>
          <div class="row q-mb-xs">
            <div class="col-9 q-pt-sm">
              <p class="text-bold">{{ metricGeneral.metric_name }} ({{ metricGeneral.metric_id }})</p>
            </div>
            <div class="col-3">
              <q-chip class="float-right" :color="getSeverityColor(metricGeneral.severity)" text-color="white">
                {{ metricGeneral.score.toFixed(2) }}
              </q-chip>
            </div>
          </div>
          
          <p>
            <span class="text-bold">Clasificación: </span> {{ metricGeneral.classification }} <br/>
            <span class="text-bold">Descripción: </span> {{ metricGeneral.description }}
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ResultsStore, DataResultDTO, Tag } from 'src/stores/resultsStore';

const resultsModuleStore = ResultsStore();

export default defineComponent({
  name: 'FormResult',

  setup () {
    return {
      selectedRequirement: ref(1),
      data: ref<DataResultDTO>()
    }
  },

  created () {
    this.updateData();
  },

  methods: {
    updateData () {
      if (resultsModuleStore.getResultData.report_id) {
        this.data = resultsModuleStore.getResultData;
      }
    },

    downloadResult () {
      console.log('Descargar resultado');
    },

    getSeverityColor (severity: string) {
      switch (severity) {
        case 'OK':
          return 'positive';
        case 'LEVE':
          return 'warning';
        case 'MEDIA':
          return 'orange';
        case 'ALTA':
          return 'negative';
        default:
          return 'grey';
      }
    },

    highlightSmells(text: string | undefined, tags: Tag[]) {
      if (!text || !tags) return text;

      tags.forEach(tag => {
        const regex = new RegExp(`\\b${tag.key}\\b`, 'gi');
        text = text?.replace(regex, `<span class="highlightSmell" title="${tag.value}">${tag.key}</span>`);
      });

      return text;
    }
  }  
})
</script>

<style lang="scss">
  @import 'src/assets/styles/main.scss';
</style>
   
