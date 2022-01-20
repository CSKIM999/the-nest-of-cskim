import View from './View.js'

const tag = '[FormView]'

const FormView = Object.create(View)

FormView.setup = function(el) {
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.showResetBtn(false)
    this.bindEvents()
    return this
}

FormView.showResetBtn = function ( show = true ) {
    this.resetEl.style.display = show ? 'block' : 'none'
}


FormView.bindEvents = function () {
    this.on('submit', e=> e.preventDefault())
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e)) // inputEl 요소가 html 요소이므로 addEventListener 사용 가능
    this.resetEl.addEventListener('click', e=> this.onClickReset())
}

FormView.onKeyup = function(e) { //키 입력부
    const enter = 13
    this.showResetBtn(this.inputEl.value.length)
    if (!this.inputEl.value.length) this.emit('@reset')
    if (e.keyCode !== enter) return
    this.emit('@submit', {input : this.inputEl.value})
}

FormView.onClickReset = function() {
    this.emit('@reset')    //실제로 삭제할 필요 없고 C 에 reset 이라는 이벤트를 전달하기만 하면 됨. emit 이 그 event 를 전달해주는 메서드
    this.showResetBtn(false) // 리셋버튼을 클릭했으니 리셋버튼 false 로 만들어서 안보이게하기
    
}




export default FormView