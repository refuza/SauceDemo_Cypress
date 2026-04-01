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
})