// Get Id 
const str = window.location;
const url = new URL(str);
const productId = url.searchParams.get("id");
const objectURL = "http://localhost:3000/api/products/" + productId;

// Add Item To The Cart
function addToCart(productItem) {
  let cartItems = localStorage.getItem("cartItems");
  // If The Cart Is Empty
  if (cartItems === null) {
    let items = [productItem];
    console.log(items);
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
    alert("Le produit a été ajouté à votre panier !");
  } else {
    // If The Cart Contains Products With The Same Id And The Same Color
    let items = JSON.parse(cartItems);
    const resultat = items.find((product) => {
      if (product.id === productItem.id && product.color === productItem.color)
        return true;

      return false;
    });

    if (resultat != undefined) {
      items = items.map((item, index) => {
        if (item.id === productItem.id && item.color === productItem.color) {
          item.quantity += productItem.quantity;
        }

        return item;
      });
    } else {
      // If The Cart Contains Different Items
      items.push(productItem);
    }
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
    alert("Le produit a été ajouté à votre panier !");
  }
}

// Get Products 
function displayProduct() {
    fetch("http://localhost:3000/api/products/" + productId)
      .then(function (res) {
        return res.json();
      })
      .catch((err) => {
        // An Error Occurred
        console.log("erreur");
      })
  
      // Insert data from API into DOM (Title, Img, Name, Price, Description And Color Options)
      .then(function (getProduct) {
        const product = getProduct;
  
        let productTitle = document.querySelector("title");
        productTitle.textContent = `${product.name}`;
  
        let productImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(productImg);
        productImg.setAttribute("src", `${product.imageUrl}`);
        productImg.setAttribute("alt", `${product.altTxt}`);
  
        let productName = document.getElementById("title");
        productName.textContent = `${product.name}`;
  
        let productPrice = document.getElementById("price");
        productPrice.textContent = `${product.price}`;
  
        let productDescription = document.getElementById("description");
        productDescription.textContent = `${product.description}`;
  
        document.querySelector("#colors").insertAdjacentHTML(
          "beforeend",
          product.colors.map(
            (color) =>
              `<option id= "valueColor" value="${color}">${color}</option>`
          )
        );
      });

    // Listen To the Event Add To The cart Button
    const cartButton = document.getElementById("addToCart");
    cartButton.addEventListener("click", (event) => {
    event.preventDefault();
    let productColor = document.getElementById("colors").value;
    let productQuantity = parseInt(document.getElementById("quantity").value);
    // If No Color Was Selected
    if (productColor == "") {
      alert("Veuillez choisir une couleur");
      return;
    }
    // If The Quantity = 0
    if (productQuantity == 0) {
      alert("Veuillez indiquer la quantité souhaitée");
      return;
    } else if (productQuantity > 100) {
      alert("La quantité maximale autorisée est de 100");
      return;
    }
    
    // Build An Array Contains Id, Color And Quantity Of The Added Product
    const productOptions = {
      id: productId,
      color: productColor,
      quantity: productQuantity,
    };
    addToCart(productOptions);
  });
}
displayProduct();
