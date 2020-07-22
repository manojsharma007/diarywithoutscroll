import axios from "axios";
let apiURL ="http://localhost:3000/api/";
//let apiURL ="http://nodeapi.manojksharma.in/api/";
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
        state.journalsData= payload.data.data;     
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
      return await axios.get(apiURL+"allJournal")
      .then((response)=>{
       commit("setJournalsData", { data: response, meta: false });
      })
      .catch((error)=>{     
         console.log(error);
      })     
     },
    async addJournals({ commit }, params) {
      return await axios.post(apiURL + "addJournal",{
        "textitem":params.content,
        "date": params.time
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
      return await axios.post(apiURL + "updateJournal",{
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
     return await axios.post(apiURL + "deleteJournal",{
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
