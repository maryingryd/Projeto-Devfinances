///<reference types="cypress"/>

import { format, prepareLocalStorage } from "../support/utils"



context('Dev Finacences Agilizei', () => {

    beforeEach(() => {
        cy.visit('https://dev-finance.netlify.app/', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        } )
        
       // cy.get('#data-table tbody tr').should('have.length', 0)
    });

    it('Cadastrar entradas', () => {


        cy.get('#transaction .button').click()
        cy.get('#description').type('Mesada')
        cy.get('[name=amount]').type(20)
        cy.get('[name=date]').type('2022-04-29')
        cy.get('button').contains('Salvar').click()

        cy.get('#data-table tbody tr').should('have.length', 3)


    });

    it('Cadastrar saidas', () => {

        cy.get('#transaction .button').click()
        cy.get('#description').type('Mesada')
        cy.get('[name=amount]').type(-20)
        cy.get('[name=date]').type('2022-04-29')
        cy.get('button').contains('Salvar').click()

        cy.get('#data-table tbody tr').should('have.length', 3)


    });
    it('Remover entradas e saídas', () => {
        const entrada = 'Mesada'
        const saída = 'KinderOvo'

        //cy.get('#transaction .button').click()
       // cy.get('#description').type(entrada)
      //  cy.get('[name=amount]').type(100)
      //  cy.get('[name=date]').type('2022-04-29')
       // cy.get('button').contains('Salvar').click()

       // cy.get('#transaction .button').click()
      //  cy.get('#description').type(saída)
      //  cy.get('[name=amount]').type(-35)
      //  cy.get('[name=date]').type('2022-04-29')
      //  cy.get('button').contains('Salvar').click()

        cy.get('td.description')
            .contains('Mesada')
            .parent()//para encontrar o pai do elemento
            .find('img[onclick*=remove]') // 
            .click()

        cy.get('td.description')
            .contains('Suco Kapo')
            .siblings()//para encontrar o irmao do elemento
            .children('img[onclick*=remove]') // 
            .click()

        it('Validar Saldo com diversas transações', () => {
           // const entrada = 'Mesada'
           // const saída = 'KinderOvo'

           // cy.get('#transaction .button').click()
           // cy.get('#description').type(entrada)
           // cy.get('[name=amount]').type(100)
           // cy.get('[name=date]').type('2022-04-29')
           // cy.get('button').contains('Salvar').click()

            //cy.get('#transaction .button').click()
           // cy.get('#description').type(saída)
           // cy.get('[name=amount]').type(-35)
           // cy.get('[name=date]').type('2022-04-29')
           // cy.get('button').contains('Salvar').click()

            let incomes = 0
            let expenses = 0

            cy.get('#data-table tbody tr')
                .each(($el, index, $list) => {

                    cy.get($el).find('td.income, td.expense').invoke('text').then(text => {

                        if (text.includes('-')) {
                            expenses = expenses + format(text)
                        } else {
                            incomes = incomes + format(text)
                        }

                        cy.log(`entradas`, incomes)
                        cy.log(`saídas`, expenses)

                    })

                })
        });

            cy.get('#totalDisplay').invoke('text').then(text => {
            cy.log(`valor total`, format(text))

            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses

            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })

    });

});
