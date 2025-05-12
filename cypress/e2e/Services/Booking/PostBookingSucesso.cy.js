/// <reference types="cypress" />

const payloadAddBooking = require('../../../fixtures/add-booking.json')
let bookId;

describe('POST Booking', () => {
        it('Valida cenario de cadastro de nova reserva', () => {
            cy.api_inclusao(payloadAddBooking).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.body).exist;
                expect(response.body.booking.firstname).exist;
                expect(response.body.booking.bookingdates.checkin[0]).exist;
                expect(response.body.booking.bookingdates.checkout[1]).exist;
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

        it('Valida cenario de geracao do Token', () => {
            cy.api_booking_autenticacao('admin','password123').then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.not.null;
                expect(response.body.token).to.be.an("string");
                // retorno do token
                cy.log(response.body.token)
            })   
        });      
});            
 