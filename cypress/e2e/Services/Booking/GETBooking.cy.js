/// <reference types="cypress" />

const payloadAddBooking = require('../../../fixtures/add-booking.json')

describe('GET Booking', () => {
        it('Valida consulta de reservas por id', () => {
            cy.api_inclusao(payloadAddBooking) 
            cy.request({
                        method: 'GET',
                        failOnStatusCode: false,
                        url: 'https://restful-booker.herokuapp.com/booking/1',
                        }).then((response)=>{
                            expect(response.status).to.equal(200);
                            expect(response.body).to.be.exist;
                            expect(response.body).to.be.an("object");
                            expect(response.body.firstname).to.be.an("string");
                            expect(response.body.lastname).to.be.an("string");
                            expect(response.body.totalprice).to.be.an("number");
                            expect(response.body.depositpaid).to.be.an("boolean");
                            expect(response.body.bookingdates.checkin).to.be.an("string");
                            expect(response.body.bookingdates.checkout).to.be.an("string");               
            })
    });   
})    
         
