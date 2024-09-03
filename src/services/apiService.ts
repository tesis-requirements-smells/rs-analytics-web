import axios from 'axios';

const config = {
  headers: { 'Content-Type': 'application/json' },
  timeout: Number(process.env.TIMEOUT),
  data: {}
};

const apiService = axios.create({...config,
  baseURL: (process.env.API?? '') + (process.env.PATH?? ''),
  withCredentials: true,
});

export { apiService, config };
