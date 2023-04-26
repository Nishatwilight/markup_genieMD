describe('Checking path ffor the patient', ()=>{
 it.skip('Test1', ()=>{
  cy.visit('/')
  cy.get('#name').type('drindia20')
  cy.get('#password').type('Test1234')
  cy.get('.allign').click()
  cy.url().should('includes','dashboard/patient')
  cy.wait(1000)
  // cy.get('.bootstrap').click()
  // cy.wait(3000)
  cy.get('#searching').type('New one')
  cy.get('#check').click()
  cy.url().should('contain','/dashboard/patient/news1')
  cy.wait(5000)
  // cy.title().should('eq', 'Assessments').should('include', 'Assessments').click()
  cy.get('.tab-link').eq(4).should('contain', 'Assessments').click()
  cy.go('back')
  cy.get('.tab-link').eq(1).should('contain', 'Snapshot').click()
  cy.get("a[title='Logout']").click()

 })



  it('should get user data from API', () => {

   cy.visit('/')
   cy.get('#name').type('drindia20')
   cy.get('#password').type('Test1234')
   cy.get('.allign').click()
   cy.url().should('includes','dashboard/patient')
   cy.wait(1000)
   getPatients()
  //  cy.get('#searching').type('New one')

 });
})

 function getPatients() {
  cy.intercept('GET', `${Cypress.env('api')}/Pateint/PatientsList`, {
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


