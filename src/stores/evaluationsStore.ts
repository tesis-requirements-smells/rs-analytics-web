import { defineStore } from 'pinia';
import { AxiosResponse, AxiosError } from 'axios';
import { MessageResponse } from './models';
import { negativeNotification, positiveNotification } from 'src/assets/functions/notifications';
import constants from 'src/assets/jsons/es.json';
import EvaluationsService from 'src/services/evaluationsService';

export interface DataEvaluationStart {
  input_id: string;
  report_name: string;
}

export interface DataEvaluationDTO {
  input_id: string;
  input_data_by_requirement: InputDataRequirement[];
  input_data_general: InputDataGeneral;
}

export interface DataEvaluationCreate {
  input_data_by_requirement: InputDataRequirement[];
  input_data_general: InputDataGeneral;
}

export interface InputDataRequirement {
  req_code: string;
  req_name: string;
  req_data: DataRequirement;
}

interface InputDataGeneral {
  NRRC: string;
  TTCR: string;
  TTAR: string;
  ERCR: string;
  EECR: string;
  NRRDE: string;
  NRPND: string;
  NRNAON: string;
}

interface DataRequirement {
  REQUIREMENT_DESCRIPTION: string;
  NSEHU: string;
}

export interface EvaluationResumeDTO {
  input_id: string;
  input_modification_date: string;
  input_status: string;
}

const service = new EvaluationsService();

export const EvaluationsStore = defineStore('evaluationsStore', {
  
  state: () => ({
    evaluationData: {} as DataEvaluationDTO,
    evaluationList: [] as EvaluationResumeDTO[]
  }),

  getters: {
    getEvaluationData: (state) => {
      return state.evaluationData;
    },

    getEvaluationList: (state) => {
      return state.evaluationList;
    }
  },

  actions: {
    clearState () {
      this.$reset();
    },

    showErrorService (errorMessage: string | undefined) {
      if (errorMessage) {
        negativeNotification(errorMessage);
      } else {
        negativeNotification(constants.error.serviceUnavailable);
      }
    },

    async createEvaluation (data: DataEvaluationCreate) {
      await service.createEvaluation(data).then((response) => {
        positiveNotification(response.data.message);
        this.router.push({ name: 'Evaluations' });
      }).catch((error: AxiosError<MessageResponse>) => {
        this.showErrorService(error.response?.data.message);
      })
    },

    async updateEvaluation (data: DataEvaluationDTO) {
      await service.updateEvaluation(data).then((response) => {
        positiveNotification(response.data.message);
      }).catch((error: AxiosError<MessageResponse>) => {
        this.showErrorService(error.response?.data.message);
      })
    },

    async startEvaluation (data: DataEvaluationStart) {
      await service.startEvaluation(data).then((response) => {
        positiveNotification(response.data.message);
        this.router.push({ name: 'Results' });
      }).catch((error: AxiosError<MessageResponse>) => {
        this.showErrorService(error.response?.data.message);
      })
    },

    async getEvaluationResumeList () {
      await service.getEvaluationResumeList().then((response: AxiosResponse<EvaluationResumeDTO[]>) => {
        this.evaluationList = response.data;
      }).catch((error: AxiosError<MessageResponse>) => {
        this.showErrorService(error.response?.data.message);
      })
    },

    async getEvaluationById (evaluationId: string) {
      await service.getEvaluationById(evaluationId).then((response: AxiosResponse<DataEvaluationDTO>) => {
        this.evaluationData = response.data;
      }).catch((error: AxiosError<MessageResponse>) => {
        this.showErrorService(error.response?.data.message);
      })
    },
    
    async deleteEvaluationById (evaluationId: string) {
      await service.deleteEvaluationById(evaluationId).then((response: AxiosResponse<MessageResponse>) => {
        positiveNotification(response.data.message);
        this.getEvaluationResumeList();
      }).catch((error: AxiosError<MessageResponse>) => {
        this.showErrorService(error.response?.data.message);
      })
    }
  }
});
