/// <reference types="cypress" />

let token 

describe('PATCH Booking', () => {
           
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
    
    // atualiza firstname e lastname
    it('Valida cenario de alteracao de firstname e lastname da reserva por id', () => {   

                cy.request({
                            method: 'PATCH',
                            failOnStatusCode: false,
                            url: 'https://restful-booker.herokuapp.com/booking/1',
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