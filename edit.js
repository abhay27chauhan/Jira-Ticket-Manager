'use strict';

let lockBtn = document.querySelector(".lock-container");

lockBtn.addEventListener("click", function(){
    let ticketContentElems = document.querySelectorAll(".ticket-desc");
    lock = !lock;

    if(lock == true){
        lockBtn.children[0].classList.remove("fa-lock-open");
        lockBtn.children[0].classList.add("fa-lock");

        ticketContentElems.forEach(ticketContentElem => {
            ticketContentElem.setAttribute("contenteditable", "false");
        })
    }else{
        lockBtn.children[0].classList.remove("fa-lock");
        lockBtn.children[0].classList.add("fa-lock-open");

        ticketContentElems.forEach(ticketContentElem => {
            ticketContentElem.setAttribute("contenteditable", "true");
        })

        ticketContentElems.forEach(ticketContentElem => {
            ticketContentElem.addEventListener("blur", function(){
                let content = ticketContentElem.innerText;
                let idContainer = ticketContentElem.previousElementSibling;
                let id = idContainer.innerText.slice(1);

                if(content.trim() === ''){
                    let newTaskArr = allTasks.filter(obj => obj.id !== id)
                    localStorage.setItem("allTasks", JSON.stringify(newTaskArr));
                    return;
                }

                for(let i=0; i<allTasks.length; i++){
                    if(allTasks[i].id === id){
                        allTasks[i].task = content;
                    }
                }

                localStorage.setItem("allTasks", JSON.stringify(allTasks));
            })
        })
    }
})