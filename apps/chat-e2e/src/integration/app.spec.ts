describe('chat', () => {
  beforeEach(() => cy.visit('/session/bfadcbd8-c4fd-471e-bf9a-418fab1d29c1'))

  it('should be able to access', () => {
    cy.contains('いらっしゃいませ！')
    cy.contains('まずはお名前を教えて下さい。')
    cy.get('input[name="familyName"]').type('上島')
    cy.get('input[name="firstName"]').type('愛史')
    cy.get('input[name="familyNameKana"]').type('うえじま')
    cy.get('input[name="firstNameKana"]').type('あいじ').blur()
    cy.get('button').last().click()
  })
})
