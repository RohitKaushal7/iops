# iops

A UI wrapper to talk to [h2non/imaginary](https://github.com/h2non/imaginary)

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components

## Getting Started

First, install the dependencies:

```bash
bun install
```

Setup .env

```env
VITE_SERVER_URL=http://localhost:3000
VITE_API_BASE_URL=http://your_imaginary_url
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

## Project Structure

```
iops/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun check-types`: Check TypeScript types across all apps
