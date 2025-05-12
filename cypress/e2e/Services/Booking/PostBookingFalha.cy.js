/// <reference types="cypress" />

it('Valida cenario - 404', () => {
            cy.request({
                method: 'POST',
                url: 'https://restful-booker.herokuapp.com/auty',
                failOnStatusCode: false
            }).then((response)=>{
                expect(response.status).to.equal(404);
            });    
});    
