// Where The Product Cards Will Be
const items = document.getElementById('items')

// API call to get products
const pickupItems= () => fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .catch(error => console.log("Error pickup sofa Data", error))

// Create A Card For Each Item
const sofaCard = sofa => {
    const sofaCard = document.createElement('a')
    sofaCard.setAttribute('href', `./product.html?id=${sofa._id}`)

    const sofaCardArticle = document.createElement('article')
    sofaCard.appendChild(sofaCardArticle)

    const sofaCardImg = document.createElement('img')
    sofaCardImg.setAttribute('src', `${sofa.imageUrl}`)
    sofaCardImg.setAttribute('alt', `${sofa.altTxt}`)

    const sofaCardName = document.createElement('h3')
    sofaCardName.classList.add('productName')
    sofaCardName.innerText = sofa.name

    const sofaCardDescription = document.createElement('p')
    sofaCardDescription.classList.add('productName')
    sofaCardDescription.innerText = sofa.description

    sofaCardArticle.appendChild(sofaCardName)
    sofaCardArticle.appendChild(sofaCardImg)
    sofaCardArticle.appendChild(sofaCardDescription)
    
    return sofaCard
}

// Function With Loop That Create Each Card
const main = async () => {
    const sofaData = await pickupItems()

    for (let i = 0; i < sofaData.length; i++) {
        if (sofaData[i]) {
            items.appendChild(sofaCard(sofaData[i]))
        }
    }
}

main()
