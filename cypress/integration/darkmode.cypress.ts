describe('Dark Mode Test', () => {
  it('clicks the "Dark Mode" toggle', () => {
    cy.visit('/');

    cy.get('body').should('not.have.class', 'awsui-dark-mode');

    cy.contains('Dark Mode').click();
    cy.get('body').should('have.class', 'awsui-dark-mode');
  });
});
