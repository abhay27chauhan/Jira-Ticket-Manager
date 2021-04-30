let filterOptions = document.querySelectorAll(".filter-colors__container")
let mainContainer = document.querySelector(".main-container")
let addBtn = document.querySelector(".add");
let modalContainer = document.querySelector(".modal-container");
let modalFilterOptions = document.querySelectorAll(".modal-filters")
let descBox = document.querySelector(".desc-box");

let flag = false;
let cColor = "black";

for(let i=0; i<filterOptions.length; i++){
    filterOptions[i].addEventListener("click", function(){
        filterOptions.forEach(option => {
            option.children[0].classList.remove("border");
        })

        let arr = filterOptions[i].children;

        arr[0].classList.add("border");

        let chclassesArr = arr[0].classList;

        mainContainer.style.backgroundColor = chclassesArr[0];

    })
}

addBtn.addEventListener("click", function(){
    if(flag === false){
        modalContainer.style.display = "flex";
    }else{
        modalContainer.style.display = "none";
    }

    flag = !flag;
})

for(let i=0; i<modalFilterOptions.length; i++){
    modalFilterOptions[i].addEventListener("click", function(){
        modalFilterOptions.forEach(option => {
            option.classList.remove("border");
        })

        modalFilterOptions[i].classList.add("border");

        cColor = modalFilterOptions[i].classList[1];
    })
}

descBox.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        let ticketContainer = document.createElement("div");
        ticketContainer.setAttribute("class", "ticket-container");

        ticketContainer.innerHTML = `<div class="ticket-color ${cColor}"></div>
            <div class="ticket_sub-container">
                <h3 class="ticket-id">#sampleId</h3>
                <p class="ticket-desc">${descBox.value}</p>
            </div>`
        
        mainContainer.appendChild(ticketContainer);

        modalFilterOptions.forEach(option => {
            option.classList.remove("border");
        })
        modalFilterOptions[3].classList.add("border");

        descBox.value = ""
        modalContainer.style.display = "none";
        flag = false;
        cColor = "black";
    }
})