class LoginPage {

  visit() {
    cy.visit('https://saucedemo.com')
  }

  inputUsername(username) {
    cy.get('[data-test="username"]').type(username)
  }

  inputPassword(password) {
    cy.get('[data-test="password"]').type(password)
  }

  clickLogin() {
    cy.get('[data-test="login-button"]').click()
  }

  login(username, password) {
    this.inputUsername(username)
    this.inputPassword(password)
    this.clickLogin()
  }

}

export default new LoginPage()