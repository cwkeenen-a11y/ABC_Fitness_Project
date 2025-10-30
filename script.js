// ====================================================================
// WEB STORAGE UTILITY FUNCTIONS (sessionStorage for Cart)
// ====================================================================

// Gets cart array or returns empty array.
function getCart() {
    const cartJSON = sessionStorage.getItem('shoppingCart');
    return cartJSON ? JSON.parse(cartJSON) : [];
}

// Saves cart array to sessionStorage (as JSON string).
function saveCart(cart) {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Updates the modal display based on current cart contents.
function updateCartDisplay() {
    const cart = getCart();
    const modalItemCount = document.getElementById('modal-item-count');
    const cartItemsList = document.getElementById('cartItemsList');

    if (modalItemCount) {
        modalItemCount.textContent = cart.length;
    }

    if (cartItemsList) {
        cartItemsList.innerHTML = ''; // Clear previous

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        } else {
            cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.name; 
                cartItemsList.appendChild(listItem);
            });
        }
    }
}


// ====================================================================
// 1. Footer Subscribe Feature
// ====================================================================

const subscribeBtn = document.getElementById('subscribeBtn');

if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function(event) {
        event.preventDefault(); 
        const form = subscribeBtn.closest('form'); 
        
        if (form && form.checkValidity()) {
            alert("Thank you for subscribing.");
            form.reset(); 
        } else {
            form.reportValidity(); 
        }
    });
}


// ====================================================================
// 2. Gallery Page Features (Cart Logic)
// ====================================================================

// --- Modal Elements & Buttons ---
const cartModal = document.getElementById('cartModal');
const viewCartBtn = document.getElementById('view-cart-btn');
const closeBtn = document.querySelector('.close-btn');

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const clearCartBtn = document.getElementById('clearCartBtn');
const processOrderBtn = document.getElementById('processOrderBtn');

const modalClearCartBtn = document.getElementById('modalClearCartBtn');
const modalProcessOrderBtn = document.getElementById('modalProcessOrderBtn');


// --- A. "Add to Cart" Handler (USES sessionStorage) ---
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const row = button.closest('tr'); // Get parent row
        
        const item = {
            id: button.dataset.productId,
            name: row.cells[1].textContent, // Item Name
            description: row.cells[2].textContent,
            timeAdded: new Date().toISOString()
        };

        const cart = getCart();
        cart.push(item);
        saveCart(cart); 
        
        alert("Item added to the cart");
        updateCartDisplay();
    });
});

// --- B. Modal Display Handlers ---

// Open Modal
if (viewCartBtn) {
    viewCartBtn.addEventListener('click', function() {
        if (cartModal) {
            cartModal.classList.add('show-modal');
            updateCartDisplay(); // Load data
        }
    });
}

// Close Modal 
if (closeBtn) {
    closeBtn.addEventListener('click', () => cartModal.classList.remove('show-modal'));
}
if (cartModal) {
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.classList.remove('show-modal');
        }
    });
}


// --- C. Cart Action Logic ---

function handleClearCart() {
    const cart = getCart();
    if (cart.length > 0) {
        sessionStorage.removeItem('shoppingCart'); 
        alert("Cart cleared");
    } else {
        alert("No items to clear.");
    }
    updateCartDisplay();
}

function handleProcessOrder() {
    const cart = getCart();
    if (cart.length > 0) {
        alert("Thank you for your order");
        sessionStorage.removeItem('shoppingCart'); 
    } else {
        alert("Cart is empty.");
    }
    updateCartDisplay();
}

// Attach Logic to all Buttons
if (clearCartBtn) clearCartBtn.addEventListener('click', handleClearCart);
if (processOrderBtn) processOrderBtn.addEventListener('click', handleProcessOrder);
if (modalClearCartBtn) modalClearCartBtn.addEventListener('click', handleClearCart);
if (modalProcessOrderBtn) modalProcessOrderBtn.addEventListener('click', handleProcessOrder);


// ====================================================================
// 3. Contact Form (Saves to localStorage)
// ====================================================================

const contactSubmitBtn = document.getElementById('contactSubmitBtn');

if (contactSubmitBtn) {
    contactSubmitBtn.addEventListener('click', function(event) {
        event.preventDefault(); 
        const form = contactSubmitBtn.closest('form');
        
        if (form && form.checkValidity()) {
            
            const formData = {
                name: document.getElementById('name-input').value, 
                email: document.getElementById('email-input').value, 
                phone: document.getElementById('phone-input').value, 
                message: document.getElementById('message-input').value, 
                timestamp: new Date().toLocaleString()
            };
            
            // Get existing submissions or start a new array
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(formData);
            
            // Save the updated array back to localStorage
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            alert("Thank you for your message");
        } else {
            form.reportValidity(); 
        }
    });
}