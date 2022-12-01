let addToy = false;

// event handlers 
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // add new toy
  const submit = document.querySelector(".add-toy-form")
  submit.addEventListener("submit", handleSubmit)

});

// submit new toy
function handleSubmit(event) {
  event.preventDefault()
  let newToyObj = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes: `${likes}`
  }
  
  addNewToy(newToyObj)
};


// add toy cards 
function renderOneToy(toys) {
  //Build Toy
  let card = document.createElement("li");
  card.className = "card";
  card.innerHTML = `
  <div class="card">
  <h2>${toys.name}</h2>
  <img src=${toys.image} class="toy-avatar" />
  <p>${toys.likes} Likes</p>
  <button class="like-btn" id="${toys.id}">Like ❤️</button>
  </div>`

  //Add toy card to DOM
  document.getElementById("toy-collection").appendChild(card);

  // Add Llikes
  /* adding likes is a function of the toy card, so it makes sense to add it here! */ 
  card.querySelector(".like-btn").addEventListener("click", () => {
    toys.likes += 1;
    card.querySelector(".card p").textContent = `${toys.likes} Likes`;
    addLikes(toys);
  })
};

// fetch data & add all toy cards to front page
function getAllCards(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(toy => renderOneToy(toy)))
};

getAllCards(); 


// POST REQ: add a new toy
let likes = 0;

function addNewToy(newToyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyObj),
  })
  .then(res => res.json())
  .then(toys => console.log(toys))
};


// PATCH REQ: increase toy's likes
function addLikes(newToyObj) {
  fetch(`http://localhost:3000/toys/${newToyObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyObj),
  })
  .then(res => res.json())
  .then(toys => console.log(toys))
}