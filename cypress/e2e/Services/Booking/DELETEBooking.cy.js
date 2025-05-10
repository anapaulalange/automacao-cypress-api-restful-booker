/// <reference types="cypress" />

let token

const payloadAddBooking = require('../../../fixtures/add-booking.json')

describe('DELETE Booking', () => {

    it('Geração do Token', () => {
            cy.request({
                method: 'POST',
                url: 'https://restful-booker.herokuapp.com/auth',
                body: {
                        "username" : "admin",
                        "password" : "password123"
                    
                },
                failOnStatusCode: false
            }).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.body).to.be.not.null;
                expect(response.body.token).to.be.an("string");
                
                token = response.body.token
                cy.log("Your token is: "+ token)
            });            
    });  

    it('Valida exclusao de reserva - 201', () => {      
            cy.request({
                        method: 'DELETE',
                        url: 'https://restful-booker.herokuapp.com/booking/1',
                        headers: {
                                    'content-type': 'application/json',
                                    'accept' : 'application/json',
                                    'cookie' : `token=${token}`
                                },
                        body: payloadAddBooking,
                        failOnStatusCode: false,
            }).then((response)=>{
                expect(response.status).to.equal(201);
            })
    });   

    it('Valida reserva não encontrada após exclusão - 404', () => {
            cy.request({
                        method: 'GET',
                        failOnStatusCode: false,
                        url: 'https://restful-booker.herokuapp.com/booking/1',
                        }).then((response)=>{
                            expect(response.status).to.equal(404);
            });
    }); 
});