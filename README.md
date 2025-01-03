<<<<<<< HEAD
# Quiz App - Next.js Project

This repository contains a **Quiz Application** built using **Next.js** (Approuter) **JavaScript**, **React.js**, **TailwindCSS**, where users can create Solve quizzes and Admin can add questions.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Pages Overview](#pages-overview)
- [How to Add a New Quiz](#how-to-add-a-new-quiz)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)

## Overview

The Quiz App allows users to:
1. Solve quizzes, submit answers, and get results.
2. View all available quizzes.
3. Add multiple options for each question (4 options).
4. Create quizzes with multiple questions.

This app includes API endpoints for quiz creation and fetching quizzes, with all data stored in a JSON file (`quiz.json`).

## Installation

To get started with this project, follow the steps below:

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later) - [Download](https://nodejs.org/)
- **npm** or **yarn** (package managers)

## Installation and Setup

Follow these steps to get the project up and running on your local machine.

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```
2. **Install dependencies**:
   Using npm:
    ```bash
    npm install
    ```
   Or using yarn:
    ```bash
    yarn install
    ```
3. **Start the development server**:
   Using npm:
    ```bash
    npm run dev
    ```
   Or using yarn:
    ```bash
    yarn dev
    ```
4. Open the app in your browser by navigating to `http://localhost:3000`.

## Running the Project
After following the installation steps, the application will be up and running at `http://localhost:3000`. The key page is the quiz creation page (`/create-quiz`) where users can add questions, options, and submit quizzes.

## Project Structure
Here is a breakdown of the project structure:

```
/quiz-app
    /app 
        /api
            /create - Route for handling POST request to create a new quiz
                - page.js - Page for creating Quizzes
            /quiz - 
                [id] - Dynamic route for quizzes
                    - page.js - Quiz page as per dynamic id
                - page.js - Quiz list page at /quiz
    /data - Contains quiz.json, the file used to store quiz data
        - quiz.js
    /utils
        - quizUtils.js - Exported function to read and write quizzes

```


## API Endpoints

### `POST /api/create`

This endpoint allows the creation of a new quiz.

**Request body**:

```json
{
  "id":2,
  "title": "Backend Quiz 3",
  "questions": [
    {
      "index": 0,
      "question": "",
      "options": [
        "",
        "",
        "",
        ""
      ]
    },
 -- REST --
  ],
  "answers": {
    "0": 2,
 -- REST --
  }
}
```
### `GET /api/quiz`

This endpoint retrieves all available quizzes.

**Response**:

```json
[
  {
    "id": 2,
    "title": "Backend Quiz 3",
    "questions": [
      {
        "index": 0,
        "question": "How does the event loop work in Node.js?",
        "options": [
          "",
          "",
          "",
          ""
        ]
      },
    -- REST --
    "answers": {
      "0": 2,
    -- REST --
    }
  }
]
```
- **id**: The unique identifier for the quiz.
- **title**: The title of the quiz.
- **questions**: An array of questions for the quiz, each containing:
    - **question**: The text of the question.
    - **options**: An array of four answer options.
- **answers**: The object containing the index of the correct answer for each question.

## Pages Overview
### `/app/page.js`
The homepage displays a list of all available quizzes. It fetches quizzes from the server and presents them to the user.

### `/app/create-quiz/page.js`
This page allows users to create a new quiz by providing:
- Quiz title
- Multiple questions with 4 options
- Correct answer (index from 0-3)
- Users can click Add Question to add more questions and Create Quiz to submit the quiz.

### `/app/quiz/[id]/page.js`
This page is quiz page, users can click on options and submit the quiz.


### `/api/create/route.js`
This API route accepts quiz data via POST request and saves it to the quiz.json file.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> Initial commit from Create Next App
