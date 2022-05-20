let userState = [];

class User {
    constructor(userObj) {
        this.name = userObj.name,
            this.surname = userObj.surname,
            this.username = userObj.username,
            this.img = userObj.img
    }
}

let usernameError = document.getElementById("usernameError");
let cardParent = document.getElementById("cardParent");
let searchForm = document.getElementById("searchForm");

cardCreateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formProps = Object.fromEntries(formData);
    if (!CheckUsername(e.target.username.value)) {
        userState.push(new User(formProps));
        usernameError.innerText = "";
        HtmlResponse(userState, cardParent);
        cardCreateForm.reset();
    } else {
        usernameError.innerText = "Username already exists";
    }
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newCards = [];
    if (e.target.search.value.trim() != "") {
        userState.filter((user) => {
            if (user.username.includes(e.target.search.value)) {
                newCards.push(user);
            }
        })
        HtmlResponse(newCards, cardParent);
    }
})

function CheckUsername(username) {
    return userState.find(user => username == user.username);
}
function DeleteUser(button) {
    userState = userState?.filter((user) =>
        user.username != button.getAttribute("id"));
    HtmlResponse(userState, cardParent);
}

function HtmlResponse(userState, cardParent) {
    cardParent.innerHTML = "";
    userState?.map((user) => {
        cardParent.innerHTML += WriteComponent(
            user.name,
            user.surname,
            user.username,
            user.img
        )
    })
}

function WriteComponent(name, surname, username, img) {
    return `
 <div class="col-3">
    <div class="card">
        <button id=${username} onclick="DeleteUser(${username})" id="delete" class="btn btn-danger position-absolute end-0 top-0 m-2 rounded-3">
            <i class="fa-solid fa-trash"></i>
        </button>
        <img src=${img} class="card-img card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${name} ${surname}</h5>
            <p class="card-text mb-1 link-primary">@${username}</p>
        </div>
    </div>
</div>
    `
}
clearAll.addEventListener("click", () => {
    userState = [];
    HtmlResponse(userState, cardParent);
})

let search = document.getElementById("search");

