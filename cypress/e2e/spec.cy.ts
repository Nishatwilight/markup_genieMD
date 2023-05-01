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
        cy.request({
          method: 'POST',
          url: 'http://localhost:4200/ivisit.ComV5.00/resources/Pateint/PatientsList', 
          headers: {
            token: token,
          },
          body: patientList
        }).then((response) => {
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
  })


 