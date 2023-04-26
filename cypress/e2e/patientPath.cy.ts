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
   getPatients()

   cy.url().should('eq','http://localhost:4200/#/provider/c98218881cca47068e869e50ac103bc5/dashboard/patient')
   cy.wait(1000)
   cy.get('#searching').type('a a')

 });
})

 function getPatients() {
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


// describe('User Table', () => {
//   beforeEach(() => {
//     cy.visit('/user-table'); // Replace with the URL of your page containing the user table
//   });

//   it('should navigate to the correct user URL when a row is clicked', () => {
//     const userId = '123'; // Replace with the user ID you want to test

//     cy.get(`tr[data-user-id="${userId}"]`) // Select the table row with the specified user ID
//       .click(); // Click on the row

//     cy.url().should('include', `/user/${userId}`); // Assert that the URL contains the expected user ID
//   });
// });