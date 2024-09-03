import { apiService, config } from './apiService';
import { DataEvaluationCreate, DataEvaluationDTO, DataEvaluationStart } from 'src/stores/evaluationsStore';

class EvaluationsService {

  createEvaluation (data: DataEvaluationCreate) {
    return apiService.post('/reqsmells/save-evaluation-data', data, config);
  }

  updateEvaluation (data: DataEvaluationDTO) {
    return apiService.post('/reqsmells/save-evaluation-data', data, config);
  }

  startEvaluation (data: DataEvaluationStart) {
    return apiService.post('/reqsmells/evaluate', data, config);
  }

  getEvaluationResumeList () {
    return apiService.get('/reqsmells/get-evaluation-resume/DRAFT', config);
  }

  getEvaluationById (evaluationId: string) {
    return apiService.get(`/reqsmells/get-evaluation/${evaluationId}`, config);
  }

  deleteEvaluationById (evaluationId: string) {
    return apiService.delete(`reqsmells/delete-evaluation-data/${evaluationId}`, config);
  }
  
}

export default EvaluationsService;