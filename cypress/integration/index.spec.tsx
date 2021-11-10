describe("Should open landing page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.clearCookies()
    })

    it("Go to Login Page if not logged in", () => {
        cy.getCookie("next-auth.session-token").should("be.null").then(() => {
            cy.location().should(loc => {
                expect(loc.href).to.eq("http://localhost:3000/login")
            })
        })
    })
})
export {}