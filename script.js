let filterOptions = document.querySelectorAll(".filter-colors__container")
let mainContainer = document.querySelector(".main-container")
let addBtn = document.querySelector(".add");
let modalContainer = document.querySelector(".modal-container");
let flag = false;

for(let i=0; i<filterOptions.length; i++){
    filterOptions[i].addEventListener("click", function(){
        let arr = filterOptions[i].children;

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