/// <reference types="cypress" />

describe('Selector Playground', () => {

    before(() => {
        cy.visit('http://165.227.93.41/lojinha-web/')
   })

    it('Selector Playground',()=>{
        cy.get('#usuario')
        .focus()
        .type("Teste Um")
        .should('have.value','Teste Um')
        .wait(1000)
        .clear()
        .type('Teste Dois')
        .should('contain.value','Dois')
        .clear()
    })
})