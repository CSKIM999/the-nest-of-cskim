import View from "./View.js";

const tag = '[ResultView]'

const ResultView = Object.create(View)

ResultView.messages = {
    NO_RESEULT : '검색 결과가 없습니다!'
}

ResultView.setup =  function(el) {
    this.init(el) // el를 받아서 내부속성 this 로 el 을 가지고있는다
}

ResultView.render = function(data = []) {
    console.log(tag,'render()', data)
    this.el.innerHTML = data.length ? this.getSearchResultsHtml(data) : this.messages.NO_RESEULT
    this.show()
}


// ResultView.renderReset = function(data = []) {
//     console.log(tag,'renderReset()',data)
//     this.hide()
// } 굳이 이렇게 말고 바로 hide 도 가능



ResultView.getSearchResultsHtml = function(data) { // line 17 에서 data.length 가 존재하므로 이곳으로 오게 됨
    return data.reduce((html, item) => {
        html += this.getSearchItemHtml(item)
        return html
    }, '<ul>') + '</ul>'
}

ResultView.getSearchItemHtml = function(item) {
    return `<li>
    <img src="${item.image}">
    <p>${item.name}</p>
    </li>`
}


export default ResultView