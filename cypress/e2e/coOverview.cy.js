describe('Checkout Overview Page', () => {
  
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

        cy.get('[data-test="cart-list"]').should('not.be.empty')

        //Variable penampung
        let sum = 0
        // Hitung semua harga produk
        cy.get('[data-test="cart-list"] .inventory_item_price').each(($el) => {
            const priceText = $el.text().replace('$', '')
            const price = parseFloat(priceText)
            sum += price
        }).then(() => {
        // Ambil nilai pajak
            cy.get('[data-test="tax-label"]').invoke('text').then((taxText) => {
                const tax = parseFloat(taxText.replace('Tax: $', ''))

                // Ambil total label
                cy.get('[data-test="total-label"]').invoke('text').then((totalText) => {
                const totalValue = parseFloat(totalText.replace('Total: $', ''))
                // Bandingkan total dengan sum + tax
                expect(totalValue).to.eq(sum + tax)
              })
            })
        })
    })

    it('Canceled to continue CO', () => {
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
        //Verifikasi product dalam cart tidak kosong
        cy.get('[data-test="cart-list"]').should('not.be.empty')

        //Verifikasi halaman
        cy.get('[data-test="cancel"]').click()
        cy.url().should('include', '/inventory.html')
        cy.get('[data-test="title"]').should('have.text','Products')
    })
})