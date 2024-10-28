document.addEventListener("DOMContentLoaded", () => {
    let ShoppingCart = document.querySelector(".checkoutProducts");
    let label = document.getElementById("label");
    let basket = JSON.parse(localStorage.getItem("data")) || [];

    const products = [
        { name: "Easy Chocolate Cupcake", category: "Cupcake", image: "https://sugarspunrun.com/wp-content/uploads/2022/04/Best-Chocolate-Cupcakes-1-of-1-300x300.jpg", price: 12.5 },
        { name: "Heavenly Chocolate Cupcake", category: "Cupcake", image: "https://heavenlycupcake.se/wp-content/uploads/2022/05/030422-chokladcupcakes-med-chokladpudding-05-300x300.jpg", price: 7.5 },
        { name: "Air Fryer Cupcake", category: "Cupcake", image: "https://www.supergoldenbakes.com/wordpress/wp-content/uploads/2023/03/Air_Fryer_Cupcakes-1-4-300x300.jpg", price: 8 },
        { name: "Rainbow Cupcake", category: "Cupcake", image: "https://www.sugarhero.com/wp-content/uploads/2014/07/exploding-cupcakes-alt-1-sq-featured-image-300x300.jpg", price: 20 },
        { name: "Cupcake Autumn", category: "Cupcake", image: "https://malvia.se/wp-content/uploads/2024/08/17150-300x300.jpg", price: 14 },
        { name: "Lemon Curd Cupcake", category: "Cupcake", image: "https://vintagekitchennotes.com/wp-content/uploads/2012/10/Frosted-lemon-curd-cupcakes-300x300.jpeg", price: 5 },
        { name: "Chocolate Cupcake Peanut Butter", category: "Cupcake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-FEGWH7FROzJ5b7FwnSfI0q5t6zg1hQsaTw&s", price: 8 },
        { name: "Strawberry Cupcake", category: "Cupcake", image: "https://www.glutenfreetranquility.com/wp-content/uploads/2021/06/Gluten-free-victoria-sponge-cupcakes-300x300.jpg", price: 20 },
        { name: "Choko Chip Cake", category: "Cake", image: "https://charlysbakery.co.za/wp-content/uploads/2022/03/Chocolate-Extravaganza-mini-single-tier-all-dark-chocolates-300x300.jpg", price: 55},
        { name: "Cherry Wedding Cake", category: "Cake", image: "https://www.cakesbyrobin.co.uk/assets/Naked-Wedding-Cake-300x300.jpg", price: 35},
        { name: "Lemond Curd Cake", category: "Cake", image: "https://cakeinn.co.uk/wp-content/uploads/nc/62785024/4202644026-300x300.png", price: 42.5},
        { name: "Three Tier Wedding Cake", category: "Cake", image: "https://benningtonscakes.com/cdn/shop/products/image_71ec4af4-1a58-415c-91d0-d67c83965519_300x300.jpg?v=1638266442", price: 37},
        { name: "Wedding Cake", category: "Cake", image: "https://www.sweetcakebake.com.np/wp-content/uploads/2024/01/weding-cake5-300x300.jpg", price: 32.5},
        { name: "Marsipan Cake", category: "Cake", image: "https://isfahansweets.com/wp-content/uploads/2023/07/omani-wedding-cake-300x300.png", price: 57},
        { name: "Velvet Delight Mini Cake", category: "Cake", image: "https://m.media-amazon.com/images/I/61nWSwQr2FL.jpg", price: 25},
        { name: "Black Forest Cake", category: "Cake", image: "https://thesweetspotcakes.ca/wp-content/uploads/2023/05/BlackForest-Cake1-300x300.jpg", price: 60}
    ];

    products.forEach((item, index) => {
        item.id = index;
    });

    const generateCartItems = () => {
        if (basket.length !== 0) {
            ShoppingCart.innerHTML = basket.map((x) => {
                let { id, item } = x;
                let search = products.find((y) => y.id === id);
                if (!search) return '';

                return `
                    <div class="cart-item mb-2 card checkout_cards">
                        <img class="img-fluid" src="${search.image}" alt="" />
                        <div class="details detailsInCart">
                            <div class="title-price-x">
                                <h4 class="title-price">
                                    <p>${search.name}</p>
                                </h4>
                                <i onclick="removeItem(${id})" class="fa fa-x"></i> 
                            </div>
                            <div class="buttons">
                                <i id="minusquantity" onclick="decrement(${id})" class="fa fa-trash fa-2x"></i>
                                <div id="${id}" class="quantity quantitycart">Amount: ${item == 1 ? item + " piece" : item + " pieces"}</div>
                                <i onclick="increment(${id})" class="fa fa-shopping-bag fa-2x"></i>
                            </div>
                            <h3>Price: ${item * search.price}$</h3>
                        </div>
                    </div>`;
            }).join("");
            label.innerHTML = '';
        } else {
            ShoppingCart.innerHTML = '';
            label.innerHTML = `
                <h2>Cart is Empty</h2>
                <a href="product.html">
                    <button class="HomeBtn">Back to home</button>
                </a>`;
        }
    };

    const TotalAmount = () => {
        if (basket.length !== 0) {
            let amount = basket.reduce((total, x) => {
                let search = products.find((y) => y.id === x.id);
                return total + (search ? (x.item * search.price) : 0);
            }, 0);

            label.innerHTML = `
                <h2>Total Bill : $ ${amount.toFixed(2)}</h2>
                <button class="checkout">Back</button>
                <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;
        }
    };

    const update = (id) => {
        let search = basket.find((x) => x.id === id);
        if (search) {
            document.getElementById(id).innerHTML = `Amount: ${search.item == 1 ? search.item + " piece" : search.item + " pieces"}`;
        }
        calculation();
        TotalAmount();
    };

    const increment = (id) => {
        let search = basket.find((x) => x.id === id);
        if (search) {
            search.item += 1;
        } else {
            basket.push({ id, item: 1 });
        }
        generateCartItems();
        update(id);
        localStorage.setItem("data", JSON.stringify(basket));
    };

    const decrement = (id) => {
        let search = basket.find((x) => x.id === id);
        if (search && search.item > 0) {
            search.item -= 1;
            if (search.item === 0) {
                basket = basket.filter((x) => x.id !== id);
            }
        }
        generateCartItems();
        update(id);
        localStorage.setItem("data", JSON.stringify(basket));
    };

    const removeItem = (id) => {
        basket = basket.filter((x) => x.id !== id);
        generateCartItems();
        calculation();
        TotalAmount();
        localStorage.setItem("data", JSON.stringify(basket));
    };

    const clearCart = () => {
        basket = [];
        generateCartItems();
        calculation();
        TotalAmount();
        localStorage.setItem("data", JSON.stringify(basket));
    };

    const calculation = () => {
        let cartIcon = document.getElementById("cartAmount");
        const totalItems = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
        cartIcon.innerHTML = totalItems;
    };

    // Form submission
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.querySelector('input[name="name_checkout"]').value;
        const email = document.querySelector('input[name="email_checkout"]').value;

        // Prepare selectedProducts
        const selectedProducts = basket.map(item => {
            const product = products.find(c => c.id === item.id);
            return { product: product.name, quantity: item.item };
        });

        // Send data to the server
        fetch('/submit_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name_checkout: name,
                email_checkout: email,
                products: selectedProducts,
            }),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert("Order submitted successfully!");

        // Clear the cart after successful submission
        clearCart();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    window.increment = increment;
    window.decrement = decrement;
    window.removeItem = removeItem;
    window.clearCart = clearCart;

    // const form = document.querySelector('form');
    // form.addEventListener('/submit_order', function(event) {
        
    //     if (basket.length === 0) {
    //         event.preventDefault(); // Prevent the form from submitting
    //         alert('You must add at least one product to your order.');
    //     }
    // });

    // Initial calls
    calculation();
    generateCartItems();
    TotalAmount();
});