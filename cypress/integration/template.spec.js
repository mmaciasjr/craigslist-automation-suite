// EXAMPLE

before('Setup ', () => {
  cy.visit("https://SF.craigslist.org/")
})

describe("API name", function() {
  context("/endpoint", function() {
    it("goes to SF Craigslist and searches for Alligator, in the search field", function() {
      cy.get("#query").type("Alligator")
      cy.get("[data-input=\"search-count\"] li:first-child").click()
    })

    it("validates that the number of search results is, in fact, a number", function() {
      cy.get(".search-legend:not(.bottom) .totalcount")
        .invoke("text")
        .should("match", /^\d+$/)
    })

    it("provides properly labeled and prudent information to pop-up on screen", function() {
      cy.get("#gridview").contains("gallery")
      cy.get("[data-selection=\"rel\"]").contains("relevant")
      cy.get("[data-action=\"save\"]").contains("save search")
      cy.get("#searchform").contains("< prev")
      cy.get("#searchform").contains("next >")
    })

    it("Shows the appropriate title for the for sale type. For both all and by owner.", function() {
      cy.get("[class=\"reset\"]").contains("for sale")
    })

    // it("Shows title for owner and price", function() {
    //   cy.get("[data-val=\"owner\"]").click()
    //   cy.get(".cattitle .reset").contains("for sale by owner")
    // })

    // it("Shows dealer when button is clicked", function() {
    //   cy.get("[data-val=\"dealer\"]").click()
    //   cy.get(".cattitle .reset").contains("for sale by dealer")
    // })

    // it('Shows title for owner and price again.', function() {
    //   cy.get('[data-val="owner"]').click();
    //   cy.get('.cattitle .reset').contains('for sale by owner');
    // });

    it("Shows price in ascending order by dealer", function() {
      cy.get(".search-sort .dropdown-list").click()
      cy.get("[data-selection=\"priceasc\"]").click()
      cy.get(".result-row:nth-child(1) .result-image .result-price")
        .invoke("text")
        .then((text) => {
          const processedPriceAsString = text.replace(/\$/g, "")
          const processedPriceAsANumber = parseInt(processedPriceAsString)
          cy.log("Is this three dollars?", processedPriceAsANumber)

          // goal: log out the second number, as a number (no $)
          cy.get(".result-row:nth-child(2) .result-image .result-price")
            .invoke("text")
            .then((text) => {
              const processedSecondPriceAsString = text.replace(/\$/g, "")
              const processedSecondPriceAsNumber = parseInt(processedSecondPriceAsString)
              cy.log("Is this the second price?", processedSecondPriceAsNumber)

              assert.isAtLeast(processedSecondPriceAsNumber, processedPriceAsANumber)
            })
        })
    })

    it("Shows price in descending order by dealer", function() {
      cy.get(".search-sort .dropdown-list").click()
      cy.get("[data-selection=\"pricedsc\"]").click()
      cy.get(".result-row:nth-child(1) .result-image.gallery .result-price")
        .invoke("text")
        .then((text) => {
          const processedPriceDescendingAsString = text.replace(/\$/g, "")
          const processedPriceDescendingAsNumber = parseInt(processedPriceDescendingAsString)
          cy.log("Is this 12500", processedPriceDescendingAsNumber)
        })
    })

    it("Shows price in descending order by dealer, and logs out second number", function() {
      cy.get(".search-sort .dropdown-list").click()
      cy.get("[data-selection=\"pricedsc\"]").click()
      cy.get(".result-row:nth-child(2) .result-image.gallery .result-price")
        .invoke("text")
        .then((text) => { // '$4,975'
          const processedSecondPriceDescendingAsString = text.replace(/\$|,/g, "")
          cy.log("Is this String Working?", processedSecondPriceDescendingAsString)
          const processedSecondPriceDescendingAsNumber = parseInt(processedSecondPriceDescendingAsString)
          cy.log("Is this 4975", processedSecondPriceDescendingAsNumber)

          assert.isAtLeast(processedPriceDescndingAsNumber, processedSecondPriceDescendingAsNumber)
        })
    })
  })
})

/*
a sports store:
a ball and a bat for sale
together they cost $1.10
the bat costs $1 more than the ball
how much does the ball cost?
ball: $0.10
bat: $1.10
bat + ball: $1.20

$0.05
$1.05
 */

// it("gets first price", function() {
//   cy.get('div:nth-child(1) > img').click()
//     // assert number of elements selected
//     .find("div:nth-child(1) > img").click()
//     .should("have.length", 4)
// });
// but for comparisons other than equal, you need this syntax
//       cy.get("selector")
//         .find("child-selector")
//         .its("length")
//         .should("be.gte", 4) // greater than or equal
//
//   })
// cy.get('[data-selection="priceasc"]').contains('price');
// cy.get('#searchform').select('priceasc').should('have.[data-selection]');
// it("Shows price in descending order by dealer", function() {
//   cy.get(".search-sort .dropdown-list").click()
//   cy.get("[data-selection=\"pricedsc\"]").click()
// })

