/* eslint-disable playwright/expect-expect */
import { test, expect, Page } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('I can navigate to the home page', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Home" page
   *    Then I see "File upload page" as the page title
   */
  await page.goto('/')
  await expect(page.getByTestId('home.title')).toHaveText('File upload page')
})

test('I can navigate to the test page', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Home" page
   *    When I click on the "Open Drawer" button
   *    And I click on the "Tests" menu
   *    Then I am redirected to "/tests"
   *    And I see "Form" as the page title
   */
  await page.goto('/')
  await page.locator('button >> i').filter({has: page.getByText("menu")}).first().click()
  await page.locator('.q-item[href="/tests"]').click()
  await expect(page).toHaveURL(/\/tests$/)
  await expect(page.getByTestId('title')).toHaveText('Form')
})

test('I cannot submit an empty form', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Tests" page
   *    When I click on the "Submit" button
   *    Then I am still on the "Tests" page
   *    And I see an error saying "Please type something"
   */
  await page.goto('/tests')
  await page.getByRole('button', { name: /submit/i }).click()
  await expect(page).toHaveURL(/\/tests$/)
  await expect(page.getByRole('alert')).toHaveText('Please type something')
})

test('I can submit a filled form', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Tests" page
   *    When I type "John Doe" on the "name" input
   *    And I type "22" on the "age" input
   *    And I type "This is an about me info" on the "about" input
   *    And I check the "accept" input
   *    And I click on the "Submit" button
   *    Then I am redirected to "/tests/summary"
   *    And I see "John" as the given "name"
   *    And I see "Doe" as the given "surname"
   *    And I see "22" as the given "age"
   *    And I see "You accepted the licence and terms conditions"
   *    And I see "This is an about me info" as the given "about"
   *    And I see 5 full stars
   */
  await page.goto('/tests')
  await fillForm(page, {
    name: 'John Doe',
    age: 22,
    about: 'This is an about me info',
    checkTerms: true
  })
  await page.getByRole('button', { name: /submit/i }).click()
  await expect(page).toHaveURL(/\/tests\/summary$/)
  await assertSummary(page, {
    name: 'John',
    surname: 'Doe',
    age: 22,
    checkTerms: true,
    about: '"This is an about me info"',
    fullStars: 5,
    emptyStars: 0
  })
})

test('I can submit a partially filled form', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Tests" page
   *    When I type "John" on the "name" input
   *    And I type "11" on the "age" input
   *    And I click on the "Submit" button
   *    Then I am redirected to "/tests/summary"
   *    And I see "John" as the given "name"
   *    And I see "11" as the given "age"
   *    And I see "You did not write about you"
   *    And I see 1 full stars
   *    And I see 3 empty stars
   */
  await page.goto('/tests')
  await fillForm(page, {
    name: 'John',
    age: 11,
    checkTerms: false
  })
  await page.getByRole('button', { name: /submit/i }).click()
  await expect(page).toHaveURL(/\/tests\/summary$/)
  await assertSummary(page, {
    name: 'John',
    age: 11,
    checkTerms: false,
    about: 'You did not write about you',
    fullStars: 1,
    emptyStars: 3
  })
})




async function fillForm(
  page: Page,
  formData: {
    name: string
    age: number
    about?: string
    checkTerms: boolean
  }
) {
  await page.getByLabel('Your name *').fill(formData.name)
  await page.getByLabel('Your age *').fill(formData.age.toString())
  if (formData.checkTerms) {
    await page.getByLabel('I accept the license and terms').check()
  }
  if (formData.about) {
    await page.getByLabel('About you').fill('This is an about me info')
  }
}

async function assertSummary(
  page: Page,
  summaryData: {
    name: string
    surname?: string
    age: number
    checkTerms: boolean
    about: string
    fullStars: number
    emptyStars: number
  }
) {
  await expect(page.getByTestId('summary.name')).toHaveText(summaryData.name)
  if (summaryData.surname) {
    await expect(page.getByTestId('summary.surname')).toHaveText(summaryData.surname)
  }
  await expect(page.getByTestId('summary.age')).toHaveText(summaryData.age.toString())
  await expect(page.locator('.about')).toHaveText(summaryData.about)
  if (summaryData.checkTerms) {
    await expect(page.getByTestId('summary.terms')).toHaveText(
      'You accepted the licence and terms conditions'
    )
  }
  if (summaryData.fullStars > 0) {
    await expect(page.locator('i').filter({ has: page.getByText(/^star\s*$/) })).toHaveCount(
      summaryData.fullStars
    )
    if (summaryData.emptyStars > 0) {
      await expect(page.locator('i').filter({ has: page.getByText(/^star_outline\s*$/) })).toHaveCount(
        summaryData.emptyStars
      )
    }
  }
}
