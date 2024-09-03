<template>
  <div class="q-pa-md">
    <q-toolbar>
      <p class="text-title q-mt-md">{{action}} evaluación de calidad</p>
      <q-space />
      <q-btn v-if="data.input_data_by_requirement.length != 0 && data.input_id" class="buttons q-mr-sm" icon="check" color="primary" @click="startEvaluation" label="Evaluar" />
      <q-btn v-if="data.input_data_by_requirement.length != 0" class="buttons q-mr-sm" icon="save" color="primary" @click="saveEvaluation" label="Guardar" />
      <q-btn class="buttons" icon="close" color="negative" to="/evaluaciones" label="Cancelar" />
    </q-toolbar>

    <q-separator color="darkGrey" />

    <div v-if="data.input_data_by_requirement.length === 0" class="content-create">
      <div class="text-center">
        <p class="text-paragraph">
          <span class="text-h6 text-bold text-primary">Agregar historia de usuario</span> <br />
          Inicia tu evaluación de calidad agregando una historia de usuario.
        </p>
        <q-btn icon="add" color="primary" style="width:215px" @click="addRequirement" label="Historia de usuario" />
        
        <p class="text-paragraph q-mt-lg">o</p>

        <p class="text-paragraph">
          <span class="text-h6 text-bold text-primary">Importar historias de usuario</span> <br />
          Importa las historias de usuario desde un archivo CSV (<a class="text-primary" href="/plantilla-historias-de-usuario.csv" download>descargar plantilla</a>).
        </p>
        <q-btn color="primary" style="width:215px">
          <q-icon name="file_upload" />
          <span class="q-ml-md">Importar datos</span>
          <input 
            type="file" 
            accept=".csv"
            @change="handleFileUpload" 
            class="btn-file"
          />
        </q-btn>
      </div>
    </div>

    <div v-else class="q-pa-md q-gutter-y-md">
      <p class="text-paragraph text-bold text-primary">Información para cada Historia de Usuario</p>
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          align="justify"
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
          narrow-indicator
        >
          <q-tab v-for="requirement in data.input_data_by_requirement" :key="requirement.req_code" :name="requirement.req_code" style="max-width: 80px">
            {{ requirement.req_code }}
          </q-tab>
          
          <q-tab @click="addRequirement" style="max-width: 40px">
            <q-icon name="add" />
          </q-tab>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel v-for="requirement in data.input_data_by_requirement" :key="requirement.req_code" :name="requirement.req_code">
            <div>
              <q-input outlined dense v-model="requirement.req_name" placeholder="Nombre de la historia de usuario" />
              <q-input outlined class="q-mt-md" v-model="requirement.req_data.REQUIREMENT_DESCRIPTION" placeholder="Descripción de la historia de usuario" />
            </div>

            <br />

            <p class="content-input">
              ¿Cuántas semanas se estimaron para implementar la historia de usuario?
              <q-input outlined dense class="q-ml-md data-input" v-model="requirement.req_data.NSEHU" />
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      <p class="text-paragraph text-bold text-primary q-mt-lg">Información para todas las Historias de Usuario</p>
      <div class="row justify-center">
        <div class="col-12 col-sm-6 col-lg-4 q-mb-md">
          <q-card class="q-pa-md text-center">
            <p>
              ¿Cuántas historias de usuario<br />
              fueron revisadas por todos los clientes?
            </p>
            <q-input outlined dense class="data-input" v-model="data.input_data_general.NRRC" />
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-lg-4 q-mb-md">
          <q-card class="q-pa-md text-center">
            <p>
              ¿Cuántas horas en total se dedicaron a<br />
              la comprensión de las historias de usuario?
            </p>
            <q-input outlined dense class="data-input" v-model="data.input_data_general.TTCR" />
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-lg-4 q-mb-md">
          <q-card class="q-pa-md text-center">
            <p>
              ¿Cuántas horas en total se dedicaron a<br />
              la aclaración de las historias de usuario?
            </p>
            <q-input outlined dense class="data-input" v-model="data.input_data_general.TTAR" />
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-lg-4 q-mb-md">
          <q-card class="q-pa-md text-center">
            <p>
              ¿Cuál fue el esfuerzo realizado en la comunicación<br />
              de las historias de usuario a los desarrolladores?
            </p>
            <q-input outlined dense class="data-input" v-model="data.input_data_general.ERCR" />
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-lg-4 q-mb-md">
          <q-card class="q-pa-md text-center">
            <p>
              ¿Cuál fue el esfuerzo estimado en la comunicación<br />
              de las historias de usuario a los desarrolladores?
            </p>
            <q-input outlined dense class="data-input" v-model="data.input_data_general.EECR" />
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-lg-4 q-mb-md">
          <q-card class="q-pa-md text-center">
            <p>
              ¿Cuántas historias de usuario fueron<br />
              revisadas por desarrolladores con experiencia?
            </p>
            <q-input outlined dense class="data-input" v-model="data.input_data_general.NRRDE" />
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-lg-4 q-mb-md">
          <q-card class="q-pa-md text-center">
            <p>
              ¿Cuántas historias de usuario<br />
              tienen pruebas que no se pueden diseñar?
            </p>
            <q-input outlined dense class="data-input" v-model="data.input_data_general.NRPND" />
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-lg-4 q-mb-md">
          <q-card class="q-pa-md text-center">
            <p>
              ¿Cuántas historias de usuario<br />
              identificadas no aportan a los objetivos del negocio?
            </p>
            <q-input outlined dense class="data-input" v-model="data.input_data_general.NRNAON" />
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Papa from 'papaparse';
import { defineComponent, ref } from 'vue';
import { EvaluationsStore, DataEvaluationDTO, InputDataRequirement, DataEvaluationStart } from 'src/stores/evaluationsStore';

