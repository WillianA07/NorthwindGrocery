
"use strict"

window.onload = function() {
    const urlParams = new URLSearchParams(location.search);

    let productId = -1;
    if (urlParams.has("productId") === true) {
        productId = urlParams.get("productId");
        fetch("http://localhost:8081/api/products/" + productId)
            .then(response => response.json())
            .then(data => {
                createCard(data);
            });
    }

    createRecommendation();
}

const divForRecommendations = document.getElementById("divForRecommendations");

function createRecommendation () {
    fetch("http://localhost:8081/api/products")
        .then(response => response.json())
        .then(data => {
            fetch("http://localhost:8081/api/products/" + getRandomItem(data))
                .then(res => res.json())
                .then(data2 => {
                    createRandomCard(data2);
                });
        });
}

function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    return randomIndex;
}

function getImage(product) {
    for (let imgArray of imageArray){
       if (imgArray.categoryId == product.categoryId){
        return imgArray.img;
       }
    }
}

function createRandomCard(x) {
    divForRecommendations.innerHTML += `
        <div class="col">
            <div class="card h-100">
                <a href="http://127.0.0.1:5500/details.html?productId=${x.productId}">
                    <img src="${getImage(x)}" class="card-img-top">
                </a>
                <div class="card-body">
                    <a href="http://127.0.0.1:5500/details.html?productId=${x.productId}" style='text-decoration: none; color: Black;'>
                        <h5 class="card-title">${x.productName}</h5>
                    </a>
                    <p class="card-text">Product #: ${x.productId}</p>
                    <p class="card-text">Price: $${Number(x.unitPrice).toFixed(2)}</p>
                </div>
            </div>
        </div>
    `
}

function createCard(x) {
    document.getElementById("divForResults").innerHTML = `
        <div class="col">
            <div class="card h-100">
                <a href="http://127.0.0.1:5500/details.html?productId=${x.productId}">
                    <img src="" class="card-img-top" alt="">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${x.productName}</h5>
                    <p class="card-text">${x.productId}</p>
                    <p class="card-text">$${Number(x.unitPrice).toFixed(2)}</p>
                </div>
            </div>
        </div>
    `
}