import axios from "axios";
//let apiURL ="http://localhost:3000/api/";
let apiURL= "http://localhost:8080/phpapi/"
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
      return await axios.get(apiURL+"read.php")
      .then((response)=>{
       commit("setJournalsData", { data: response, meta: false });
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
    async addJournals({ commit }, params) {
      return await axios.post(apiURL + "create.php",{
        "textitem":params.content,
        "submitdate": params.time,
        "location": params.location
      })
      .then((response)=>{
        commit("setJournalsData", { data: response, meta: true });
        
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async updateJournals({ commit }, params) {  
       // + params.content+ "&id="+params.id
      return await axios.post(apiURL + "update.php",{
        "textitem":params.content,
        "id": params.id
      })
      .then((response)=>{
        commit("setJournalsData", { data: response, meta: true });    
          
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
     async deleteJournals({ commit }, params) {
     return await axios.post(apiURL + "delete.php",{
      "id": params.id
    })
     .then((response)=>{
       commit("setJournalsData", { data: response, meta: true });
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