const evaluationsModuleStore = EvaluationsStore();

export default defineComponent({
  name: 'FormEvaluation',

  setup () {
    return {
      tab: ref('HU001'),
      action: ref('Crear'),
      data: ref<DataEvaluationDTO>({
        input_id: '',
        input_data_by_requirement: [],
        input_data_general: {
          NRRC: '',
          TTCR: '',
          TTAR: '',
          ERCR: '',
          EECR: '',
          NRRDE: '',
          NRPND: '',
          NRNAON: ''
        }
      })
    };
  },

  created () {
    this.updateData();
  },
  
  methods: {
    updateData () {
      if (evaluationsModuleStore.getEvaluationData.input_id) {
        this.action = 'Editar';
        this.data = evaluationsModuleStore.getEvaluationData;
      }
    },

    addRequirement () {
      const newRequirement: InputDataRequirement = {
        req_code: 'HU00' + (this.data.input_data_by_requirement.length + 1),
        req_name: '',
        req_data: { REQUIREMENT_DESCRIPTION: '', NSEHU: '' }
      };
      this.data.input_data_by_requirement.push(newRequirement);
      this.tab = newRequirement.req_code;
    },

    handleFileUpload (event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files?.[0];

      if (!file || !(file instanceof File)) {
        console.error('No fue seleccionado ningún archivo');
        return;
      }

      Papa.parse(file, {
        header: true,
        complete: (results: any) => { //TODO-VALIDAR
          results.data.forEach((row: any) => { //TODO-VALIDAR
            const newRequirement: InputDataRequirement = {
              req_code: 'HU00' + (this.data.input_data_by_requirement.length + 1),
              req_name: row['Nombre de Historia de Usuario'],
              req_data: { 
                REQUIREMENT_DESCRIPTION: row['Descripción de Historia de Usuario'], 
                NSEHU: '' 
              }
            };
            this.data.input_data_by_requirement.push(newRequirement);
            this.tab = newRequirement.req_code;
          });
        }
      });
    },

    saveEvaluation () {
      if (this.data.input_id) {
        evaluationsModuleStore.updateEvaluation(this.data);
      } else {
        const { input_data_by_requirement, input_data_general } = this.data;
        evaluationsModuleStore.createEvaluation({ input_data_by_requirement, input_data_general });
      }
    },

    startEvaluation () {
      this.saveEvaluation();
      const evaluation: DataEvaluationStart = {
        input_id: this.data.input_id,
        report_name: 'Evaluación de calidad #'+this.data.input_id
      };
      evaluationsModuleStore.startEvaluation(evaluation);
    }
  }
})
</script>

<style lang="scss">
  @import 'src/assets/styles/main.scss';
</style>
