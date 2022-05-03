import FormView from "../views/FormView.js"
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'


const tag = '[MainController]'

export default{
    init() {
        console.log(tag, 'init()')
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input)) // << 체이닝으로 바로 .on 을 사용하기 위해선, setup 에서 this 를 return 해주어야함!!
            .on('@reset', e=> this.onResetForm())
        
        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName))

        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword))
        
        HistoryView.setup(document.querySelector('#search-history'))
            .on('@click', e => this.onClickHistory(e.detail.keyword))
            .on('@remove', e => this.onRemoveHistory(e.detail.keyword))

        ResultView.setup(document.querySelector('#search-result'))

        this.selectedTab = '추천 검색어'
        this.renderView()
    },

    renderView() {
        console.log(tag,'renderView()',this.selectedTab)
        TabView.setActiveTab(this.selectedTab)

        if (this.selectedTab === '추천 검색어'){
            this.fetchSearchKeyword()
            // KeywordModel.list().then(data => {
            //     KeywordView.render(data)
            // })
        } else{
            this.fetchSearchHistory()
            
        }
        ResultView.hide()
    },

    fetchSearchKeyword() {
        KeywordModel.list().then(data => {
            HistoryView.hide()
            KeywordView.show()
            KeywordView.render(data)
        })
    },

    fetchSearchHistory() {
        HistoryModel.list().then(data => {
            KeywordView.hide()
            HistoryView.show()
            HistoryView.render(data).bindRemoveBtn() // render 함수가 호출되어야 HV.render(data) 의 데이터를 기반으로
            // DOM 이 생성될것. 그리고 나서 bind 해주어야함. 이것은 KeywordView 에서도 비슷한 상황이 있었음.
            // 여기서의 render 함수는 keywordview 의 render 함수를 복사해온것과 마찬가지
        })
    },
    
    search(query) {
        console.log(tag,'search()', query)
        this.onAddHistory(query)
        FormView.setValue(query)

        // search api 를 백엔드로 호출
        SearchModel.list(query).then(data => {  //list 는 promise 를 반환하므로
            this.onSearchResult(data)
        })
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input)
        this.search(input)
    },
    
    onResetForm(data) {
        console.log(tag,'onResetForm()')
        this.renderView()
        // ResultView.hide() // ResultView에 새로운 함수를 만들수도 있지만 바로 View 의 hide() 를 사용해서 감출수도 있었음
    },

    onSearchResult(data) {
        TabView.hide()
        KeywordView.hide()
        HistoryView.hide()
        ResultView.render(data)
    },

    onChangeTab(tabName) {
        console.log(tag,'onChangeTab',tabName)
        this.selectedTab = tabName
        this.renderView()
    },

    onClickKeyword(keyword) {
        this.search(keyword)

    },
    
    onClickHistory(keyword) {
        this.search(keyword)

    },

    onRemoveHistory(keyword){
        HistoryModel.remove(keyword)
        this.renderView()
    },

    onAddHistory(keyword){
        HistoryModel.add(keyword)
    }
    
}
