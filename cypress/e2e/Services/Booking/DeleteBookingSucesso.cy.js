/// <reference types="cypress" />

let token
let bookId
const payloadAddBooking = require('../../../fixtures/add-booking.json')

describe('DELETE Booking', () => {

    it('Geracao do Token', () => {
            cy.api_booking_autenticacao('admin','password123').then((response) => {
                token = response.body.token
                cy.log("Your token is: "+ token)
            }); 
    }); 

    it('Valida cenário de cadastro de nova reserva', () => {
            cy.api_inclusao(payloadAddBooking).then((response)=>{
                bookId = response.body.bookingid
                cy.log("Your Booking ID is: "+ bookId)
            })  
    });   

    it('Valida exclusao de reserva - 201', () => {      
            cy.request({
                        method: 'DELETE',
                        url: 'https://restful-booker.herokuapp.com/booking/'+bookId,
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
                        url: 'https://restful-booker.herokuapp.com/booking/'+bookId,
                        }).then((response)=>{
                            expect(response.status).to.equal(404);
            });
    }); 
});