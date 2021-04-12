describe('session', () => {
  beforeEach(() => cy.visit('/session/9040a628-6afa-4874-982c-a6e1a8de877b', { timeout: 40000 }))

  it('should be able to access main page', () => {
    cy.contains('いらっしゃいませ！')
    cy.contains('まずはお名前を教えて下さい。')
    cy.get('input[name="familyName"]').type('上島')
    cy.get('input[name="firstName"]').type('愛史')
    cy.get('input[name="familyNameKana"]').type('うえじま')
    cy.get('input[name="firstNameKana"]').type('あいじ').blur()
    cy.get('button').last().click()
    cy.contains('上島愛史様ですね。')
  })
})
