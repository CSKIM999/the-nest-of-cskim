import FormView from "../views/FormView.js"
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'


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

        ResultView.setup(document.querySelector('#search-result'))

        this.selectedTab = '추천 검색어'
        this.renderView()
    },

    renderView() {
        console.log(tag,'renderView()')
        TabView.setActiveTab(this.selectedTab)

        if (this.selectedTab === '추천 검색어'){
            this.fetchSearchKeyword()
            // KeywordModel.list().then(data => {
            //     KeywordView.render(data)
            // })
        } else{
            
        }

        ResultView.hide()
    },

    fetchSearchKeyword() {
        KeywordModel.list().then(data => {
            KeywordView.render(data)
        })
    },

    search(query) {
        console.log(tag,'search()', query)
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
        ResultView.hide() // ResultView에 새로운 함수를 만들수도 있지만 바로 View 의 hide() 를 사용해서 감출수도 있었음
    },

    onSearchResult(data) {
        TabView.hide()
        KeywordView.hide()
        ResultView.render(data)
    },

    onChangeTab(tabName) {
        console.log(tag,'onChangeTab')
    },

    onClickKeyword(keyword) {
        this.search(keyword)

    }

    
}
