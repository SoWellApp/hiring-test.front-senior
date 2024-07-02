[![N|SoWell](https://sowell.app/wp-content/uploads/2022/08/Logo-Sowell-bleu-clair.svg)](https://sowell.app/)

# Senior Front-End Aptitude Test

Welcome to the SoWell Front-End Aptitude Test Playground! This repository is a key part of our job interview process, designed to assess your front-end development skills and knowledge. Here, you'll find a series of tasks and challenges that cover essential concepts such as HTML, CSS, JavaScript, and specifically the Vue Framework.

By completing these exercises, you'll demonstrate your ability to solve real-world problems and showcase your expertise. This is your opportunity to shine and show us what you can bring to our team.

We look forward to seeing your solutions and the creativity you apply to each task. Good luck and happy coding!

## 1. Prerequisites

This repo assumes you have installed the following prerequisites:

- Node: v20.13.1
- yarn: v1.22.22
- playwright executables (install via the command `yarn playwright install`)

### 1.1. Useful commands:

- Run dev environment: `yarn dev`
- Lint the project: `yarn lint`
- Run E2E tests: `yarn test:e2e`
- Run E2E tests with UI mode: `yarn test:e2e --ui`

## 2. Tasks

Each task should preferably be performed in its own commit, named `task:[name-of-the-task-name]`.

### 2.1. File Uploader Component

Implement a Vue 3 component to upload a PDF or image file.

#### 2.1.1. Component behaviour:

We can open a native file selector dialog by clicking on the Component main area, or dragging a file inside the Component main area. Once a file is uploaded inside the Component, it's `v-model` attribute will contain a `string` with a value corresponding with the base64 conversion of the uploaded file. We can also remove an uploaded file by clicking the close icon next to the file name.

#### 2.1.2. Component criterias:

The component must meet, **but are not limited to**, the following validation criteria:

- Component name: FileUploader.vue
- Props:

```js
const props = defineProps({
  label: string,
  modelValue: string // the uploaded file converted into a base64 string
})
```

- Emits:

```js
const emits = defineEmits(['update:modelValue'])
```

- Component integration:
  The Component should look like the images seen in `src/assets/file-uploader.jpg` and `file-uploader-full.jpg` depending on whether a file has been uploaded or not.

#### 2.1.3. Evaluation rules:

You work will be evaluated with the following criterias in mind:

- Is the component functional? Does it work?
- Is the code readable and/or well commented?
- Is there any other **Component criterias** or functionnalities implemented beside the mandatory ones?
- How well are you able to explain your code and thought process building the Component?

#### 2.1.4. Notes:

While working on this task, you are allowed to use any library you see fit (such as VueUse), but you **cannot** however use a pre-made File Upload Vue Component.
A Component that implements part but not all the requirements is still acceptable and will be evaluated.

### 2.2. E2E Test with [Playwright](https://playwright.dev/)

A Playwright E2E test has been set up in the project to run automated tests and validate the app's behavior. Your task is to implement the test steps to reproduce the given scenarios and make assertions to validate the app's behavior.

#### 2.2.1. What to test and validate?

The file `e2e\vue.spec.ts` contains the scenarios to be tested and implemented.
They are in the form:

```ts
test('[Test title]', async ({ page }) => {
  /** Scenario:
   *    Given [an initial state]
   *    When [an action]
   *    Then [an assertion]
   */
  // TODO: implement
})
```

following the [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/). It dictates the steps to be implemented within the page.

#### 2.2.2. Evaluation rules:

You work will be evaluated with the following criterias in mind:

- Are the tests correctly written? Do they reflect the scenario they are implementing?
- How well is the Playwright API used?
- How precise are the used _selectors_ and _assertions_?

#### 2.2.3. Notes:

While implementing the Playwright tests, you **can** add or change any class/id/data-testid of the app so that it will be easier to select the desired element. You **cannot** however alter the app overall behaviour and features.

Search for the keyword `TODO:` inside the project to quickly see where you need to code in order to finish the tasks.
