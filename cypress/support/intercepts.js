export const ignoreMonitoring = () => {
  cy.intercept('POST', 'https://events.backtrace.io/**', {
    statusCode: 200
  })
}