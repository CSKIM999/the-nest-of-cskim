import View from "./View.js";

const tag = '[KeywordView]'

const KeywordView = Object.create(View)


KeywordView.messages = {
    NO_KEYWORDS: '추천 검색어가 없습니다'
}

KeywordView.setup = function (el) {
    this.init(el)
    return this 
    // 여기 bindClickEvent 를 사용하지 않는 이유 : DOM 이 생성되고 나서 bind 를 해주어야한다고 함.
}

KeywordView.render = function (data = []) {
    this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : this.messages.NO_KEYWORDS
    this.bindClickEvent()
    this.show()
    return this
}

KeywordView.getKeywordsHtml = function(data) {
    return data.reduce((html, item, index) => {
        html += `<li data-keyword="${item.keyword}"><span class = "number">${index + 1}</span>${item.keyword}</li>`
        return html
    }, '<ul class = "list">') + '</ul>'
}

KeywordView.bindClickEvent = function() {
    Array.from(this.el.querySelectorAll('li')).forEach(li => { // 현재 받아온 el 은 배열이 아닌 유사배열. 따라서 from 을 사용했다고 함.
        li.addEventListener('click' , e => this.onClickKeyword(e))
    })
}

KeywordView.onClickKeyword = function(e) {
    const {keyword} = e.currentTarget.dataset
    this.emit('@click',{keyword})
}



export default KeywordView