<template>
  <div>
    <header>
			<h2 class="container">검색</h2>
		</header>
    <div class="container">
      <search-form v-bind:value='query' v-on:@submit='onSubmit' v-on:@reset='onReset'></search-form>
    </div>
  </div>
</template>

<script>
import FormComponent from './component/FormComponent.vue'

export default {
  name: 'app',
  data () {
    return {
      query : '', 
      submitted:false,
      tabs:['추천 검색어','최근 검색어'],
      selectedTab:'',
      searchResult:[],
      history: [],
      keywords:[]
    }
  },
  component : {
    'search-form' : FormComponent
  },
  methods : {
    onSubmit(query) {
          this.query = query
          this.search()
        },
        
        onReset(e) {
          this.resetForm()
        },
          
    search() {
      SearchModel.list().then(data =>{
        this.submitted = true
        this.searchResult = data
      })
      HistoryModel.add(this.query)
      this.fetchHistory()
    },

    resetForm() {
      this.query = ''
      this.submitted = false
      this.searchResult = []
    },

    onClickTab(tab){
      this.selectedTab = tab

    },

    fetchKeyword() {
      KeywordModel.list().then(data =>{
        this.keywords = data
      })
    },

    fetchHistory() {
      HistoryModel.list().then(data =>{
        this.history = data
      })
    },

    onClickKeyword(keyword){
      this.query = keyword
      this.search()
    },

    onClickRemoveHistory(keyword) {
      HistoryModel.remove(keyword)
      this.fetchHistory()
    }
  }

}
</script>