describe('Testing the flow of Patient menu', ()=>{
 it('patientMenu Flow Checking',()=>{
  cy.visit('http://localhost:4200/#/auth/login')
  cy.get('#name').type('drindia20')
  cy.wait(3000)
  cy.get('#password').type('Test1234')
  cy.wait(3000)

  cy.get('.allign.appearance-filled.full-width.size-medium.shape-rectangle.status-primary.nb-transition').click()
  cy.wait(3000)


  //  Doubt

//   cy.request({
//    method: 'POST',
//    url: 'http://localhost:4200/ivisit.ComV5.00/resources/Email/SignIn/'
//    }).as('datas')
//    cy.get('@datas').then((res) => {
//    cy.wrap(res).its('status').should('eq', 200)
//   })
cy.url().should('includes', '/dashboard/patient')
    

cy.wait(5000) // wait for 5 seconds
cy.get('.datatable-body-row').should('exist')
cy.wait(3000)

 cy.get('datatable-body-row').eq(0).within(() => {
    cy.get('.datatable-body-cell:nth-child(1)').should('have.text', ' Test Dos ').click();;
  });
  cy.wait(3000)
  cy.go('back')

  cy.wait(3000)

// SEARCH METHOD

  cy.get('#searching').type('a a')
  cy.wait(3000)

  cy.get('#check').click()
  cy.wait(3000)
  cy.go('back')

  cy.wait(3000)

  // SELECT THE ELEMENT

  cy.get('datatable-body-row').eq(1).within(() => {
    cy.get('.datatable-body-cell:nth-child(1)').should('have.text', ' New one ')
    cy.wait(2000)
    cy.get('.datatable-body-cell:nth-child(3)').should('have.text', ' mo@geniemd.com ').click()
  });
    cy.wait(2000)
    cy.get('.tab-link').eq(4).should('contain', 'Assessments').click()
    cy.wait(2000)
    cy.go('back')
    cy.get('.tab-link').eq(1).should('contain', 'Snapshot').click()
    cy.wait(2000)
    // cy.get("a[title='Logout']").click()
    cy.get('a.ng-tns-c53-8 ').click()
 }) 
})


function getPatientss() {
    cy.intercept('POST', `${Cypress.env('api')}/Pateint/PatientsList`, {
      statusCode: 200,
      body: [
       {"total":42,"count":17,"list":[
        {
          "firstName": "AHA",
          "lastName": "Core",
          "email": "core@yopmail.com",
          "dob": "1985-12-12",
          "monitors": "",
          "careManagers": "Aaron Berman,Aaron Berman,Aaron Berman,Aaron Berman,Aaron Berman,",
          "providers": "Test Provider",
          "morbidities": "",
          "ethnicity": "",
          "middle": "",
          "race": "",
          "nationality": "",
          "position": "",
          "language": 1,
          "gender": 0,
          "enrollmentDate": 1665641895000,
          "monitored": true,
          "consent": "https://geniemd-generalfiles.s3.amazonaws.com/f0f1cf2dedcc431194a531f4d5841f36.pdf?AWSAccessKeyId=AKIAIZH5KUW5NWRU5FDQ&Expires=1983807674&Signature=nX6%2FhQS0GSMB4IHqzFYlwOOjdOQ%3D",
          "patientID": "core",
          "phoneNumber": "9585062063",
          "emrID": ""
        },
        {
          "firstName": "New",
          "lastName": "one",
          "email": "mo@geniemd.com",
          "dob": "1990-05-12",
          "monitors": "",
          "careManagers": "Aaron Berman,Aaron Berman,",
          "providers": "New Provider IndiaNew Provider India,",
          "morbidities": "",
          "ethnicity": "",
          "middle": "S",
          "race": "",
          "nationality": "",
          "position": "",
          "language": 1,
          "gender": 0,
          "enrollmentDate": 1665681921000,
          "monitored": true,
          "consent": "https://geniemd-generalfiles.s3.amazonaws.com/b426b2abb8204ebb9ae7e8aa4336cebe.pdf?AWSAccessKeyId=AKIAIZH5KUW5NWRU5FDQ&Expires=1983807544&Signature=s%2FvQv4gAW9LMkbnR4pqXDv7ZQBk%3D",
          "patientID": "news1",
          "phoneNumber": "9258184697",
          "emrID": ""
        },
       ]}
      ],
    });
  } 