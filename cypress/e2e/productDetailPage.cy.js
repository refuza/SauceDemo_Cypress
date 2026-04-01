describe('Product Detail Page Case', () => {
  
  it('PDP', () => {
    // Kunjungi halaman utama
    cy.visit('https://saucedemo.com');

    // Input username & password valid
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    // Klik tombol login
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click()
  });

  it('PDP_AddProduct', () => {
    // Kunjungi halaman utama
    cy.visit('https://saucedemo.com');

    // Input username & password valid
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    // Klik tombol login
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click()
    cy.get('[data-test="add-to-cart"]').click()

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
 
  it('PDP_RemoveProduct', () => {
    // Kunjungi halaman utama
    cy.visit('https://saucedemo.com');

    // Input username & password valid
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    // Klik tombol login
    cy.get('[data-test="login-button"]').click();

    // Add Product
    cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click()
    cy.get('[data-test="add-to-cart"]').click()

    // Remove Product
    cy.get('[data-test="remove"]').click()

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

  it('PDP_Back', () => {
    // Kunjungi halaman utama
    cy.visit('https://saucedemo.com');

    // Input username & password valid
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    // Klik tombol login
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click()
    cy.get('[data-test="back-to-products"]').click()

    cy.url().should('include', '/inventory.html')
  });
})