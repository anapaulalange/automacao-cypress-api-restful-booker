/// <reference types="cypress" />

const payloadAddBooking = require('../../../fixtures/add-booking.json')
let bookId

describe('GET Booking', () => {

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

        it('Valida consulta de reservas por id', () => {  
            cy.request({
                        method: 'GET',
                        failOnStatusCode: false,
                        url: 'https://restful-booker.herokuapp.com/booking/'+bookId,
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
         
