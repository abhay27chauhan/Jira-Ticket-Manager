'use strict';

let lockBtn = document.querySelector(".lock-container");

lockBtn.addEventListener("click", function(){
    let ticketContentElems = document.querySelectorAll(".ticket-desc");
    if(lock == true){
        lockBtn.children[0].classList.remove("fa-lock");
        lockBtn.children[0].classList.add("fa-lock-open");

        ticketContentElems.forEach(ticketContentElem => {
            ticketContentElem.setAttribute("contenteditable", "true");
        })
    }else{
        lockBtn.children[0].classList.remove("fa-lock-open");
        lockBtn.children[0].classList.add("fa-lock");

        ticketContentElems.forEach(ticketContentElem => {
            ticketContentElem.setAttribute("contenteditable", "false");
        })
    }

    lock = !lock;
})