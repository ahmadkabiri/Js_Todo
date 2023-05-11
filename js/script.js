
// const $ = document ;

// const imgElem = [...$.querySelectorAll("img")] ;

// const dropDiv = $.querySelector(".drop") ;
// console.log(dropDiv)
// // console.log(imgElem)


// imgElem.forEach(el=>{
//     el.addEventListener("dragstart",(event)=>{
//         event.dataTransfer.setData("elemId",event.target.id)

//     })

// })



// dropDiv.addEventListener("drop",(event)=>{
//     // console.log("droped")
//     let tergetId = event.dataTransfer.getData('elemId') ;
//     let targetElem = document.getElementById(tergetId)
//     // console.log(targetElem)
//     event.target.append(targetElem)
// })

// dropDiv.addEventListener("dragover",(event)=>{
//     event.preventDefault()
// })



const $ = document ;

let toDoBtn = $.querySelector(".todo-btn");

let modal = $.querySelector(".modal-container");

let closeModalBtn = $.querySelector(".close-modal")

let inputElem = $.getElementById("input");

let toDosDiv = $.querySelector(".todos")

let btnContainer = $.querySelector(".btn-container")

let todoList = [...$.querySelectorAll(".todo-list")].splice(1,3)
console.log(todoList)

function showModal () {
    modal.classList.add("move")
    modal.classList.remove("unmove")

}

function closeModal () {
    modal.classList.add("unmove");
    modal.classList.remove("move")

}

let i = 1 ;

function makeTodo (event) {
    // console.log(event.type)
    if(event.keyCode===13 || event.type === "click" ){
        if(inputElem.value!==''){
            let inputValue = inputElem.value ;
            let todoDiv = $.createElement('div') ;
            todoDiv.classList.add("todo") ;
            todoDiv.setAttribute("draggable","true");
            todoDiv.setAttribute("id",`${i}`)
            todoDiv.addEventListener("dragstart",dragstartHandler)
            todoDiv.innerHTML = `<div class="todo-content">${inputValue}</div>`;
            let trashIconDiv = $.createElement("div")
            trashIconDiv.classList +="trash-icon"
            let iIcon = $.createElement("i") ;
            iIcon.classList += ("fa fa-times") ;
            iIcon.addEventListener("click",deleteTodo)
            trashIconDiv.append(iIcon);
            todoDiv.append(trashIconDiv)
            toDosDiv.append(todoDiv) ;
            inputElem.value = '' ;
            i++ ;
            // console.log(todoDiv.id)
        }
    }
}

function deleteTodo (event) {
    event.target.parentElement.parentElement.remove()
}



function dragstartHandler (event) {
    event.dataTransfer.setData("elemId",event.target.id)
}


function dragoverHandler (event) {
    event.preventDefault()
}

function dropHandler (event) {
    let id = event.dataTransfer.getData("elemId",event.target.id);
    let targetElem = $.getElementById(id) ;
    event.target.append(targetElem)
}



toDoBtn.addEventListener("click",showModal)

closeModalBtn.addEventListener("click",closeModal)

inputElem.addEventListener("keydown",makeTodo)

btnContainer.addEventListener("click",makeTodo)

todoList.forEach(el=>{
    el.addEventListener("dragover",dragoverHandler)
})

todoList.forEach(el=>{
    el.addEventListener("drop",dropHandler)
})









