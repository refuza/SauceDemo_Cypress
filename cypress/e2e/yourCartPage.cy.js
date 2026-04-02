describe('Your Cart Page', () => {
  
    it('CartPage_PP_Empty', () => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi halaman produk
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('have.text', 'Products')
        cy.get('[data-test="inventory-container"]').should('be.visible')

        // Validasi jumlah produk di cart secara dinamis
        cy.get('body').then(($body) => {
            const badge = $body.find('[data-test="shopping-cart-badge"]')

            if (badge.length > 0) {
            // Jika ada badge → ambil angka
            const cartCount = Number(badge.text())
            cy.log(`Jumlah produk di cart: ${cartCount}`)
            expect(cartCount).to.be.greaterThan(0)

            // Buka cart dan validasi jumlah item sesuai badge
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')
            cy.get('[data-test="inventory-item"]').should('have.length', cartCount)
            } else {
            // Jika tidak ada badge → cart kosong
            cy.log('Cart kosong, tidak ada produk.')
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')
            cy.get('[data-test="inventory-item"]').should('have.length', 0)
            }
        })
    })

    it('CartPage_PP_Added', () => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi halaman produk
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('have.text', 'Products')

        // Ambil semua tombol "Add to cart" secara dinamis
        cy.get('[data-test^="add-to-cart"]').then(($buttons) => {
            const productsToAdd = 2 // jumlah produk yang ingin ditambahkan

            // Klik sesuai jumlah yang diinginkan
            for (let i = 0; i < productsToAdd; i++) {
            cy.wrap($buttons[i]).click()
            }

            // Validasi badge cart sesuai jumlah produk yang ditambahkan
            cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', String(productsToAdd))

            // Buka cart
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')

            // Validasi jumlah item di cart sesuai jumlah produk yang ditambahkan
            cy.get('[data-test="inventory-item"]').should('have.length', productsToAdd)
        })
    })

    it('CartPage_PDP_Empty', () => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi halaman produk
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('have.text', 'Products')
        cy.get('[data-test="inventory-container"]').should('be.visible')

        // Buka salah satu produk dari PDP (contoh Backpack)
        cy.get('[data-test="item-4-title-link"]').click()

        // Validasi jumlah produk di cart secara dinamis
        cy.get('body').then(($body) => {
            const badge = $body.find('[data-test="shopping-cart-badge"]')

            if (badge.length > 0) {
            // Jika ada badge → ambil angka
            const cartCount = Number(badge.text())
            cy.log(`Jumlah produk di cart: ${cartCount}`)
            expect(cartCount).to.be.greaterThan(0)

            // Buka cart dan validasi jumlah item sesuai badge
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')
            cy.get('[data-test="inventory-item"]').should('have.length', cartCount)
            } else {
            // Jika tidak ada badge → cart kosong
            cy.log('Cart kosong, tidak ada produk.')
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')
            cy.get('[data-test="inventory-item"]').should('have.length', 0)
            }
        })
    })

    it('CartPage_PDP_Added', () => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi halaman produk
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('have.text', 'Products')
        cy.get('[data-test="inventory-container"]').should('be.visible')

        // Masuk ke salah satu PDP (contoh Backpack)
        cy.get('[data-test="item-4-title-link"]').click()

        // Tambahkan produk dari PDP
        cy.get('[data-test="add-to-cart"]').click()

        // Validasi jumlah produk di cart secara dinamis
        cy.get('body').then(($body) => {
            const badge = $body.find('[data-test="shopping-cart-badge"]')

            if (badge.length > 0) {
            // Jika ada badge → ambil angka
            const cartCount = Number(badge.text())
            cy.log(`Jumlah produk di cart: ${cartCount}`)
            expect(cartCount).to.be.greaterThan(0)

            // Buka cart dan validasi jumlah item sesuai badge
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')
            cy.get('[data-test="inventory-item"]').should('have.length', cartCount)
            } else {
            // Jika tidak ada badge → cart kosong
            cy.log('Cart kosong, tidak ada produk.')
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')
            cy.get('[data-test="inventory-item"]').should('have.length', 0)
            }
        })
    })

    it('CartPage_BacktoPP', () => {
        // Login
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi halaman produk
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('have.text', 'Products')

        // Ambil semua tombol "Add to cart" secara dinamis
        cy.get('[data-test^="add-to-cart"]').then(($buttons) => {
            const productsToAdd = 2 // jumlah produk yang ingin ditambahkan

            // Klik sesuai jumlah yang diinginkan
            for (let i = 0; i < productsToAdd; i++) {
            cy.wrap($buttons[i]).click()
            }

            // Validasi badge cart sesuai jumlah produk yang ditambahkan
            cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', String(productsToAdd))

            // Buka cart
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.url().should('include', '/cart.html')
            cy.get('[data-test="title"]').should('have.text', 'Your Cart')

            // Validasi jumlah item di cart sesuai jumlah produk yang ditambahkan
            cy.get('[data-test="inventory-item"]').should('have.length', productsToAdd)
        })

        // Klik tombol "Continue Shopping" untuk kembali ke Product Page
        cy.get('[data-test="continue-shopping"]').click()
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('have.text', 'Products')
    })

    it('CartPage_RemoveProduct', () => {
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

            // Hapus produk secara dinamis (misalnya hapus 2 produk pertama)
            cy.get('[data-test^="remove"]').then(($removeButtons) => {
            const productsToRemove = 1

            for (let i = 0; i < productsToRemove; i++) {
                cy.wrap($removeButtons[i]).click()
            }

            // Validasi jumlah item setelah penghapusan
            const expectedRemaining = productsToAdd - productsToRemove
            cy.get('[data-test="inventory-item"]').should('have.length', expectedRemaining)

            // Validasi badge cart sesuai jumlah produk tersisa
            if (expectedRemaining > 0) {
                cy.get('[data-test="shopping-cart-badge"]')
                .should('have.text', String(expectedRemaining))
            } else {
                cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
            }
            })
        })
    })  
    
    it('CartPage_Continue', () => {
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

            // Hapus produk secara dinamis
            cy.get('[data-test^="remove"]').then(($removeButtons) => {
            const productsToRemove = 1 // jumlah produk yang ingin dihapus

            for (let i = 0; i < productsToRemove; i++) {
                cy.wrap($removeButtons[i]).click()
            }

            // Validasi jumlah item setelah penghapusan
            const expectedRemaining = productsToAdd - productsToRemove
            cy.get('[data-test="inventory-item"]').should('have.length', expectedRemaining)

            // Validasi badge cart sesuai jumlah produk tersisa
            if (expectedRemaining > 0) {
                cy.get('[data-test="shopping-cart-badge"]')
                .should('have.text', String(expectedRemaining))
            } else {
                cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
            }
            })

            // Checkout
            cy.get('[data-test="checkout"]').click()
            cy.url().should('include', '/checkout-step-one.html')
            cy.get('.title').should('have.text', 'Checkout: Your Information')
        })
    })
})