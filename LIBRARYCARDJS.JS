document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('register-btn');
    const registrationForm = document.getElementById('registration-form');
    
    const fullnameInput = document.getElementById('fullname');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const membershipSelect = document.getElementById('membership-type');

    if (localStorage.getItem('lib_fullname') && fullnameInput) {
        fullnameInput.value = localStorage.getItem('lib_fullname');
    }
    if (localStorage.getItem('lib_username') && usernameInput) {
        usernameInput.value = localStorage.getItem('lib_username');
    }
    if (localStorage.getItem('lib_email') && emailInput) {
        emailInput.value = localStorage.getItem('lib_email');
    }
    if (localStorage.getItem('lib_phone') && phoneInput) {
        phoneInput.value = localStorage.getItem('lib_phone');
    }
    if (localStorage.getItem('lib_membership') && membershipSelect) {
        membershipSelect.value = localStorage.getItem('lib_membership');
    }

    if (registerBtn && registrationForm) {
        registerBtn.addEventListener('click', () => {
            registrationForm.style.display = 'block';
            registerBtn.style.display = 'none';
        });
    }

    const handleInputPersistence = (element, storageKey, eventType = 'input') => {
        if (element) {
            element.addEventListener(eventType, (e) => {
                localStorage.setItem(storageKey, e.target.value);
            });
        }
    };

    handleInputPersistence(fullnameInput, 'lib_fullname');
    handleInputPersistence(usernameInput, 'lib_username');
    handleInputPersistence(emailInput, 'lib_email');
    handleInputPersistence(phoneInput, 'lib_phone');
    handleInputPersistence(membershipSelect, 'lib_membership', 'change');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(44, 34, 30, 0.6)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';

            modal.innerHTML = `
                <div style="background: #ffffff; padding: 35px; border-radius: 6px; text-align: center; max-width: 400px; border: 1px solid #d6ccc2; box-shadow: 0 4px 12px rgba(44, 34, 30, 0.15); font-family: 'Georgia', serif;">
                    <h3 style="margin-top: 0; color: #8b4513; font-size: 1.5rem;">Registration Successful</h3>
                    <p style="color: #6b5b52; margin-bottom: 25px;">Thanks for buying our library card.</p>
                    <button id="modal-proceed-btn" style="background-color: #8b4513; color: white; border: none; padding: 10px 20px; font-family: 'Georgia', serif; border-radius: 4px; cursor: pointer; font-size: 1rem;">Proceed</button>
                </div>
            `;

            document.body.appendChild(modal);

            document.getElementById('modal-proceed-btn').addEventListener('click', () => {
                const books = [
                    "The Divine Comedy",
                    "Faust",
                    "Don Quixote",
                    "The Wings",
                    "Hell Screen",
                    "The Stranger",
                    "Dream of the Red Chamber",
                    "Wuthering Heights",
                    "Moby Dick",
                    "Crime and Punishment",
                    "Demian",
                    "The Odyssey",
                    "The Metamorphosis"
                ];

                const bookListHTML = books.map(book => `
                    <li style="background: #f9f9f9; margin-bottom: 12px; padding: 15px; border: 1px solid #d6ccc2; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                        <span><strong>${book}</strong></span>
                        <button class="order-book-btn" data-book="${book}" style="background-color: #8b4513; color: white; border: none; padding: 8px 14px; font-family: 'Georgia', serif; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">Order Book</button>
                    </li>
                `).join('');

                document.body.innerHTML = `
                    <div style="font-family: 'Georgia', serif; background-color: #f4f1ea; color: #2c221e; max-width: 700px; margin: 40px auto; padding: 20px; line-height: 1.6;">
                        <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #8b4513; padding-bottom: 20px; margin-bottom: 20px;">
                            <div>
                                <h2 style="color: #8b4513; margin: 0 0 5px 0;">Digital Archive Repository</h2>
                                <p style="color: #6b5b52; font-style: italic; margin: 0; font-size: 0.9rem;">Cardholder Access granted</p>
                            </div>
                            <button id="logout-btn" style="background-color: #6b5b52; color: white; border: none; padding: 8px 16px; font-family: 'Georgia', serif; border-radius: 4px; cursor: pointer;">Logout</button>
                        </header>

                        <!-- Simple Checkout Bar -->
                        <div id="checkout-bar" style="background: #ffffff; padding: 15px 20px; border-radius: 6px; border: 1px solid #d6ccc2; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(44, 34, 30, 0.03);">
                            <span id="cart-counter" style="font-weight: bold; color: #8b4513;">Cart: 0 items selected</span>
                            <button id="checkout-action-btn" style="background-color: #8b4513; color: white; border: none; padding: 8px 16px; font-family: 'Georgia', serif; border-radius: 4px; cursor: pointer; font-size: 0.9rem; opacity: 0.6; pointer-events: none;">Checkout</button>
                        </div>

                        <main>
                            <section style="background: #ffffff; padding: 20px 25px; border-radius: 6px; border: 1px solid #d6ccc2; box-shadow: 0 2px 4px rgba(44, 34, 30, 0.03);">
                                <h3 style="color: #8b4513; margin-top: 0;">Available Books</h3>
                                <p style="color: #6b5b52;">Select a book to order for checkout:</p>
                                <ul style="list-style: none; padding: 0; margin-top: 15px;">
                                    ${bookListHTML}
                                </ul>
                            </section>
                        </main>
                    </div>
                `;

                document.getElementById('logout-btn').addEventListener('click', () => {
                    localStorage.clear();
                    window.location.reload();
                });

                // Track ordered items
                const orderedBooks = [];

                document.querySelectorAll('.order-book-btn').forEach(btn => {
                    btn.addEventListener('click', (event) => {
                        const bookName = event.target.getAttribute('data-book');
                        
                        if (!orderedBooks.includes(bookName)) {
                            orderedBooks.push(bookName);
                            event.target.textContent = "Ordered";
                            event.target.style.backgroundColor = "#555";
                        } else {
                            const index = orderedBooks.indexOf(bookName);
                            orderedBooks.splice(index, 1);
                            event.target.textContent = "Order Book";
                            event.target.style.backgroundColor = "#8b4513";
                        }

                        const counter = document.getElementById('cart-counter');
                        const checkoutBtn = document.getElementById('checkout-action-btn');
                        
                        counter.textContent = `Cart: ${orderedBooks.length} item${orderedBooks.length === 1 ? '' : 's'} selected`;

                        if (orderedBooks.length > 0) {
                            checkoutBtn.style.opacity = '1';
                            checkoutBtn.style.pointerEvents = 'auto';
                        } else {
                            checkoutBtn.style.opacity = '0.6';
                            checkoutBtn.style.pointerEvents = 'none';
                        }
                    });
                });

                document.getElementById('checkout-action-btn').addEventListener('click', () => {
                    const checkoutModal = document.createElement('div');
                    checkoutModal.style.position = 'fixed';
                    checkoutModal.style.top = '0';
                    checkoutModal.style.left = '0';
                    checkoutModal.style.width = '100%';
                    checkoutModal.style.height = '100%';
                    checkoutModal.style.backgroundColor = 'rgba(44, 34, 30, 0.6)';
                    checkoutModal.style.display = 'flex';
                    checkoutModal.style.justifyContent = 'center';
                    checkoutModal.style.alignItems = 'center';
                    checkoutModal.style.zIndex = '1000';

                    checkoutModal.innerHTML = `
                        <div style="background: #ffffff; padding: 35px; border-radius: 6px; text-align: center; max-width: 400px; border: 1px solid #d6ccc2; box-shadow: 0 4px 12px rgba(44, 34, 30, 0.15); font-family: 'Georgia', serif;">
                            <h3 style="margin-top: 0; color: #8b4513; font-size: 1.5rem;">Checkout Complete!</h3>
                            <p style="color: #6b5b52; margin-bottom: 15px;">You have successfully checked out ${orderedBooks.length} book(s):</p>
                            <ul style="text-align: left; color: #2c221e; margin-bottom: 25px; max-height: 150px; overflow-y: auto;">
                                ${orderedBooks.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                            <button id="close-checkout-modal" style="background-color: #8b4513; color: white; border: none; padding: 10px 20px; font-family: 'Georgia', serif; border-radius: 4px; cursor: pointer; font-size: 1rem;">Done</button>
                        </div>
                    `;

                    document.body.appendChild(checkoutModal);

                    document.getElementById('close-checkout-modal').addEventListener('click', () => {
                        checkoutModal.remove();
                        window.location.reload();
                    });
                });
            });
        });
    }
});