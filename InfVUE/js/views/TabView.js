import View from "./View.js";
const tag = '[TabView]'
const TabView = Object.create(View)

TabView.setup = function (el) {
    this.init(el)
    this.bindClick()
    return this
}

TabView.bindClick = function() {
    Array.from(this.el.querySelectorAll('li')).forEach(li =>{
        li.addEventListener('click', e=> this.onClick(li.innerHTML))

    })
}


TabView.setActiveTab = function (tabName) {
    Array.from(this.el.querySelectorAll('li')).forEach(li =>{ // querySelector 말고 querySelectorAll 을 써야 해당 요소 전부를 바꿔줄 수 있음. li 태그가 2개니까!
        li.className = li.innerHTML === tabName? 'active' : ''
    })
}

TabView.onClick = function(tabName) {
    this.setActiveTab(tabName)
    this.emit('@change', {tabName})
}

export default TabView