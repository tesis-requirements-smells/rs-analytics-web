import { defineStore } from 'pinia';
import { AxiosResponse, AxiosError } from 'axios';
import { MessageResponse } from './models';
import { negativeNotification, positiveNotification } from 'src/assets/functions/notifications';
import constants from 'src/assets/jsons/es.json';
import ResultsService from 'src/services/resultsService';

export interface DataResultDTO {
  report_id: string;
  report_name: string;
  report_date: string;
  report_overall_score: number;
  results_by_requirement: RequirementResult[];
  results_general: MetricsResult[];
}

interface RequirementResult {
  req_code: string;
  req_name: string;
  req_detail: string;
  results: MetricsResult[];
}

interface MetricsResult {
  score: number;
  severity: string;
  metric_id: string;
  metric_name: string;
  classification: string;
  description: string;
  tags: Tag[];
}

export interface Tag {
  key: string;
  value: string;
}

interface ResultResumeDTO {
  report_id: number
  report_date: string;
  report_name: string;
  report_overall_score: number; //TODO-VALIDAR SI ES NECESARIO O SI SE ELIMINA
}

const service = new ResultsService();

export const ResultsStore = defineStore('resultsStore', {
  
  state: () => ({
    resultData: {} as DataResultDTO,
    resultList: [] as ResultResumeDTO[]
  }),

  getters: {
    getResultData: (state) => {
      return state.resultData;
    },

    getResultList: (state) => {
      return state.resultList;
    },
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

    async getResultResumeList () {
      await service.getResultResumeList().then((response: AxiosResponse<ResultResumeDTO[]>) => {
        this.resultList = response.data;
      }).catch((error: AxiosError<MessageResponse>) => {
        this.showErrorService(error.response?.data.message);
      })
    },

    async getResultById (resultId: string) {
      await service.getResultById(resultId).then((response: AxiosResponse<DataResultDTO>) => {
        this.resultData = response.data;
      }).catch((error: AxiosError<MessageResponse>) => {
        this.showErrorService(error.response?.data.message);
      })
    },
    
    async deleteResultById (resultId: string) {
      await service.deleteResultById(resultId).then((response: AxiosResponse<MessageResponse>) => {
        positiveNotification(response.data.message);
        this.getResultResumeList();
      }).catch((error: AxiosError<MessageResponse>) => {
        this.showErrorService(error.response?.data.message);
      })
    }
  }
});
