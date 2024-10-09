let tbody = document.getElementById('data')

document.getElementById('btn').addEventListener('click',(e)=>{
    e.preventDefault()
    let inp = document.getElementById('inp')
    let opt = document.getElementById('opt')

    if(!inp.value) alert('Todo Cannot Be Empty!')

    else{
        
        let task = {name:inp.value,priority:opt.value,status:false}
    
        let todos = JSON.parse(localStorage.getItem('todo')) || []
        todos.push(task)
    
        localStorage.setItem('todo',JSON.stringify(todos))
        
        inp.value = ''
        tbody.innerHTML = ''
        fetchUsers()
    }

    
})



function fetchUsers(){

    try{
        let getItem = JSON.parse(localStorage.getItem('todo'))
        getItem.forEach((el,idx)=>{
            tbody.appendChild(createTable(el,idx))
            console.log(el)
        })
    }
    catch(error){console.log('fetch failed',error)}
        

   
}
    

fetchUsers()


function ce(val){
    return document.createElement(val)
}

function createTable({name,priority,status},idx){
    let des,prior,state,del,stateBtn,delBtn,tr;
    
    des = ce('td')
    prior = ce('td')
    state = ce('td')
    del = ce('td')
    stateBtn = ce('button')
    delBtn = ce('button')
    tr = ce('tr')

    
    des.textContent = name
    prior.textContent = priority
    stateBtn.textContent = status?'Completed✅':'Pending🔃'
    delBtn.textContent = 'Archive'
    delBtn.style.cssText = 'color : white; background-color: red'
    prior.style.backgroundColor = priority==='High'?'red':priority==='Medium'?'yellow':'white'

    state.appendChild(stateBtn)
    del.appendChild(delBtn)

    tr.append(des,prior,state,del)

    stateBtn.addEventListener('click',()=>{
        
        let todos = JSON.parse(localStorage.getItem('todo')) || []

        if(todos[idx]){
            todos[idx].status = !todos[idx].status
            status = todos[idx].status
        }

        localStorage.setItem('todo',JSON.stringify(todos))
        stateBtn.textContent = status?'Completed✅':'Pending🔃'
    })


    delBtn.addEventListener('click',()=>{

        let archive = JSON.parse(localStorage.getItem('archive')) || []

        let todos = JSON.parse(localStorage.getItem('todo')) || []

        if (idx >= 0 && idx < todos.length){
            archive.push(todos[idx])
            todos.splice(idx,1)
        }

        localStorage.setItem('todo',JSON.stringify(todos))
        localStorage.setItem('archive',JSON.stringify(archive))

        tr.remove()
    })






    return tr
    
}





