// Initialize Stripe.js and Elements
const stripe = Stripe('pk_test_51QezsBKfpgfUfOSHUfaVmdDwoStl2MTjNGBLi0awJSe1C6kDGYj9QLNy2t4ROEbZmqMhb4IAnw8JVyxv5W6JQHfk00VEPGhTGe'); // Use your Stripe publishable key here
const elements = stripe.elements();
const card = elements.create('card');
card.mount('#card-element');

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

const orderSummaryWrapper = document.getElementById('order-summary');

const generateOrderSummary = () => {
    if (basket.length !== 0) {
        orderSummaryWrapper.innerHTML = '';

        console.log(basket)

        // Generate HTML for each product in the basket
        const orderSummaryHTML = basket.map((basketItem) => {
            // Find the product details based on the ID from the products array
            const productFound = products.find((product) => product.id === basketItem.id);
            
            if (!productFound) {
                return ''; // If no matching product found, return an empty string
            }

            // Return the HTML for the product in the cart
            return `
            <div>
                <img src="${productFound.image}" alt="${productFound.name}" width="100%" />
                <p><strong>${productFound.name}</strong></p>
                <p>Price: $${productFound.price}</p>
                <p>Quantity: ${basketItem.item}</p>
                <p>Total: $${(productFound.price * basketItem.item).toFixed(2)}</p>
            </div>
            `;
        }).join(''); // Join the array into a single string

        // Set the generated HTML into the order summary container
        orderSummaryWrapper.innerHTML = orderSummaryHTML;
    } else {
        orderSummaryWrapper.innerHTML = '<p>Your cart is empty. Please add products to your cart.</p>';
    }
};




generateOrderSummary();


// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect user information
    const name = document.getElementById('name_checkout').value;
    const email = document.getElementById('email_checkout').value;
    const address = document.getElementById('address_checkout').value;

    // Create a payment method with Stripe
    const {token, error} = await stripe.createToken(card);
    if (error) {
        // Show error message
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
    } else {
        // Send the token to your backend
        const orderData = {
            name_checkout: name,
            email_checkout: email,
            address_checkout: address,
            stripeToken: token.id,
            products: JSON.parse(localStorage.getItem('data')) 
        };

        // Make the API request to submit the order
        try {
            const response = await fetch('/submit_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                alert('Order placed successfully!');
                // Clear the basket in both the JavaScript variable and localStorage
                basket = [];
                localStorage.removeItem('data'); // Remove the cart from localStorage
                // Redirect to confirmation page after a short delay
                setTimeout(() => {
                    window.location.href = '/confirmation.html';  // Redirect to the confirmation page
                }, 1500); // Delay in milliseconds (1.5 seconds)
            }
             else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('There was an error submitting your order.');
        }
    }
});
