function fetchUsers(items){

    for(let idx = 0; idx < items.length; idx++){
        let item = localStorage.key(idx)
        let getItem = JSON.parse(localStorage.getItem(item))
        let tbody = document.getElementById('data')
        let result = createTd(getItem)
        tbody.appendChild(result)
    }
}

fetchUsers(localStorage)


function createEL(val){
    return document.createElement(val)
}


function createTd({name,prior,st,dl}){
    let nm = createEL('td')
    let pr = createEL('td')
    let status = createEL('td')
    let deleted = createEL('td')
    let tr = createEL('tr')
    pr.style.backgroundColor = (prior==='High')?'red':(prior==='Medium')?'yellow':'white'
    nm.textContent = name
    pr.textContent = prior
    status.textContent =  st?'Completed✅':'Pending🔃'
    deleted.textContent = 'Archive'
    
    tr.append(nm,pr,status,deleted)
    return tr
    
}
