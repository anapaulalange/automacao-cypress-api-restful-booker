/// <reference types="cypress" />

const payloadAddBooking = require('../../../fixtures/add-booking.json')
let token
let bookId

describe('PATCH Booking', () => {
           
    it('Geração do Token', () => {
            cy.api_booking_autenticacao('admin','password123').then((response) => {
                token = response.body.token
                cy.log("Your token is: "+ token)
            });            
    }); 

    it('Valida cenário de inclusão de nova reserva', () => {
            cy.api_inclusao(payloadAddBooking).then((response)=>{
                bookId = response.body.bookingid
                cy.log("Your Booking ID is: "+ bookId)
            })  
    });    
    
    // atualiza firstname e lastname
    it('Valida cenario de alteracao de firstname e lastname da reserva por id', () => {   
                cy.request({
                            method: 'PATCH',
                            failOnStatusCode: false,
                            url: 'https://restful-booker.herokuapp.com/booking/'+bookId,
                            headers: {
                            'content-type': 'application/json',
                            'accept' : 'application/json',
                            'cookie' : `token=${token}`
                            },
                            body: {
                                "firstname" : "Machado",
                                "lastname" : "Assis"
                            },
                }).then((response)=>{
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.not.null;
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.not.null;
                    expect(response.body).to.be.an("object");
                    expect(response.body.firstname).to.be.an("string");
                    expect(response.body.lastname).to.be.an("string");
                    expect(response.body.totalprice).to.be.an("number");
                    expect(response.body.depositpaid).to.be.an("boolean");
                    expect(response.body.bookingdates.checkin[0]).to.be.an("string");
                    expect(response.body.bookingdates.checkout[1]).to.be.an("string");
                })
        });  

    // atualiza datas da reserva    
    it('Valida cenario de alteracao de datas da reserva por id', () => {   

                cy.request({
                            method: 'PATCH',
                            failOnStatusCode: false,
                            url: 'https://restful-booker.herokuapp.com/booking/'+bookId,
                            headers: {
                            'content-type': 'application/json',
                            'accept' : 'application/json',
                            'cookie' : `token=${token}`
                            },
                            body: {
                                "bookingdates.checkin" : "2025-05-09",
                                "bookingdates.checkout" : "2025-05-11"
                            },
                }).then((response)=>{
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.not.null;
                    expect(response.status).to.equal(200);
                    expect(response.body).to.be.not.null;
                    expect(response.body).to.be.an("object");
                    expect(response.body.firstname).to.be.an("string");
                    expect(response.body.lastname).to.be.an("string");
                    expect(response.body.totalprice).to.be.an("number");
                    expect(response.body.depositpaid).to.be.an("boolean");
                    expect(response.body.bookingdates.checkin[0]).to.be.an("string");
                    expect(response.body.bookingdates.checkout[1]).to.be.an("string");
                })
        });    

    it('Valida cenario status code 403', () => {
            
            cy.request({
                        method: 'PATCH',
                        url: 'https://restful-booker.herokuapp.com/booking/1',
                        body: {
                                "firstname" : "Leo",
                                "lastname" : "Jaime"
                            },
                        failOnStatusCode: false    
            }).then((response)=>{
                expect(response.status).to.equal(403);
                expect(response.body).to.be.not.null;
            })
    });    
}); 