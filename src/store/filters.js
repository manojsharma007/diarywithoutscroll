import axios from "axios";
let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
//let apiURL ="http://localhost:3000/api/";
let apiURL= "http://localhost:8080/phpapi/nodediaryapis/"
//let apiURL ="https://diary.manojksharma.in/api/";
export default {
  namespaced: true,
  state: {   
    journalsData:[],
    updateJournalsData:[],
    records:[]
  },
  getters: {
    getJournalsData(state) {
      return state.journalsData;
    },
    getUpdateJournalsData(state) {
      return state.updateJournalsData;
    },
    getRecordsJournals(state) {     
      return state.records;
    }
  },
  mutations: {
    setJournalsData(state, payload) {      
        state.journalsData= payload.data;     
    },
    setUpdateJournalsData(state, payload) {
      state.updateJournalsData = payload;
    },
    setRecordsJournalsData(state, payload) {
      state.records = payload;
    }

  },
  actions: {
    async getAllJournals({ commit }) {  
      return await axios.post(apiURL+"read.php",{
        "token":token
      })
      .then((response)=>{
       commit("setJournalsData", { data: response.data, meta: false });
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
    async addJournals({ commit }, params) {
      return await axios.post(apiURL + "create.php",{
        "textitem":params.content,
        "submitdate": params.time,
        "location": params.location,
        "token":token
      })
      .then((response)=>{
        commit("setJournalsData", { data: response.data, meta: true });
        
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async updateJournals({ commit }, params) {  
       // + params.content+ "&id="+params.id
      return await axios.post(apiURL + "update.php",{
        "textitem":params.content,
        "id": params.id,
        "token":token
      })
      .then((response)=>{
        commit("setJournalsData", { data: response.data, meta: true });    
          
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async deleteJournals({ commit }, params) {
     return await axios.post(apiURL + "delete.php",{
      "id": params.id,
      "token":token
    })
     .then((response)=>{
       commit("setJournalsData", { data: response.data, meta: true });
     })
     .catch((error)=>{     
        console.log(error);
     })     
    },
     commitUpdateJournal({ commit }, params) {  
     commit("setUpdateJournalsData", params);          
     }
  }
}
