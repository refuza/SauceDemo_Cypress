describe('CO Your Info', () => {
  
    it('Successfully continue to CO Page', () => {
        // Login
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi halaman produk
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('have.text', 'Products')

        // Tambahkan produk secara dinamis
        cy.get('[data-test^="add-to-cart"]').then(($buttons) => {
            const productsToAdd = 3 // jumlah produk yang ingin ditambahkan

            // Klik tombol sesuai jumlah yang diinginkan
            for (let i = 0; i < productsToAdd; i++) {
            cy.wrap($buttons[i]).click()
            }

            // Validasi badge cart sesuai jumlah produk
            cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', String(productsToAdd))

            // Buka cart
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')

            // Validasi jumlah item di cart sesuai jumlah produk
            cy.get('[data-test="inventory-item"]').should('have.length', productsToAdd)
        })

        // Checkout
        cy.get('[data-test="checkout"]').click()
        cy.url().should('include', '/checkout-step-one.html')
        cy.get('.title').should('have.text', 'Checkout: Your Information')

        //input Name-zip
        cy.get('[data-test="firstName"]').type('Aldi')
        cy.get('[data-test="lastName"]').type('Pol')
        cy.get('[data-test="postalCode"]').type('17')
        cy.get('[data-test="continue"]').click()
    })

    it('Failed To Conitnue_Not Input 1 Field', () => {
        // Login
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi halaman produk
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('have.text', 'Products')

        // Tambahkan produk secara dinamis
        cy.get('[data-test^="add-to-cart"]').then(($buttons) => {
            const productsToAdd = 3 // jumlah produk yang ingin ditambahkan

            // Klik tombol sesuai jumlah yang diinginkan
            for (let i = 0; i < productsToAdd; i++) {
            cy.wrap($buttons[i]).click()
            }

            // Validasi badge cart sesuai jumlah produk
            cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', String(productsToAdd))

            // Buka cart
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')

            // Validasi jumlah item di cart sesuai jumlah produk
            cy.get('[data-test="inventory-item"]').should('have.length', productsToAdd)
        })

        // Checkout
        cy.get('[data-test="checkout"]').click()
        cy.url().should('include', '/checkout-step-one.html')
        cy.get('.title').should('have.text', 'Checkout: Your Information')

        //input Name-zip
        cy.get('[data-test="firstName"]').type('Aldi')
        cy.get('[data-test="postalCode"]').type('17')
        cy.get('[data-test="continue"]').click()

        //error message
        cy.get('.error-message-container').should('have.text','Error: Last Name is required')

    })

    
    it('Successfully Cancel CO', () => {
        // Login
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi halaman produk
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('have.text', 'Products')

        // Tambahkan produk secara dinamis
        cy.get('[data-test^="add-to-cart"]').then(($buttons) => {
            const productsToAdd = 3 // jumlah produk yang ingin ditambahkan

            // Klik tombol sesuai jumlah yang diinginkan
            for (let i = 0; i < productsToAdd; i++) {
            cy.wrap($buttons[i]).click()
            }

            // Validasi badge cart sesuai jumlah produk
            cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', String(productsToAdd))

            // Buka cart
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')

            // Validasi jumlah item di cart sesuai jumlah produk
            cy.get('[data-test="inventory-item"]').should('have.length', productsToAdd)
        })

        // Checkout
        cy.get('[data-test="checkout"]').click()
        cy.url().should('include', '/checkout-step-one.html')
        cy.get('.title').should('have.text', 'Checkout: Your Information')

        cy.get('[data-test="cancel"]').click()
        cy.url().should('include', '/cart.html')
        cy.get('[data-test="title"]').should('have.text', 'Your Cart')
    })
})