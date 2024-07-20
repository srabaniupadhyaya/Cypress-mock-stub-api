import  mockdata from '../fixtures/mocking-data.json';

describe('Stub and mock scenarios', () => {

  it('Stub  API response', () => {
    cy.visit('https://dummyapi.io/explorer')
    cy.intercept({
      path:'/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10'
    }).as('commentsResponse')
    //cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.get('.flex :nth-child(5)').click()
      cy.wait('@commentsResponse').then(interResponse=>
        { 
          expect(interResponse.response.body.limit).to.be.equal(10)
  
        })

  })

    it('Mock  API response', () => {
      cy.visit('https://dummyapi.io/explorer')
      cy.intercept({
        path:'/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10'},
        {limit:100,message: "Testing mock"}
      ).as('commentsResponse')
      cy.get('.flex :nth-child(5)').click()
        cy.wait('@commentsResponse').then(interResponse=>
          { 
            expect(interResponse.response.body.limit).to.be.equal(100)
            expect(interResponse.response.body.message).to.be.equal( "Testing mock")
    
          })
  
      })

          mockdata.mockData.forEach((items) => {
            it.only('API Driven Mock  API response', () => {
              cy.visit('https://dummyapi.io/explorer')
            cy.intercept({
              path:'/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10'},
             items
            ).as('commentsResponse')
            cy.get('.flex :nth-child(5)').click()
              cy.wait('@commentsResponse').then(interResponse=>
                { 
                  expect(interResponse.response.body.limit).to.be.equal( items.limit)
                  expect(interResponse.response.body.message).to.be.equal(items.message)
          
                })
      
              })
           
    
        })
      })

