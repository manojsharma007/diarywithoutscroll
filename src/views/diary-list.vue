<template>
  <div>
    <div class="main-wrapper diarylist">
      <section class="blog-list px-3 py-5 p-md-5">
        <div style="margin: 6px 0 15px 108px;">
          <b-button variant="info" style="width: 130px" @click="addjournal"
            >Add journal</b-button
          >
        </div>
        <div class="allentries">
          <ul>
            <li class="allentriesul">
              {{ totalRecords }}
              <!-- {{recordsJournalsData.data['totalsrecords']}} -->
              <br />Entries
            </li>
            <li class="allentriesul">
              {{ currentMonthRecords }}
              <!-- {{recordsJournalsData.data['monthly']}} -->
              <br />Month
            </li>
            <li class="allentriesul">
              {{ currentWeekRecords }}
              <!-- {{recordsJournalsData.data['weekly']}} -->
              <br />Week
            </li>
          </ul>
        </div>
        <div class="container" v-for="item in items" :key="item.id">
          <div class="row">
            <div class="col-12">
              <div class="intro" v-html="formatText(item.text)"></div>
              <a class="more-link" @click="viewjournal(item.id)">
                <div class="intro" v-html="formatText(item.textitem)"></div>
              </a>
              <div class="time">
                <span class="date">
                  <b-icon icon="clock-history"></b-icon>
                  {{ item.submitdate }} ,  {{ item.location }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showLoder: true,
      totalRecords: "",
      currentMonth: "",
      currentMonthRecords: "",
      currentWeekRecords: "",
      limitStartPageNo: 0,
      limitEndPageNo: 20,
      items: [],
    };
  },
  components: {},
  created() {
   
  },
  mounted() {
    this.getTask();
    const submitDate = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
    });
    const [{ value: month }, , { value: year }] = dateTimeFormat.formatToParts(
      submitDate
    );
    this.currentMonth = `${month} , ${year}`;
  },
  computed: {
    // GET THE ALL TABLES DATA FROM GETTER
    ...mapGetters({
      JournalsData: "filters/getJournalsData",
      recordsJournalsData: "filters/getRecordsJournals",
    }),
  },
  methods: {
    ...mapActions({
      commitJournals: "filters/getJournals",
      getAllJournals: "filters/getAllJournals",
      getJournalsScroll: "filters/getJournalsScroll",
      commitUpdateJournals: "filters/commitUpdateJournal",
    }),
    addjournal() {
      this.commitUpdateJournals([]);
      this.$router.push({ name: "addjournal" });
    },
    formatText(text) {
      if (text) {
        return text.substr(0, 110);
      }
    },
    async getTask() {
      if (Object.keys(this.JournalsData).length === 0) {
    
        await this.getAllJournals();
       
      }
       //console.log(this.JournalsData);
        this.items = this.JournalsData.data.data;
        this.totalRecords = this.JournalsData.data.count;
        this.currentMonthRecords = this.JournalsData.data.monthly;
        this.currentWeekRecords = this.JournalsData.data.week;
    },
    viewjournal(id) {
      this.$router.push({ name: "viewjournal", params: { id: id } });
    },
  },
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
  border-bottom: 1px grey solid;
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
.allentries ul {
  display: flex;
  list-style: none;
  padding: 8px 0 10px 21px;
}
.allentriesul {
  padding-right: 20px;
}
.allentries {
  background: lightsteelblue;
}
.visiblescroll {
  height: 300px;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: #ebebeb;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #6d6d6d;
}
</style>
