
$(document).ready(function () {
    console.log("Document is ready");
    $('.fade-in-text-one').fadeIn(1500).removeClass('hidden');
    $('.fade-in-text-two').fadeIn(5000).removeClass('hidden');
});

const itemContainer = document.querySelector(".cupcakes");
// const cakesContainer = document.querySelector(".cakes");
let basket = JSON.parse(localStorage.getItem("data")) || [];

const products = [
    { name: "Easy Chocolate Cupcake", category: "Cupcake", image: "./images/chocolateeasycup.webp", altImg: "./images/easychocAlt.webp", price: 12.5 },
    { name: "Heavenly Chocolate Cupcake", category: "Cupcake", image: "./images/heavenlychoc.jpg", altImg: "./images/heavenlychocAlt.jpg", price: 7.5 },
    { name: "Air Fryer Cupcake", category: "Cupcake", image: "https://www.supergoldenbakes.com/wordpress/wp-content/uploads/2023/03/Air_Fryer_Cupcakes-1-4-300x300.jpg", altImg: "./images/Air_Fryer_Cupcakes.jpg", price: 8 },
    { name: "Rainbow Cupcake", category: "Cupcake", image: "./images/rainbowcupcake.webp", altImg: "./images/Pink-Lemonade-Cupcakes-1-scaled.jpg", price: 20 },
    { name: "Cupcake Autumn", category: "Cupcake", image: "./images/output (11).jpg", altImg: "./images/autumncupcake.jpeg", price: 14 },
    { name: "Lime Cupcake", category: "Cupcake", image: "./images/limecup.jpg", altImg: "./images/limecup_alt.jpg", price: 18 },    
    { name: "Chocolate Cupcake Peanut Butter", category: "Cupcake", image: "./images/peanutcupcake.webp", altImg: "./images/peanutcupcake_alt.webp", price: 8 },
    { name: "Strawberry Cupcake", category: "Cupcake", image: "https://i.postimg.cc/nLTZkLjK/output.jpg", altImg: "./images/Strawberrycucpcake_alt.webp", price: 20 },
    { name: "Choko Chip Cake", category: "Cake", image: "./images/output (12).jpg", altImg: "./images/browniecupcake_alt.jpg", price: 55},
    { name: "Cherry Wedding Cake", category: "Cake", image: "./images/cheryyweddingcake.webp", altImg: "./images/cherryweddingcake_alt.jpg", price: 35},
    { name: "Lemon Curd Cake", category: "Cake", image: "./images/LEMON2-scaled.webp", altImg: "./images/lemoncurdcake_alt.jpg", price: 42.5},
    { name: "Three Tier Wedding Cake", category: "Cake", image: "./images/threetiercake.jpg", altImg: "./images/threetier_alt.jpg", price: 37},
    { name: "Wedding Cake", category: "Cake", image: "./images/output (13).jpg", altImg: "./images/weddingcake_alt.jpg", price: 32.5},
    { name: "Marsipan Cake", category: "Cake", image: "./images/marsipancake.webp", altImg: "./images/marsipancake_alt.jpg", price: 57},
    { name: "Velvet Delight Mini Cake", category: "Cake", image: "./images/81Yz4eelOGL.jpg", altImg: "./images/velvet_alt.jpeg", price: 25},
    { name: "Black Forest Cake", category: "Cake", image: "./images/blackforestcake.jpg", altImg: "./images/blackforestcake_alt.webp", price: 60}
];

// Set numeric IDs for cupcakes
products.forEach((item, index) => {
    item.id = index; // Assign index as ID
});

// Function to update cart amount displayed
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// Increment function
let increment = (id, name, price) => {
    // Find the product in the products array by its ID
    let product = products.find((x) => x.id === id);
    
    // If product is not in the basket yet, add it
    let search = basket.find((x) => x.id === id);
    if (search === undefined) {
        // Push the full product details (including quantity) to the basket
        basket.push({
            id,
            name: name,
            price: price,            
            item: 1, // Starting quantity is 1            
        });
    } else {
        // If product is already in the basket, increase the quantity
        search.item += 1;
    }

    // Save the updated basket to localStorage
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
};


// Decrement function
let decrement = (id) => {
    let search = basket.find((x) => x.id === id);
    
    if (search === undefined) return;
    if (search.item === 1) {
        basket = basket.filter((x) => x.id !== id);
    } else {
        search.item -= 1;
    }
    
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
};

// Function to generate shop items
function generateShop() {
    itemContainer.innerHTML = ""; // Clear existing items

    products.forEach((item) => {
        itemContainer.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100">
                <img 
                    class="img-fluid card-img-top product-img"
                    src="${item.image}"
                    alt="${item.name}"
                    data-original="${item.image}"
                    data-alt="${item.altImg || item.image}"
                >
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.category}</p>
                    <div class="priceAndIcon">
                        <div>${item.price}$</div>
                        <span class="icon-wrapper-remove" onclick="decrement(${item.id})">
                            <i class="fa fa-trash fa-2x"></i>
                        </span>
                        <span class="icon-wrapper" onclick="increment(${item.id}, '${item.name}', ${item.price})">
                            <i class="fa fa-shopping-bag fa-2x"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>`;
    });

    // Add hover effects
    setTimeout(() => {
        const images = document.querySelectorAll('.product-img');
        images.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.opacity = '0';
                setTimeout(() => {
                    const altSrc = img.getAttribute('data-alt');
                    if (altSrc) img.src = altSrc;
                    img.style.opacity = '1';
                }, 350);
            });

            img.addEventListener('mouseleave', () => {
                img.style.opacity = '0';
                setTimeout(() => {
                    img.src = img.getAttribute('data-original');
                    img.style.opacity = '1';
                }, 150);
            });
        });
    }, 0); // Ensure elements are in DOM
}

 document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 1000, // animation duration in ms
    once: true,     // whether animation should happen only once
  });
});


// Initial setup
generateShop();
calculation();
   