/// <reference types="cypress" />

it('Valida cenario quando nao e inserido token - 403', () => {
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