import { apiService, config } from './apiService';

class ResultsService {

  getResultResumeList () {
    return apiService.get('/reqsmells/get-reports-resume', config);
  }

  getResultById (resultId: string) {
    return apiService.get(`/reqsmells/get-report/${resultId}`, config);
  }

  deleteResultById (resultId: string) {
    return apiService.delete(`/reqsmells/delete-report/${resultId}`, config);
  }
  
}

export default ResultsService;