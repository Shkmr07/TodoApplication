let tbody = document.getElementById('data')
let filterbyPrior = document.getElementById('filterbyPrior')
let filterbyStatus = document.getElementById('filterbyStatus')

function fetchUsers(){

    try{
        let getItem = JSON.parse(localStorage.getItem('archive'))
        renderTable(getItem)
    }
    catch(error){console.log('fetch failed',error)}
        

   
}
    

function renderTable(items){
    tbody.innerHTML = ''
    items.forEach((el,idx)=>{
        tbody.appendChild(createTable(el,idx))
        console.log(el)
    })

}



function ce(val){
    return document.createElement(val)
}

function createTable({name,priority,status},idx){
    let des,prior,state,restore,del,delBtn,tr;
    
    des = ce('td')
    prior = ce('td')
    state = ce('td')
    restore = ce('td')
    del = ce('td')
    delBtn = ce('button')
    resBtn = ce('button')
    tr = ce('tr')
    

    
    des.textContent = name
    prior.textContent = priority
    state.textContent = status?'Completed✅':'Pending🔃'
    resBtn.textContent = 'Restore'
    delBtn.textContent = 'Delete'
    delBtn.style.cssText = 'color : white; background-color: red'
    prior.style.backgroundColor = priority==='High'?'red':priority==='Medium'?'yellow':'white'

    restore.appendChild(resBtn)
    del.appendChild(delBtn)

    tr.append(des,prior,state,restore,del)

    resBtn.addEventListener('click',()=>{
        
        let todos = JSON.parse(localStorage.getItem('todo')) || []

        let archives = JSON.parse(localStorage.getItem('archive')) || []

        if (idx >= 0 && idx < archives.length){
            todos.push(archives[idx])
            archives.splice(idx,1)
        }

        localStorage.setItem('todo',JSON.stringify(todos))
        localStorage.setItem('archive',JSON.stringify(archives))
        
        tr.remove()
    })


    delBtn.addEventListener('click',()=>{

        let archives = JSON.parse(localStorage.getItem('archive')) || []

        if (idx >= 0 && idx < archives.length) archives.splice(idx,1)
        
        localStorage.setItem('archive',JSON.stringify(archives))

        tr.remove()
    })

    return tr

}


filterbyPrior.addEventListener('change',()=>{

    let val = filterbyPrior.value
    
    let archives = JSON.parse(localStorage.getItem('archive')) || []

    let filterRes = val==='all'?archives:archives.filter(item=>item.priority === val)

    renderTable(filterRes)
})



filterbyStatus.addEventListener('change',()=>{

    let val = filterbyStatus.value
    val = val==='false'?false:true
    
    
    let archives = JSON.parse(localStorage.getItem('archive')) || []

    let filterRes = val==='all'?archives:archives.filter(item=>item.status === val)

    renderTable(filterRes)
})  
    





fetchUsers()
    

