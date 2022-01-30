// localStorage initialization
let itemsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

// Show Cart Content
async function displayCart() {
    const parser = new DOMParser();
    const positionEmptyCart = document.getElementById("cart__items");
    let cartArray = [];
  
    // If LocalStorage Is Empty
    if (itemsInLocalStorage === null || itemsInLocalStorage == 0) {
      positionEmptyCart.textContent = "Votre panier est vide";
    } else {
      // If LocalStorage Is Full
      for (i = 0; i < itemsInLocalStorage.length; i++) {
        const product = await getProductById(itemsInLocalStorage[i].id);
        const totalPriceItem = (product.price *= itemsInLocalStorage[i].quantity);
        cartArray += `
         <article class="cart__item" data-id=${itemsInLocalStorage[i].id}>
         <div class="cart__item__img">
           <img src="${product.imageUrl}" alt="Photographie d'un canapé">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__titlePrice">
             <h2>${product.name}</h2>
             <p>${itemsInLocalStorage[i].color}</p>
             <p>
             
             ${totalPriceItem} €</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : </p>
               <input data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${itemsInLocalStorage[i].quantity}>
             </div>
             <div class="cart__item__content__settings__delete">
               <p data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article>
       `;
      }
      // Show Cart Content And Total Price Of Items In The Cart
      let totalQuantity = 0;
      let totalPrice = 0;
      for (i = 0; i < itemsInLocalStorage.length; i++) {
        const article = await getProductById(itemsInLocalStorage[i].id);
        totalQuantity += parseInt(itemsInLocalStorage[i].quantity);
        totalPrice += parseInt(article.price * itemsInLocalStorage[i].quantity);
      }
      document.getElementById("totalQuantity").innerHTML = totalQuantity;
      document.getElementById("totalPrice").innerHTML = totalPrice;
      if (i == itemsInLocalStorage.length) {
        const displayBasket = parser.parseFromString(cartArray, "text/html");
        positionEmptyCart.appendChild(displayBasket.body);
        changeQuantity();
        deleteItem();
      }
     }
   }
    // API Call To Get Products
    async function getProductById(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
      .then(function (res) {
        return res.json();
      })
      .catch((err) => {
        // An Error Occurred
        console.log("erreur");
      })
      .then(function (response) {
        return response;
      });
   }
   displayCart();
   // Items Quantity Changes
function changeQuantity() {
    const quantityInputs = document.querySelectorAll(".itemQuantity");
    quantityInputs.forEach((quantityInput) => {
      quantityInput.addEventListener("change", (event) => {
        event.preventDefault();
        const inputValue = event.target.value;
        const dataId = event.target.getAttribute("data-id");
        const dataColor = event.target.getAttribute("data-color");
        let cartItems = localStorage.getItem("cartItems");
        let items = JSON.parse(cartItems);
  
        items = items.map((item, index) => {
          if (item.id === dataId && item.color === dataColor) {
            item.quantity = inputValue;
          }
          return item;
        });
  
        if (inputValue > 100) {
          alert("La quantité maximale autorisée est de 100");
          location.reload();
          return;
        }
        let itemsStr = JSON.stringify(items);
        localStorage.setItem("cartItems", itemsStr);
        location.reload();
      });
    });
  }
  
  // Remove An item From The Cart
  function deleteItem() {
    const deleteButtons = document.querySelectorAll(".deleteItem");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        const deleteId = event.target.getAttribute("data-id");
        const deleteColor = event.target.getAttribute("data-color");
        itemsInLocalStorage = itemsInLocalStorage.filter(
          (element) => !(element.id == deleteId && element.color == deleteColor)
        );
        console.log(itemsInLocalStorage);
        deleteConfirm = window.confirm(
          "Etes vous sûr de vouloir supprimer cet article ?"
        );
        if (deleteConfirm == true) {
          localStorage.setItem("cartItems", JSON.stringify(itemsInLocalStorage));
          location.reload();
          alert("l'article a été supprimé avec succès");
        }
      });
    });
  }

//----------------- Form Validation Using Regex----------------------//

// Regular Expressions Variables
let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let addressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

// Regular Expressions Variables To Get form Fields By Id
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// First Name Field Validation
firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML = "Champ non valide";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Last Name Field Validation
lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Champ non valide";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Address Field Validation
address.addEventListener("input", (event) => {
  event.preventDefault();
  if (addressRegex.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Champ non valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
});

// City Field Validation
city.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Champ non valide";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
});

// E-mail Field Validation
email.addEventListener("input", (event) => {
  event.preventDefault();
  if (emailRegex.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Champ non valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
});

let order = document.getElementById("order");
order.addEventListener("click", (e) => {
  e.preventDefault();
  // Create An Array To Get User Personnal Informations
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    alert("Veuillez compléter le formulaire afin de valider votre commande !");
  } else if (
    nameRegex.test(firstName.value) == false ||
    nameRegex.test(lastName.value) == false ||
    addressRegex.test(address.value) == false ||
    nameRegex.test(city.value) == false ||
    emailRegex.test(email.value) == false
  ) {
    alert("Veuillez Utiliser des données valables !");
  } else {
    let products = [];
    itemsInLocalStorage.forEach((order) => {
      products.push(order.id);
    });

    let pageOrder = { contact, products };

    // Order API Call To Send All Arrays
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pageOrder),
    })
      .then((res) => {
        return res.json();
      })
      .then((confirm) => {
        window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
        localStorage.clear();
      })
      .catch((error) => {
        console.log("une erreur est survenue");
      });
  }
});

  

  