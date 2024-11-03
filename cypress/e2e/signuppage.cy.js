describe('SignUpPage', () => {
  let uniqueEmail;

  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
    const randomSuffix = Math.floor(Math.random() * 1000000);
    uniqueEmail = `testuser${randomSuffix}@gmail.com`;
  });

  it('should register a user successfully', () => {
    cy.get('input[name="login"]').type(uniqueEmail);
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('User');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard'); 
    cy.contains('Hours Worked').should('exist'); 
  });
});
