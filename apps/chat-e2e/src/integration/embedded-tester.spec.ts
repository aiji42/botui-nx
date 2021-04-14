describe('embedded-tester', () => {
  beforeEach(() =>
    cy.visit('/embedded-tester/9040a628-6afa-4874-982c-a6e1a8de877b', {
      timeout: 30000
    })
  )

  it('should be able to access', () => {
    cy.get('[data-cy="open-chat-button"]')
  })
})
