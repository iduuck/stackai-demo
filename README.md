## StackAI Demo Project

### Setup

To get started with this project, simply run the following command in your terminal:

```bash
pnpm install && pnpm dev
```

This will install all dependencies and start the development server. Once initialized, the application will be available at `http://localhost:3000`.

### Feature Set

This demo project includes a variety of features to showcase file handling and UI interaction:

* Files are displayed in a table and grouped by their respective integration connections (e.g., Dropbox, OneDrive, and Google Cloud).
* All three integrations—Dropbox, OneDrive, and Google Cloud—are fully functional and available in the interface.
* The table supports advanced UI interactions, including sorting, row selection, and keyword search, to make navigation and management easier.
* Users can upload custom files via a Drag & Drop interface, making it simple to add new content dynamically.
* The project uses [Biome](https://biomejs.dev/) for linting to ensure code consistency and style enforcement.
* Type safety is maintained throughout the codebase using TypeScript, with strict checking enabled during development.

### Notes

The Dropbox integration intentionally includes an artificial delay. This was added to demonstrate how the application handles loading states, offering a better understanding of user experience during slower network interactions or backend processing.

### Architectural Decisions

Several key technologies and architectural choices were made to enhance development speed, maintainability, and user experience:

* The UI components are built using [`shadcn/ui`](https://ui.shadcn.com/), which provides a robust foundation for building consistent, accessible interfaces. Some components have been slightly adjusted to fit the specific needs of this demo.
* We use `@tanstack/react-table` as our table solution. It's a powerful and flexible library that makes implementing sortable and filterable tables straightforward.
* For data fetching and caching, `@tanstack/react-query` is used. It simplifies working with asynchronous APIs and provides out-of-the-box features like caching, refetching, and request deduplication.
* The project is organized with co-located components to keep things modular and maintainable:

  * The `components` directory contains reusable UI elements.
  * The `features` folder holds feature-specific components, custom hooks, and other logic tied to specific parts of the application.
  * The `lib` folder includes utility libraries and client configurations.
  * Global TypeScript types are located in the `types` directory. In a monorepo environment, this would ideally be abstracted into a shared package such as `@types/overrides`.

### Data Creation, Fetching & Handling

* For mock data generation, the project uses `@faker-js/faker`. This enables rapid prototyping without relying on a real API.
* Since the backend API was not functional during development, a local, in-memory "database" was created using Faker.
* Please note that this mock database resets every time the page is refreshed. This behavior is due to the lack of persistent storage, as no actual database is running in the background.
