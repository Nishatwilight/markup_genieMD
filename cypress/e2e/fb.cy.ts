describe('test', ()=>{
    it('fbLogin', ()=>{
        cy.visit('https://www.flipkart.com/')
        cy.get("input[placeholder='Search for products, brands and more']").type('Laptops').type('{enter}')
        cy.wait(5000)
        cy.xpath("(//a[@target='_blank'])[15]")
        .scrollIntoView({ duration: 5000, scrollBehavior: 'smooth', block: 'end', inline: 'center' } as any)
        .invoke('removeAttr', 'target')
        .click({force: true});
        cy.wait(5000)
        cy.get('.YxlyDn').scrollIntoView({ duration: 5000, scrollBehavior: 'smooth', block: 'center', inline: 'center' } as any)

        cy.go('back')
        })
})