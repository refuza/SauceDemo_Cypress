describe('Logout case', () => {
  
  it('Successfully Logout', () => {
    // Kunjungi halaman utama
    cy.visit('https://saucedemo.com')

    // Input username & password valid
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')

    // Klik tombol login
    cy.get('[data-test="login-button"]').click()

    // Verifikasi halaman tujuan
    cy.url().should('include','/inventory.html')
    cy.get('[data-test="title"]').should('have.text','Products')
    // Open Side Bar
    cy.get('#react-burger-menu-btn').click()
    // Berhasil logout
    cy.get('[data-test="logout-sidebar-link"]').click()
  })

})