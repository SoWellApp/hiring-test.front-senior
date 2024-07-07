/* eslint-disable playwright/expect-expect */
import { test, expect } from '@playwright/test'

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
  await page.getByRole('button').click()
  await page.locator('.q-item[href="/tests"]').click()
  await expect(page).toHaveURL(/\/tests$/)
  await expect(page.locator('.text-h4')).toHaveText('Form')
})

test('I cannot submit an empty form', async ({ page }) => {
  /** Scenario:
   *    Given I am on the "Tests" page
   *    When I click on the "Submit" button
   *    Then I am still on the "Tests" page
   *    And I see an error saying "Please type something"
   */
  await page.goto('/tests')
  await page.locator('.q-btn[type="submit"]').click()
  await expect(page).toHaveURL(/\/tests$/)
  await expect(page.locator('.q-field__messages div[role="alert"]')).toHaveText(
    'Please type something'
  )
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
  await page.locator('.q-field__native[aria-label="Your name *"]').fill('John Doe')
  await page.locator('.q-field__native[aria-label="Your age *"]').fill('22')
  await page.locator('.q-field__native[aria-label="About you"]').fill('This is an about me info')
  await page.click('.q-toggle')
  await page.click('.q-btn[type="submit"]')
  await expect(page).toHaveURL(/\/tests\/summary$/)
  await expect(page.locator('.text-bold.text-body1.name')).toHaveText('John')
  await expect(page.locator('.text-bold.text-body1.surname')).toHaveText('Doe')
  await expect(page.locator('.text-bold.text-body1.age')).toHaveText('22')
  await expect(page.locator('.terms')).toHaveText('You accepted the licence and terms conditions')
  await expect(page.locator('.about')).toHaveText('"This is an about me info"')
  await expect(page.locator('.q-icon').filter({ hasText: /^star\s*$/ })).toHaveCount(5)
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
  await page.locator('.q-field__native[aria-label="Your name *"]').fill('John')
  await page.locator('.q-field__native[aria-label="Your age *"]').fill('11')
  await page.click('.q-btn[type="submit"]')
  await expect(page).toHaveURL(/\/tests\/summary$/)
  await expect(page.locator('.text-bold.text-body1.name')).toHaveText('John')
  await expect(page.locator('.text-bold.text-body1.age')).toHaveText('11')
  await expect(page.locator('.about')).toHaveText('You did not write about you')
  await expect(page.locator('.q-icon').filter({ hasText: /^star\s*$/ })).toHaveCount(1)
  await expect(page.locator('.q-icon').filter({ hasText: /^star_outline\s*$/ })).toHaveCount(3)
})
