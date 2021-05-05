'use strict';

for(let i=0; i<filterOptions.length; i++){
    filterOptions[i].addEventListener("click", function(){
        let filterColorElem = filterOptions[i].children[0];
        let toFilterColor = filterColorElem.classList[0];

        // current UI -> remove;
        let ticketsArr = document.querySelectorAll(".ticket-container");
        let length = ticketsArr.length;
        for(let i=0; i<length; i++){
            ticketsArr[i].remove();
        }

        let reqArr;
        if(pFilterColor != null && pFilterColor == toFilterColor){
            // show all
            reqArr = allTasks

            filterOptions.forEach(option => {
                option.children[0].classList.remove("border");
            })
            mainContainer.style.backgroundColor = "rgb(238, 238, 238)";

            pFilterColor = null
        }else{
            // show filtered
            reqArr = allTasks.filter(obj => {
                return obj.color == toFilterColor;
            })

            filterOptions.forEach(option => {
                option.children[0].classList.remove("border");
            })

            filterColorElem.classList.add("border");

            mainContainer.style.backgroundColor = toFilterColor;

            pFilterColor = toFilterColor;
        }

        reqArr.forEach(obj => {
            let {id, color, task} = obj;
            createTicket(task, color, id);
        })
    })
}