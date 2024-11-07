let InputValue = document.querySelector("input");
let Lists = document.querySelector(".lists");
let ContItem = document.querySelector(".itemCount");
let clearCompleted = document.querySelector(".clear");
let footer = document.querySelector(".footer");
let toggler = document.querySelector(".moon");
let togglerSun = document.querySelector(".sun");

let body = document.body;
let bgImgDark = document.querySelector(".dark-bg");
let bgImgWhite = document.querySelector(".white-bg");
let InputBox = document.querySelector(".input");
let ListLi = document.querySelector(".lists");
let track = document.querySelector(".track")
// Theme toggle
toggler.addEventListener("click", () => {
    togglerSun.style.display = "block";
    toggler.style.display = "none";
    body.style.backgroundColor = "#191825";
    bgImgWhite.style.display = "none";
    bgImgDark.style.display = "block";
    Lists.style.backgroundColor = "#24273D";
    Lists.style.boxShadow = "0px 30px 23px -4px #111118";
    InputBox.style.backgroundColor = "#24273D";
    InputValue.style.color = "#C4C7E1";
    ListLi.style.color = "#C4C7E1";
    track.style.backgroundColor = "#24273D"
    footer.style.color = "#C4C7E1";
});

togglerSun.addEventListener("click", () => {
    toggler.style.display = "block";
    togglerSun.style.display = "none";
    body.style.backgroundColor = "#FBFBFA";
    bgImgWhite.style.display = "block";
    bgImgDark.style.display = "none";
    Lists.style.backgroundColor = "#FEFFFE";
    Lists.style.boxShadow = "0px 30px 23px -4px rgba(228, 230, 234, 0.73)"
    InputBox.style.backgroundColor = "#FEFFFE";
    InputValue.style.color = "#202239";
    ListLi.style.color = "#202239";
    track.style.backgroundColor = "#FEFFFE";
    footer.style.color = "#202239";
});

InputValue.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addItems(InputValue.value);
        InputValue.value = "";
    }
});

window.onload = () => {
    InputValue.focus();
    document.querySelector(".all-list").classList.add("active")
};

let itemCount = 0;
const updateItemCount = () => {
    itemCount = document.querySelectorAll(".list").length;
    ContItem.textContent = itemCount;
};

const setActiveFilter = (activeFilter) =>{
    document.querySelectorAll(".track ul li").forEach(li => {
        li.classList.remove("active");
    });
    activeFilter.classList.add("active");
}

const addItems = (inputValue) => {
    footer.style.display = "flex";
    let list = document.createElement("div");
    list.innerHTML = `
        <div class="list">
            <div class="done"></div>
            <div class="my-list">
                <li>${inputValue}</li>
                <img src="images/icon-cross.svg" class="remove-icon">
            </div>
        </div>
    `;
    Lists.appendChild(list);
    itemCount++;
    ContItem.textContent = itemCount;

    list.addEventListener("click", (e) => {
        const doneIcon = list.querySelector(".done");
        const listItem = list.querySelector("li");

        if (e.target.classList.contains("remove-icon")) {
           list.remove();
           updateItemCount();
        } else {
            if (listItem.style.color === "#A8A6B1" && list.style.textDecoration === "line-through") {
                listItem.style.color = "";
                list.style.textDecoration = "";
                doneIcon.style.background = "";
                doneIcon.style.border = "";
                doneIcon.innerHTML = "";
            } else {
                listItem.style.color = "#A8A6B1";
                list.style.textDecoration = "line-through";
                doneIcon.style.background = "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
                doneIcon.style.border = "none";
                doneIcon.innerHTML = `<img src="images/icon-check.svg" class="done-icon">`;
            }
        }
    });

    clearCompleted.addEventListener("click", () => {
        document.querySelectorAll(".list").forEach(list => {
            const doneIcon = list.querySelector(".done");
            if (doneIcon.style.border === "none") {
                list.remove();
            }
        });
        updateItemCount();
    });

    let allList = document.querySelector(".all-list");
    let activeList = document.querySelector(".active-list");
    let compList = document.querySelector(".comp-list");

    allList.addEventListener("click", () => {
        document.querySelectorAll(".list").forEach(list => {
            list.style.display = "flex";
        });
        setActiveFilter(allList)
    });

    activeList.addEventListener("click", () => {
        document.querySelectorAll(".list").forEach(list => {
            const doneIcon = list.querySelector(".done");
            if (doneIcon.style.border !== "none") {
                list.style.display = "flex";
            } else {
                list.style.display = "none";
            }
        });
        setActiveFilter(activeList)
    });

    compList.addEventListener("click", () => {
        document.querySelectorAll(".list").forEach(list => {
            const doneIcon = list.querySelector(".done");
            if (doneIcon.style.border === "none") {
                list.style.display = "flex";
            } else {
                list.style.display = "none";
            }
        });
        setActiveFilter(compList)
    });
};
