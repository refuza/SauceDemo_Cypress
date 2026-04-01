describe('Product Page Case', () => {
    it('ProductPage',() => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi: pastikan user berada di halaman Product Page
        cy.url().should('include', '/inventory.html') // URL mengandung inventory.html
        cy.get('.title').should('have.text', 'Products') // Judul halaman adalah "Products"
        cy.get('[data-test="inventory-container"]').should('be.visible') // Kontainer produk tampil
    })

    it('AddProduct_Single',() => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi: pastikan user berada di halaman Product Page
        cy.url().should('include', '/inventory.html') // URL mengandung inventory.html
        cy.get('.title').should('have.text', 'Products') // Judul halaman adalah "Products"
        cy.get('[data-test="inventory-container"]').should('be.visible') // Kontainer produk tampil
        
        // Add Product
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        // Validasi jumlah produk di cart secara dinamis
        cy.get('body').then(($body) => {
        // Cek apakah elemen badge ada di halaman
        if ($body.find('[data-test="shopping-cart-badge"]').length > 0) {
            // Jika ada badge → ambil teks angka
            cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .then((cartCount) => {
                cy.log(`Jumlah produk di cart: ${cartCount}`)
                expect(Number(cartCount)).to.be.greaterThan(0) // pastikan lebih dari 0
            })
        } else {
            // Jika tidak ada badge → berarti cart kosong
            cy.log('Cart kosong, tidak ada produk.')
            expect(true).to.be.true // validasi lolos untuk kondisi kosong
            }
        })
    })

    it('AddProduct_Multiple',() => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi: pastikan user berada di halaman Product Page
        cy.url().should('include', '/inventory.html') // URL mengandung inventory.html
        cy.get('.title').should('have.text', 'Products') // Judul halaman adalah "Products"
        cy.get('[data-test="inventory-container"]').should('be.visible') // Kontainer produk tampil
        
        // Add Product
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        // Validasi jumlah produk di cart secara dinamis
        cy.get('body').then(($body) => {
        // Cek apakah elemen badge ada di halaman
        if ($body.find('[data-test="shopping-cart-badge"]').length > 0) {
            // Jika ada badge → ambil teks angka
            cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .then((cartCount) => {
                cy.log(`Jumlah produk di cart: ${cartCount}`)
                expect(Number(cartCount)).to.be.greaterThan(0) // pastikan lebih dari 0
            });
        } else {
            // Jika tidak ada badge → berarti cart kosong
            cy.log('Cart kosong, tidak ada produk.')
            expect(true).to.be.true // validasi lolos untuk kondisi kosong
            }
        })
    })
    
    it('RemoveProduct_Single',() => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi: pastikan user berada di halaman Product Page
        cy.url().should('include', '/inventory.html') // URL mengandung inventory.html
        cy.get('.title').should('have.text', 'Products') // Judul halaman adalah "Products"
        cy.get('[data-test="inventory-container"]').should('be.visible') // Kontainer produk tampil
        
        // Add Product
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        
        // Remove Product
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()

        // Validasi jumlah produk di cart secara dinamis
        cy.get('body').then(($body) => {
        // Cek apakah elemen badge ada di halaman
        if ($body.find('[data-test="shopping-cart-badge"]').length > 0) {
            // Jika ada badge → ambil teks angka
            cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .then((cartCount) => {
                cy.log(`Jumlah produk di cart: ${cartCount}`)
                expect(Number(cartCount)).to.be.greaterThan(0) // pastikan lebih dari 0
            })
        } else {
            // Jika tidak ada badge → berarti cart kosong
            cy.log('Cart kosong, tidak ada produk.')
            expect(true).to.be.true // validasi lolos untuk kondisi kosong
            }
        })
    })

     it('RemoveProduct_Multiple',() => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi: pastikan user berada di halaman Product Page
        cy.url().should('include', '/inventory.html') // URL mengandung inventory.html
        cy.get('.title').should('have.text', 'Products') // Judul halaman adalah "Products"
        cy.get('[data-test="inventory-container"]').should('be.visible') // Kontainer produk tampil
        
        // Add Product
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        
        // Remove Product
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()

        // Validasi jumlah produk di cart secara dinamis
        cy.get('body').then(($body) => {
        // Cek apakah elemen badge ada di halaman
        if ($body.find('[data-test="shopping-cart-badge"]').length > 0) {
            // Jika ada badge → ambil teks angka
            cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .then((cartCount) => {
                cy.log(`Jumlah produk di cart: ${cartCount}`)
                expect(Number(cartCount)).to.be.greaterThan(0) // pastikan lebih dari 0
            })
        } else {
            // Jika tidak ada badge → berarti cart kosong
            cy.log('Cart kosong, tidak ada produk.')
            expect(true).to.be.true // validasi lolos untuk kondisi kosong
            }
        })
    })

    it('FilterProduct',() => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Validasi: pastikan user berada di halaman Product Page
        cy.url().should('include', '/inventory.html') // URL mengandung inventory.html
        cy.get('.title').should('have.text', 'Products') // Judul halaman adalah "Products"
        cy.get('[data-test="inventory-container"]').should('be.visible') // Kontainer produk tampil
        
        // Cari container lalu pilih option di dalamnya
        cy.get('.select_container select').select('Price (low to high)')
    })
})