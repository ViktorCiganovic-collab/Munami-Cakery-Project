
$(document).ready(function () {
    console.log("Document is ready");
    $('.fade-in-text-one').fadeIn(1500).removeClass('hidden');
    $('.fade-in-text-two').fadeIn(5000).removeClass('hidden');
});

const itemContainer = document.querySelector(".cupcakes");
// const cakesContainer = document.querySelector(".cakes");
let basket = JSON.parse(localStorage.getItem("data")) || [];

const products = [
    { name: "Easy Chocolate Cupcake", category: "Cupcake", image: "https://handletheheat.com/wp-content/uploads/2021/02/chocolate-cupcakes-SQUARE-500x500.png", price: 12.5 },
    { name: "Heavenly Chocolate Cupcake", category: "Cupcake", image: "./images/heavenlychoc.jpg", price: 7.5 },
    { name: "Air Fryer Cupcake", category: "Cupcake", image: "https://www.supergoldenbakes.com/wordpress/wp-content/uploads/2023/03/Air_Fryer_Cupcakes-1-4-300x300.jpg", price: 8 },
    { name: "Rainbow Cupcake", category: "Cupcake", image: "https://www.sugarhero.com/wp-content/uploads/2014/07/exploding-cupcakes-alt-1-sq-featured-image-300x300.jpg", price: 20 },
    { name: "Cupcake Autumn", category: "Cupcake", image: "./images/output (11).jpg", price: 14 },
    { name: "Lime Cupcake", category: "Cupcake", image: "https://blog.wilton.com/wp-content/uploads/sites/2/2019/05/how-to-make-a-giant-cupcake-feature-500x500.jpg", price: 18 },    
    { name: "Chocolate Cupcake Peanut Butter", category: "Cupcake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-FEGWH7FROzJ5b7FwnSfI0q5t6zg1hQsaTw&s", price: 8 },
    { name: "Strawberry Cupcake", category: "Cupcake", image: "https://i.postimg.cc/nLTZkLjK/output.jpg", price: 20 },
    { name: "Choko Chip Cake", category: "Cake", image: "./images/output (12).jpg", price: 55},
    { name: "Cherry Wedding Cake", category: "Cake", image: "https://www.cakesbyrobin.co.uk/assets/Naked-Wedding-Cake-300x300.jpg", price: 35},
    { name: "Lemond Curd Cake", category: "Cake", image: "https://cakeinn.co.uk/wp-content/uploads/nc/62785024/4202644026-300x300.png", price: 42.5},
    { name: "Three Tier Wedding Cake", category: "Cake", image: "https://benningtonscakes.com/cdn/shop/products/image_71ec4af4-1a58-415c-91d0-d67c83965519_300x300.jpg?v=1638266442", price: 37},
    { name: "Wedding Cake", category: "Cake", image: "./images/output (13).jpg", price: 32.5},
    { name: "Marsipan Cake", category: "Cake", image: "https://isfahansweets.com/wp-content/uploads/2023/07/omani-wedding-cake-300x300.png", price: 57},
    { name: "Velvet Delight Mini Cake", category: "Cake", image: "https://m.media-amazon.com/images/I/61nWSwQr2FL.jpg", price: 25},
    { name: "Black Forest Cake", category: "Cake", image: "https://thesweetspotcakes.ca/wp-content/uploads/2023/05/BlackForest-Cake1-300x300.jpg", price: 60}
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
    products.forEach((item) => {
        itemContainer.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100">
                <img class="img-fluid card-img-top" src="${item.image}" alt="${item.name}">
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
}

// Initial setup
generateShop();
calculation();
