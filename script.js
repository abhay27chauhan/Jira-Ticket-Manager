let filterOptions = document.querySelectorAll(".filter-colors__container")
let mainContainer = document.querySelector(".main-container")

let addBtn = document.querySelector(".add");
let removeBtn = document.querySelector(".remove");

let lockBtn = document.querySelector(".lock");
let unlockBtn = document.querySelector(".unlock");

let modalContainer = document.querySelector(".modal-container");
let modalFilterOptions = document.querySelectorAll(".modal-filters")
let descBox = document.querySelector(".desc-box");

let flag = false;
let colors = ["lightpink", "lightblue", "lightgreen", "black"]
let cColor = colors[colors.length-1];
let deleteState = false;
let lock = false;
let allTasks = [];

if(localStorage.getItem("allTasks")){
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
    allTasks.forEach(obj => {
        let {id, color, task} = obj
        createTicket(task, color, id);
    })
}

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
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
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
    if(e.key == "Enter" && descBox.value.trim() !== ""){
        let task = descBox.value;
        
        createTicket(task, cColor);

        modalFilterOptions.forEach(option => {
            option.classList.remove("border");
        })
        modalFilterOptions[3].classList.add("border");

        descBox.value = ""
        modalContainer.style.display = "none";
        flag = false;
        cColor = "black";
        addBtn.classList.remove("active");
    }
})

removeBtn.addEventListener("click", function(){
    deleteState = !deleteState;

    if(deleteState == false){
        removeBtn.classList.remove("active");
    }else{
        removeBtn.classList.add("active");
    }
    
})

lockBtn.addEventListener("click", function(){
    if(lock == false){
        lock = true;
        lockBtn.classList.add("active");
        unlockBtn.classList.remove("active");
    }
})

unlockBtn.addEventListener("click", function(){
    if(lock == true){
        lock = false;
        lockBtn.classList.remove("active");
        unlockBtn.classList.add("active");
    }
})

function handleStripeColor(colorStripeEle){
    colorStripeEle.addEventListener("click", function(){
        let classes = colorStripeEle.classList;

        let curColor = classes[1];
        let index = colors.indexOf(curColor);
        let newidx = (index + 1)%colors.length;
        let newColor = colors[newidx];
        if(lock == false){
            colorStripeEle.classList.remove(curColor);
            colorStripeEle.classList.add(newColor);

            let ticketSubcontainerElem = colorStripeEle.parentNode.children[1];
            // unique id element
            let idElem = ticketSubcontainerElem.children[0];
            let id = idElem.innerHTML.slice(1);

            for(let i=0; i<allTasks.length; i++){
                if(id == allTasks[i].id){
                    allTasks[i].color = newColor;
                }
            }

            localStorage.setItem("allTasks", JSON.stringify(allTasks));
        }
    })
}

function handleDelete(ticketContainer){
    ticketContainer.addEventListener("click", function(){
        if(deleteState == true){
            let idElem = ticketContainer.querySelector(".ticket-id")
            let id = idElem.innerHTML.slice(1);
            allTasks = allTasks.filter(obj => {
                return obj.id !== id;
            })
            localStorage.setItem("allTasks", JSON.stringify(allTasks));
            ticketContainer.remove();
        }
    })
}

function handleContentEditable(contentEle){
    contentEle.addEventListener("click", function(){
        if(lock == false){
            contentEle.setAttribute("contenteditable", "true");
        }else{
            contentEle.setAttribute("contenteditable", "false");
        }
    })
}

function createTicket(task, color, myid){
    let id = myid || uid();

    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket-container");

    ticketContainer.innerHTML = `<div class="ticket-color ${color}"></div>
        <div class="ticket_sub-container">
            <h3 class="ticket-id">#${id}</h3>
            <p class="ticket-desc">${task}</p>
        </div>`
    
    if(!myid){
        allTasks.push({
            id,
            color,
            task
        })
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
    }

    mainContainer.appendChild(ticketContainer);

    let colorStripeEle = ticketContainer.querySelector(".ticket-color")
    let contentEle = ticketContainer.querySelector(".ticket_sub-container")
    
    handleStripeColor(colorStripeEle);
    handleDelete(ticketContainer);
    handleContentEditable(contentEle);
}