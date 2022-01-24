import KeywordView from "./KeywordView.js"

const tag = '[HistoryView]'

const HistoryView = Object.create(KeywordView)

// HistoryView.message.NO_KEYWORDS = '검색 이력이 없습니다'


HistoryView.getKeywordsHtml = function(data) {
    return data.reduce((html,item) =>{
        html += `<li data-keyword ="${item.keyword}">
        ${item.keyword}
        <span class = "date">${item.date}</span>
        <button class = "btn-remove"></button>
        </li>`
        return html
    }, '<ul class = "list">') + '</ul>'
}

HistoryView.bindRemoveBtn = function() {
    Array.from(this.el.querySelectorAll('button.btn-remove')).forEach(btn =>{
        btn.addEventListener('click', e=>{
            e.stopPropagation()
            this.onRemove(btn.parentElement.dataset.keyword) //btn-El 에 필요 요소가 있는것이 아니라 그 부모요소 li-El 에 필요한 요소가 있으므로
            // parentElement 를 통해 부모요소로 타고 올라가서 가져오기!
        })
    })
}

HistoryView.onRemove = function(keyword) { // **** 중요한것은 bindRemoveBtn을 언제 호출할것이냐 임!
    this.emit('@remove',{keyword})          // 모든것을 render 해주는 renderView 에서 fetchSearchHistory 로 가볼것!
}


export default HistoryView