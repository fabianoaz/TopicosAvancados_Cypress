/// <reference types="cypress" />

describe('Automação Teste', () => {
   beforeEach(()=>{
       cy.visit('http://165.227.93.41/lojinha-web/')
   })

   const login = (usuario, senha) => {
    cy.get('#usuario').type(usuario,{force:true})
    cy.get('#senha').type(senha,{force:true})
    cy.get('.btn').click()
    cy.request('http://165.227.93.41/lojinha-web/produto')
    .should((response)=>{
        expect(response.status).to.eq(200)
    })      
   }

   it('Login Inválido',()=>{
    login('fazevedo123','1!Qqqq')
    cy.get('.toast').should('be.visible').should('contain.text','Falha')
   })
   
   it('Login Válido',()=>{
    login('fazevedo','1!Qqqq')
    cy.get('h3').should('be.visible').should('contain.text','Produtos')
   })

   it('Adiciona Produto',()=>{
    login('fazevedo','1!Qqqq')
    cy.get('h3').should('be.visible')
    cy.get('.waves-effect').click()
    cy.get('#produtonome').type('Nome do Produto')
    cy.get('#produtovalor').type('12,34')
    cy.get('#produtocores').type('branco,azul,preto,cinza')
    cy.get('button.btn').click()
    cy.get(':nth-child(4) > .grey').click()
    cy.get('.title > a').should('have.text','Nome do Produto')
    cy.get('ul > li > p').should('contain.text','12,34')
    cy.get('.secondary-content > .material-icons').click()
    cy.get('.toast').should('be.visible').should('contain.text','removido')
   })
})