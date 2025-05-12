/// <reference types="cypress" />

const payloadAddBooking = require('../../../fixtures/add-booking.json')
let bookId

describe('GET Booking', () => {

        it('Valida cenário de cadastro de nova reserva', () => {
            cy.api_inclusao(payloadAddBooking).then((response)=>{
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
         
