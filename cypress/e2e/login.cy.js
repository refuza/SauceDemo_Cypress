describe('Login Cases', () => {
  
  it('Successfully Login', () => {
    // Kunjungi halaman utama
    cy.visit('https://saucedemo.com');

    // Input username & password valid
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    // Klik tombol login
    cy.get('[data-test="login-button"]').click();
  });

  it('Failed Login - Invalid Account', () => {
    cy.visit('https://saucedemo.com');

    // Input username & password salah
    cy.get('[data-test="username"]').type('standard_');
    cy.get('[data-test="password"]').type('secret_');
    cy.get('[data-test="login-button"]').click();

    // Validasi pesan error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('Failed Login - Locked Account', () => {
    cy.visit('https://saucedemo.com');

    // Input akun yang terkunci
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Validasi pesan error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('Failed Login - Empty Username & Password', () => {
    cy.visit('https://saucedemo.com');

    // Klik login tanpa input apapun
    cy.get('[data-test="login-button"]').click();

    // Validasi pesan error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Username is required');
  });

  it('Failed Login - Empty Username Only', () => {
    cy.visit('https://saucedemo.com');

    // Input hanya password
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Validasi pesan error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Username is required');
  });

  it('Failed Login - Empty Password Only', () => {
    cy.visit('https://saucedemo.com');

    // Input hanya username
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="login-button"]').click();

    // Validasi pesan error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Password is required');
  });

});