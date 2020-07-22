<template>
  <div class="addjournal">
    <vue-editor v-model="content"></vue-editor>
    <div class="submitbuttonaddview">
      <b-row class="text-center">
        <b-col>
          <b-button
            :disabled="disable"
            variant="primary"
            style="margin-left: -21px ;width: 80px"
            @click="saveUpdateJournal"
          >{{SaveUpdateText}}</b-button>
        </b-col>

        <b-col>
          <b-button variant="info" style="width: 110px" @click="goToDiarylist">Go to Diary</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import { mapActions, mapGetters } from "vuex";
//import {EventBus} from "../main";
export default {
  data() {
    return {
      content: "",
      updateButton: true,
      SaveUpdateText: "Save",
      disable: false
    };
  },
  computed: {
    // GET THE ALL TABLES DATA FROM GETTER
    ...mapGetters({
      getUpdateJournalsData: "filters/getUpdateJournalsData"
    })
  },
  components: {
    VueEditor
  },
  created() {
    if (this.getUpdateJournalsData.length == 0) {
      this.updateButton = true;
      this.SaveUpdateText = "Save";
    } else {
      this.content = this.getUpdateJournalsData.textitem;
      this.SaveUpdateText = "Update";
      this.updateButton = false;
    }
  },
  methods: {
    ...mapActions({
      addJournals: "filters/addJournals",
      updateJournals: "filters/updateJournals"
    }),
    async saveUpdateJournal() {
      const submitDate = new Date();
      const dateTimeFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      });
      const [
        { value: month },
        ,
        { value: day },
        ,
        { value: year }
      ] = dateTimeFormat.formatToParts(submitDate);
      const timeAdded = this.dateFormat() + " ," + `${month} ${day}, ${year}`;
      let parms = {
        content: this.content,
        time: timeAdded
      };
      if (
        this.content == null ||
        this.content == undefined ||
        this.content.length == 0
      ) {
        alert("Please enter the text ");
      } else {
        this.disable = true;
        if (this.updateButton == true) {
          await this.addJournals(parms);
        } else {
          this.getUpdateJournalsData.content = this.content;
          await this.updateJournals(this.getUpdateJournalsData);
        }
        this.$router.push({ name: "diarylist" });
      }
    },
    goToDiarylist() {
      this.$router.push({ name: "diarylist" });
    },
    dateFormat() {
      const date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }
  }
};
</script>

<style>
.title {
  text-align: center;
  margin: 15px;
  color: blue;
}
.submitbuttonaddview {
  margin: 18px 173px 1px 090px;
}
</style>
