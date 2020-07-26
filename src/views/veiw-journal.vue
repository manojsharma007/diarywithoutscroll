<template>

  <div class="viewjr">   
    <div class="main-wrapper">
      <section class="blog-list">
          <div class="row box-shadow-full">
          <div class="timeview">
                <span class="date">
                  <b-icon icon="clock-history"></b-icon>
                   {{listItems.submitdate}} , Place : Hydrabad
                </span>
          </div>
          <div class="intro viewjournal" v-html=listItems.textitem></div>
        </div>
        <b-row class="text-center footer">
          <b-col>
          <b-button variant="info" style="margin-right:-68px"  @click="editJournal">Edit journal </b-button>
        </b-col>
            <b-col>
          <b-button variant="danger" style="margin-right:0 0px 0 12px" :disabled="disable"  @click="deleteJournal">Delete </b-button>
        </b-col>
          <b-col>
            <b-button style="margin-left:-34px" @click="goToDiarylist" class="backbutton" variant="info">
              Back to List</b-button>
          </b-col>
        </b-row>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
//import {EventBus} from "../main";
export default {
  data() {
    return {
      listItems: [
        {
          textitem: ""
        }
      ],
      disable:false
    };
  },
  computed: {
    // GET THE ALL TABLES DATA FROM GETTER
    ...mapGetters({
      JournalsData: "filters/getJournalsData"
    })
  },
  created() {
    let filterData = [];
    if (this.JournalsData.data) {
      filterData = this.JournalsData.data.find(
        item => item.id == this.$route.params.id
      );
      localStorage.setItem("journalView", JSON.stringify(filterData));
    } else {
      let itemJournal = JSON.parse(localStorage.getItem("journalView"));
      filterData = itemJournal;
    }
    this.listItems = filterData;
  },
  methods: {
    ...mapActions({
      commitUpdateJournals: "filters/commitUpdateJournal",
      deleteJournals: "filters/deleteJournals"
    }),
    editJournal() {
      this.commitUpdateJournals(this.listItems);
      this.$router.push({ name: "addjournal" });
    },
    async deleteJournal() {
      if(confirm('are you sure?')){
      this.disable=true;
      await this.deleteJournals(this.listItems);
      this.$router.push({ name: "diarylist" });
      }     
    },
    viewjournal() {
      this.$router.push({ name: "viewjournal" });
    },
    formatText(text) {
      return text.substr(0, 110);
    },
    goToDiarylist() {
      this.$router.push({ name: "diarylist" });
    }
  }
};
</script>
<style>
.container {
  display: flex;
  flex-wrap: wrap;
  margin-right: 0px;
  margin-left: -15px;
  text-align: justify;
  margin-bottom: 10px;
}
.time {
  font-size: 12px;
  margin: 4px 0 12px 0;
}
.monthname {
  color: gray;
  background: #f7f7f9;
}
.diarylist {
  margin: -33px 0 0 0;
}

.viewjournal {
  margin-left: 15px;
  margin-right: 15px;
  text-align: justify;
}
.footer {
  min-height: 70px !important;
}
.backbutton {
  margin: 1px 0 0 -21px;
  padding: 4px 8px 7px 13px;
  float: left;
}
.box-shadow-full {
    position: relative;
    z-index: 2;
    -webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2);
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2);
    margin: 20px 14px 13px 13px;
}
.timeview {
  margin: 25px;
  border-bottom: 1px gray solid;
  width: 100%;
  font-size: 12px;
}
</style>
