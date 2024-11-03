describe('SignInPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin');
  });

  it('should sign in successfully and show "Signing In..." on the button', () => {
    cy.get('input[name="login"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').contains('Signing In...');
    cy.url().should('include', '/dashboard');
    cy.contains('Hours Worked');
  });
});
