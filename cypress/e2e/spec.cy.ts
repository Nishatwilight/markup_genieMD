describe('My First Test', () => {
  it.skip('Visits the initial project page', () => {
    cy.visit('https://dummy.restapiexample.com/')
    // cy.title().should('eq', 'RPM PROJECT')  
    // cy.get('#name').type('drindia20').then(()=>{
    //   cy.get('#password').type('Test1234').then(()=>{
    //     cy.get('.allign').click()
    //     cy.wait(5000)
    //   })
    // })
    cy.request('GET', 'https://dummy.restapiexample.com/api/v1/employees')

  })
  it('Visits the API', () => {
    cy.visit('/')
    cy.title().should('eq', 'RPM PROJECT')
    cy.get('#name').type('drindia20').then(() => {
      cy.get('#password').type('Test1234').then(() => {
        cy.get('.allign').click()
        cy.wait(2000)
      })
    })
    const test = {"email":"drindia20","password":"Test1234"}
    cy.request('POST', 'http://localhost:4200/ivisit.ComV5.00/resources/Email/SignIn/', test).then( (res)=>{

      var userID = res.body.userID
      cy.log(userID)
      cy.visit(`http://localhost:4200/#/provider/${userID}/dashboard/patient`);
      cy.request('GET', `http://localhost:4200/ivisit.ComV5.00/resources/Profile/${userID}`).then((res1)=>{
        const userName = res1.body.userName 
        const token = res1.body.userID
        cy.log(token)
        cy.wait(5000)
        const patientList = {
          "clinicID": "1000254",
          "firstName": "",
          "lastName": "",
          "term": "",
          "gender": "",
          "dob": "",
          "page": 2,
          "count": 25,
          "providerID": userName,
          "careManagerID": "",
          "monitored": -1,
          "sortColumn": "",
          "sortDirection": 0
        }
        getPatients()

        cy.request({
          method: 'POST',
          url: 'http://localhost:4200/ivisit.ComV5.00/resources/Pateint/PatientsList', 
          headers: {
            token: token,
          },
          body: patientList,
        }).then((response) => {
          const list = response.body.list
          cy.log(response.body.list).as('patientList')
          if (response.status === 401) {
            // Handle unauthorized error here
            cy.log('Unauthorized error:', response.body)
          } else if (response.status === 400) {
            // Handle bad request error here
            cy.log('Bad request error:', response.body)
          } else {
            // Handle successful response here
            cy.log('Successful response:', response.body)
          }
        })

      })

      })
 
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
  })

