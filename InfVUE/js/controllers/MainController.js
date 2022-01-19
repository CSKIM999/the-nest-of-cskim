import FormView from "../views/FormView.js"
import ResultView from '../views/ResultView.js'
import SearchModel from '../models/SearchModel.js'


const tag = '[MainController]'

export default{
    init() {
        console.log(tag, 'init()')
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input)) // << 체이닝으로 바로 .on 을 사용하기 위해선, setup 에서 this 를 return 해주어야함!!
            .on('@reset', e=> this.onResetForm())
        
        ResultView.setup(document.querySelector('#search-result'))
    },

    search(query) {
        console.log(tag,'search()', query)

        // search api 를 백엔드로 호출
        SearchModel.list(query).then(data => {  //list 는 promise 를 반환하므로
            this.onSearchResult(data)
        })

        this.onSearchResult([])
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input)
        this.search(input)
    },

    onResetForm() {
        console.log(tag,'onResetForm()')

    },

    onSearchResult(data) {
        ResultView.render(data)
    }
    //X 버튼 혹은 검색어를 삭제하면 검색결과를 삭제한다
    // MVC 모듈이므로 Model,View,Controller [ FormView , ResultView, MainController]
    // 에서 FormView 가 이벤트(@reset)를 발생시키고 MainController 에게 위임시키기
    
}
