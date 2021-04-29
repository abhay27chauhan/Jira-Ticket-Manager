let filterOptions = document.querySelectorAll(".filter-colors__container")
let mainContainer = document.querySelector(".main-container")

for(let i=0; i<filterOptions.length; i++){
    filterOptions[i].addEventListener("click", function(){
        let arr = filterOptions[i].children;

        let chclassesArr = arr[0].classList;

        mainContainer.style.backgroundColor = chclassesArr[0];

    })
}