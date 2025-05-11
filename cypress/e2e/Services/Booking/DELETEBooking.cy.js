/// <reference types="cypress" />

let token
let bookId
const payloadAddBooking = require('../../../fixtures/add-booking.json')

describe('DELETE Booking', () => {

    it('Geração do Token', () => {
            cy.api_booking_autenticacao('admin','password123').then((response) => {
                token = response.body.token
                cy.log("Your token is: "+ token)
            }); 
    }); 

    it('Valida cenário de inclusão de nova reserva', () => {
        cy.api_inclusao(payloadAddBooking).then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body).to.be.not.null;
            expect(response.body).to.be.an("object");
            expect(response.body.bookingid).to.be.an("number");
            expect(response.body.booking.firstname).to.be.an("string");
            expect(response.body.booking.lastname).to.be.an("string");
            expect(response.body.booking.totalprice).to.be.an("number");
            expect(response.body.booking.depositpaid).to.be.an("boolean");
            expect(response.body.booking.bookingdates.checkin[0]).to.be.an("string");
            expect(response.body.booking.bookingdates.checkout[1]).to.be.an("string");
            expect(response.body.booking.additionalneeds).to.be.an("string");
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