/// <reference types="cypress" />

const payloadAddBooking = require('../../../fixtures/add-booking.json')

let bookId;

describe('POST Booking', () => {
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

        it('Valida cenário de geração do Token', () => {
            cy.api_booking_autenticacao('admin','password123').then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.not.null;
                expect(response.body.token).to.be.an("string");
                // retorno do token
                cy.log(response.body.token)
            })   
        });    
        
        it('Valida cenário status code 404', () => {
            cy.request({
                method: 'POST',
                url: 'https://restful-booker.herokuapp.com/auty',
                failOnStatusCode: false
            }).then((response)=>{
                expect(response.status).to.equal(404);
            });    
        });    

    });            
 