describe('Testing the flow of Enounters menu', () => {
    //Before Hook
     before('screenshort the logo Before',()=>{
          cy.visit('/')
          cy.wait(1000)
           cy.screenshot('Before TestCase run : logo');
     })
     //After Hook
     after('screenshort the logo After',()=>{
        cy.xpath("//nb-card[@class='col-12 mx-auto col-md-10']").screenshot('After TestCase run getting id: logo');
    })
     //BeforeEach
     beforeEach('Login before each test case', ()=>{
          cy.visit('/')
          cy.get('#name').type('drindia20')
          cy.get('#password').type('Test1234')
          cy.get('.allign').click()
          cy.wait(2000)
          cy.url().should('includes', '/dashboard/patient')
          cy.wait(3000)
     })

     //AfterEach
     afterEach('logout after each test',()=>{
              cy.get("a[title='Logout']").click()
     })
      

     // TestCase 1

     it.skip('Encounters Flow Checking', () => {
          cy.get('a.ng-tns-c53-0').click()
          cy.wait(3000)
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
               cy.wait(2000)
               cy.get('.datatable-body-cell:nth-child(1)').should('have.text', ' hill Test ').click({ force: true });;
          });
          cy.wait(5000)
          cy.screenshot('iframe images');
          cy.get('.user-picture.image.ng-star-inserted').screenshot('provider')
     })

     //TestCase -2 

     it('test form', ()=>{
          cy.xpath("//div[normalize-space()='hill Test']//div[@id='check']").click()
          cy.wait(4000)
          cy.xpath("//*[name()='g' and contains(@data-name,'plus-circl')]//*[name()='rect' and contains(@width,'24')]").click({force: true})
          cy.wait(2000)
          cy.get('#username').type('Testing')
          cy.get('#pass').type('Test@asas123', {delay: 500})
          

          cy.wait(2000)
          cy.get('#pass').clear()
          cy.wait(2000)
          cy.get('#pass').type('A$' , {delay: 1000})


          cy.xpath("//*[name()='g' and contains(@data-name,'close')]//*[name()='rect' and contains(@width,'24')]").click({force: true})
          // cy.get('.display > .status-success').click()

     })
})