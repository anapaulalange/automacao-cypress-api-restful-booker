Cypress.Commands.add('api_booking_autenticacao', (username,password) => {
    cy.request({
                method: 'POST',
                url: 'https://restful-booker.herokuapp.com/auth',
                body: {
                        "username" : username,
                        "password" : password   
                },
                failOnStatusCode: false
            }).then((response)=>{
                return response
            });   
})

Cypress.Commands.add('api_inclusao', (payloadAddBooking) => {
    cy.request({
                method: 'POST',
                url: 'https://restful-booker.herokuapp.com/booking',
                body: payloadAddBooking,
                failOnStatusCode: false
            }).then((response)=>{
                return response
            });                
})