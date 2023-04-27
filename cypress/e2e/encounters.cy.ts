describe('Testing the flow of Enounters menu', () => {
     it('Encounters Flow Checking', () => {
          cy.visit('/')
          cy.get('#name').type('drindia20')
          cy.screenshot('logo');

          cy.get('#password').type('Test1234')
          cy.get('.allign').click()
          cy.wait(2000)
          cy.url().should('includes', '/dashboard/patient')
          cy.get('a.ng-tns-c53-0').click()
          cy.wait(5000)
          cy.get('.waitingroom').click({ force: true })
          cy.wait(5000)
          // cy.get("datatable-header[role='rowgroup']")
          // .invoke('css', 'overflow', 'visible');
          cy.get('.datatable-row-center.datatable-row-group.ng-star-inserted')
               .eq(1)
               .click({ force: true });
          cy.wait(2000);
          cy.get('.datatable-body-row').should('exist')
          cy.get('datatable-body-row').eq(1).within(() => {
               cy.get('.datatable-body-cell:nth-child(1)').should('have.text', ' Hey He do ').click({ force: true });;
          });
          cy.screenshot('iframe images');
          cy.get('.user-picture.image.ng-star-inserted').screenshot('provider')
     })
})