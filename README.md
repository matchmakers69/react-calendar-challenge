# iProSuite - Modern Calendar App

## Description

This is a modern calendar application built with **React**, **TypeScript**, and **Redux Toolkit**, showcasing advanced frontend architecture and clean component design.

The goal of this project is to demonstrate:

- ✅ Scalable **feature-driven architecture**
- ✅ Complex **state management** using Redux Toolkit
- ✅ Clean, **reusable UI components** and custom hooks
- ✅ Seamless **user interactions** with dynamic state updates
- ✅ **Modern coding practices** including TypeScript, ESLint, Prettier, and testing

The application allows users to view and interact with a calendar interface. It manages state efficiently (e.g., selected dates, events, views) and is built for extensibility and maintainability — following industry standards and best practices.

You can check out the live version of the app [here](https://react-calendar-challenge.vercel.app/).

## Key Features

- 📅 Month/week/day calendar
- ➕ Add/edit/delete calendar events
- 🧠 Global state management using Redux Toolkit
- 🎨 Feature-driven and component-driven architecture
- ⚙️ Custom hooks for logic abstraction
- 🧪 Unit and integration tests using Testing Library and Vitest
- 📅 Date handling with **date-fns**
- 📝 Form validation with **React Hook Form** and **Zod**

## Tech Stack

- React
- Redux Toolkit
- TypeScript
- date-fns (for date manipulation)
- React Hook Form (with Zod validation)
- ESLint + Prettier
- Vite
- Testing Library & Vitest

## 📝 Text & Label Management

This project uses a lightweight custom localization approach inspired by i18n libraries but without external dependencies.

All shared application texts (e.g., button labels, headings, error messages) are stored in: `src/shared/locales`

## Benefits of the Text Management Approach

- ✅ **Centralized management of user-facing text**  
  All user-facing text is stored in one place, making it easier to manage, update, and maintain.

- ✅ **Clean separation between content and UI**  
  Keeps the content (text) separate from the UI, improving code readability and maintainability.

- ✅ **Easy to extend into multi-language support in the future**  
  Provides a simple foundation for adding multi-language support later with minimal refactoring.

- ✅ **No dependency on external packages**  
  No external dependencies for handling user-facing text, keeping the project lightweight and easier to maintain.

---

⚠️ **Note**: For larger applications or production-grade internationalization, using a dedicated library such as [react-i18next](https://react.i18next.com/) is recommended for handling multiple languages, pluralization, dynamic text interpolation, and locale detection.

## Future Improvements

While this app is functional, there are areas that can be further improved:

- ✅ **Better unit tests coverage**  
  Increase test coverage, particularly around form validation, state updates, and event interactions.

- ✅ **Improved handling of overlapping events**  
  Implement better logic for managing overlapping events in the calendar, such as visual indicators or stacking events.

- ✅ **Input sanitization**  
  Implement input sanitization to protect against potentially malicious input or malformed data.

- ✅ **Rate limiting for user actions**  
  Introduce rate limiting for certain user actions (e.g., adding/editing events) to improve performance and prevent abuse.

- ✅ **Basic CSRF protection simulation**  
  Simulate basic Cross-Site Request Forgery (CSRF) protection for a more secure application, especially in production environments.

## Setup Instructions

```bash
git clone git@github.com:matchmakers69/react-calendar-challenge.git
cd react-calendar-challenge
npm install
npm run dev
```
