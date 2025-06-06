describe('Form Demo Test', () => {
  it('Navigate to demo section', () => {
    cy.visit('http://localhost:3000/form-demo-nav-link');
  });

  it('Verify default value content', () => {
    cy.get('#age').first().should('have.value', 'Five');
  });

  it('Verify labelInfo structure', () => {
    cy.get('#form-group-age .pf-v6-c-form__group-label.pf-m-info').should('exist');
    cy.get('#form-group-age .pf-v6-c-form__group-label-main').should('exist');
    cy.get('#form-group-age .pf-v6-c-form__group-label-info').should('exist');
  });

  it('Verify form allows correct input', () => {
    cy.get('#age').first().clear().type('5');
    cy.get('.pf-v6-c-helper-text').contains('Please write your age');
  });

  it('Verify form identifies input error', () => {
    cy.get('#age').first().clear().type('Something');
    cy.get('.pf-v6-c-helper-text').contains('Age has to be a number');
  });

  it('Verify section titles rendering with correct component', () => {
    cy.get('h4.pf-v6-c-form__section-title').contains('Title');
  });

  it('Verify form validates form group', () => {
    cy.get('.pf-m-success > #age-validated').should('not.exist');
    cy.get('.pf-v6-c-helper-text').contains('Enter age');
    // type string that is not a number so it is invalid
    cy.get('#age-validated').type('hi');
    cy.get('#age-validated').should('have.value', 'hi');
    cy.get('#age-validated').then((textinput) => {
      expect(textinput.attr('aria-invalid')).to.be.equal('true');
    });
    cy.get('.pf-v6-c-helper-text__item.pf-m-error').contains('Age must be a number');
    cy.get('#age2-helper .pf-m-error').should('exist');
    // Clear text input and enter valid number
    cy.get('#age-validated').clear().type('34').should('have.value', '34');
    cy.get('#age2-helper .pf-m-success').should('exist');
    cy.get('.pf-m-success > #age-validated').should('exist');
    cy.get('.pf-v6-c-helper-text__item.pf-m-success').contains('Enter age');
    cy.get('#age-validated').then((textinput) => {
      expect(textinput.attr('aria-invalid')).to.be.equal('false');
    });
    cy.get('#age-validated').clear();
    cy.get('#age2-helper .pf-m-warning').should('exist');
    cy.get('#age-validated').then((textinput) => {
      expect(textinput.attr('aria-invalid')).to.be.equal('false');
    });
  });

  it('Verify form group label has no top spacer', () => {
    cy.get('.pf-v6-c-form__group-label').should('have.class', 'pf-m-no-padding-top');
  });

  xit('Verify selecting the form label help icon with click launches popover', () => {
    cy.get('#helper-text-target').click();
    cy.get('.pf-v6-c-popover').should('exist');
    cy.get('[aria-label="Close"]').click();
  });

  xit('Verify selecting the form label help icon with keypress launches popover', () => {
    cy.get('#helper-text-target').type('{enter}');
    cy.get('.pf-v6-c-popover').should('exist');
    cy.get('[aria-label="Close"]').type('{enter}');
  });

  it('Verify keypress can control the multi-select-typeahead', () => {
    cy.get('.pf-v6-c-menu-toggle').type('{downarrow}{downarrow}{enter}');
    cy.get('.pf-v6-c-label__text').should('exist').and('have.text', 'Florida');

    cy.get('.pf-v6-c-label button').click();

    cy.get('.pf-v6-c-text-input-group__text-input').click().type('New J');

    cy.get('.pf-v6-c-menu__item').should('exist').and('have.text', 'New Jersey');
    cy.focused().type('{backspace}{backspace}{backspace}{backspace}orth');
    cy.get('.pf-v6-c-menu__item').should('exist').and('have.text', 'North Carolina');
    cy.focused().type('{backspace}{backspace}{backspace}{backspace}{backspace}');

    // @ts-ignore
    cy.tab();
    cy.get('.pf-v6-c-menu__item').should('not.exist');
  });

  it('Verify pressing spacebar selects the checkbox component', () => {
    const $checkbox = cy.get('#subscribe');
    $checkbox.should('not.be.checked').focus();
    $checkbox.type(' ');
    $checkbox.should('be.checked');
    $checkbox.type(' '); // should be unchecked but isn't
    // $checkbox.should('not.be.checked');
  });
});
