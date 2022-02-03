import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './component/FormComponent.js'
import ResultComponent from './component/ResultComponent.js'
import ListComponent from './component/ListComponent.js'
import TabComponent from './component/TabComponent.js'


new Vue({ // vue 인스턴스가 html의 어느부분에 마운팅 될것인지 설정하는 설정부

  el:'#app',

  data : {
    query : '', // 입력 데이터를 받아서 저장하는 곳
    submitted:false,
    tabs:['추천 검색어','최근 검색어'],
    selectedTab:'',
    searchResult:[],
    history: [],
    keywords:[]

  },
  
  components : {
    'search-form' : FormComponent,
    'search-result' : ResultComponent,
    'list':ListComponent,
    'tabs' :TabComponent
  },

  created() { // Vue 인스턴스가 생성될 때 호출되는 함수
    this.selectedTab = this.tabs[0]
    this.fetchKeyword()
    this.fetchHistory()
  },

  methods:{
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
      this.query = '' // 여기서의 this 는 Vue.data 의 query 가 선택되게 됨.
      // todo ... 검색결과를 숨기는 로직
      this.submitted = false
      this.searchResult = []
    },

    onClickTab(tab){
      this.selectedTab = tab

    },

    fetchKeyword() {
      KeywordModel.list().then(data =>{
        this.keywords = data
      }) // keywordmodel 로 부터 키워드를 가져오는 역할
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
      this.fetchHistory() // 이것만 작성하면 검색기록이 삭제된 후 바로 다른게 진행되버림
      // 그것이 바로 버블링 현상 때문. 위에서 말한 preventDefault 가 필요한 상황
      // history reset 버튼으로 이동해서 v-on:click 에 .stop 을 넣어주면 버블링을 막아줄수있음

    }

    
    
  }
})