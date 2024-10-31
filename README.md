[![PRODUCTION - build and deploy](https://github.com/Detective-Box/front-monorepo/actions/workflows/app-2-deploy-production.yml/badge.svg)](https://github.com/Detective-Box/front-monorepo/actions/workflows/app-2-deploy-production.yml)

[![STAGING - build and deploy](https://github.com/Detective-Box/front-monorepo/actions/workflows/app-2-deploy-staging.yml/badge.svg?branch=dev)](https://github.com/Detective-Box/front-monorepo/actions/workflows/app-2-deploy-staging.yml)

# App-2 - Le tueur au tarot

This is a private project named "App-2". It's a Node.js project that uses a variety of packages.
It contains the code for a web app for the second game from the DetectiveBox company named "Le tueur au tarot".

### Links

- [Production](https://app2.detectivebox.fr/)
- [Staging](https://app2.staging.detectivebox.fr/)

## Table of Contents

- [App-2 - Le tueur au tarot](#app-2---le-tueur-au-tarot)
    - [Links](#links)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
  - [Monorepo](#monorepo)
  - [Available Scripts](#available-scripts)
  - [Environment Variables](#environment-variables)
  - [Built With](#built-with)
  - [Folder Structure](#folder-structure)
  - [XState Integration](#xstate-integration)
    - [Configuration](#configuration)
    - [Usage](#usage)
  - [Sentry Integration](#sentry-integration)
    - [Configuration](#configuration-1)
    - [Usage](#usage-1)
  - [Deployment and CI/CD](#deployment-and-cicd)
    - [DigitalOcean](#digitalocean)
    - [GitHub Actions](#github-actions)
    - [Docker Deployment](#docker-deployment)
    - [Prerequisites](#prerequisites-1)
    - [Building the Docker Image](#building-the-docker-image)
    - [Running the Docker Image](#running-the-docker-image)
    - [Dockerfile Breakdown](#dockerfile-breakdown)
    - [Environment Variables](#environment-variables-1)
    - [Nginx Configuration](#nginx-configuration)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js version 20.x

### Installing

To get a development environment running:

1. Clone the repository
2. Install dependencies with `pnpm install`

## Monorepo

This project is part of a monorepo that contains multiple applications. The monorepo is managed using [PNPM](https://pnpm.io/), a fast, disk-space-efficient package manager.

## Available Scripts

From the root directory, you can run:

- `pnpm -F app-2 run dev`: Runs the app in the development mode.
- `pnpm -F app-2 run build`: Builds the app for production to the `build` folder.
- `pnpm -F app-2 run lint`: Lints the project using ESLint.
- `pnpm -F app-2 run preview`: Runs a preview of the built app.

## Environment Variables

The project uses environment variables to configure the app. You can create a `.env` file in the root of the project with the following variables:

```env
VITE_API=
VITE_CDN=
VITE_SHORCUTS=
# VITE_SENTRY_DSN=
# VITE_SENTRY_ENV=
# VITE_SENTRY_RELEASE=
```

You'll need to replace the values with the appropriate URLs, the project will not work without API and CDN URL.

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [XState](https://xstate.js.org/)
- [React Query](https://react-query.tanstack.com/)
- [Headless UI](https://headlessui.dev/)
- [React Router](https://reactrouter.com/)

## Folder Structure

The project is structured as follows:

```
app-2/
  ├── public/
  ├── src/
  |   ├── assets/           # Static assets
  │   ├── components/       # Reusable components (e.g. Button, Input)
  │   ├── context/          # react context related files
  │   ├── data/             # static data
  │   ├── hooks/            # custom react hooks
  │   ├── machine/          # XState state machines
  │   ├── pages/            # page components
  │   ├── services/         # API services
  │   ├── types/            # TypeScript types
  │   ├── utils/            # utility functions
  │   ├── main.tsx          # main app entry point
  │   ├── index.tsx         # main index file
  │   ├── router.tsx        # react router dom setup and page routes
  ├── .env
  ├── package.json
  ├── pnpm-lock.yaml
  ├── README.md
  ├── tsconfig.json
  ├── vite.config.ts
```

## XState Integration

This project uses [XState](https://stately.ai/docs), a library for creating, interpreting, and executing finite state machines and statecharts, as well as managing invocations of those machines as actors.

The state machines for this project are located in the `src/machine` directory.

### Configuration

To use a machine, you can import the context into your component:

```javascript
import { MachineContext } from '@/context/machine-context';

// ...

const { send } = useContext(MachineContext);
```

### Usage

With XState, you can manage complex state logic in your app. The `state` constant will give you the current state of your machine, and the `send` function allows you to send events to your machine.

For example, if your machine has a 'CLICK' event, you can send this event as follows:

```javascript
send('CLICK');
```

For more detailed documentation, you can visit the [official XState docs](https://stately.ai/docs).

## Sentry Integration

This project uses [Sentry](https://sentry.io/welcome/) for error tracking. Sentry provides self-hosted and cloud-based error monitoring that helps all software teams discover, triage, and prioritize errors in real-time.

### Configuration

To set up Sentry in your project, you need to create a `.env` file in the root of your project with the following environment variables:

```env
SENTRY_DSN=your-sentry-dsn
SENTRY_ENV=your-environment
SENTRY_RELEASE=your-release-version
```

### Usage

Once Sentry is set up, it will automatically report uncaught JavaScript exceptions triggered from your application, providing you with a stack trace of the error.

For more detailed documentation, you can visit the [official Sentry docs](https://docs.sentry.io/platforms/javascript/guides/react/).


## Deployment and CI/CD

This project is hosted on [DigitalOcean](https://www.digitalocean.com/) and uses [GitHub Actions](https://github.com/features/actions) for continuous integration and deployment.

### DigitalOcean

DigitalOcean provides developer-friendly cloud services that help to deploy and scale applications that run simultaneously on multiple computers.

Documentation for deploying a Node.js app to DigitalOcean can be found [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04).

### GitHub Actions

GitHub Actions help to automate, customize, and execute your software development workflows right in your repository. This project uses GitHub Actions to automatically build and test the project whenever changes are pushed to the repository.

Workflow files are located in the `.github/workflows` directory of the project root. The workflow files define the steps that GitHub Actions will take when triggered.

### Docker Deployment

This project includes a Dockerfile for building a Docker image of the application. The Dockerfile uses a multi-stage build process to create a lean, production-ready image.

### Prerequisites

- Docker installed on your machine. You can download Docker from the [official website](https://www.docker.com/products/docker-desktop).

### Building the Docker Image

To build the Docker image, navigate to the project directory and run:

```bash
docker build -t app-2 .

# You can also run shell commands from the root directory of the project with pnpm:

pnpm -F app-2 exec docker build -t app-2 .
```

### Running the Docker Image

To run the Docker image, use the following command:

```bash
docker run -p 80:80 app-2

# or with pnpm

pnpm -F app-2 exec docker run -p 80:80 app-2
```

This will start the Docker container and map port 80 of the container to port 80 of your host machine.

### Dockerfile Breakdown

The Dockerfile performs the following steps:

1. Sets the Node.js version and creates a base image.
2. Sets the working directory in the Docker image to `/app`.
3. Sets the `NODE_ENV` environment variable to `production`.
4. Installs `pnpm` globally in the Docker image.
5. Creates a new build stage to reduce the size of the final image.
6. Installs the necessary packages to build the node modules.
7. Copies the `package.json` file and installs the dependencies.
8. Copies the rest of the application code.
9. Sets up environment variables for the application.
10. Builds the application using `pnpm run build`.
11. Removes the development dependencies.
12. Creates a final stage based on the `nginx` image.
13. Copies the built application and the Nginx configuration to the final image.
14. Exposes port 80 and sets the default command to start Nginx.

### Environment Variables

The Dockerfile includes several ARG instructions for setting environment variables that your application uses. You can set these variables when building the Docker image by passing the `--build-arg` option to the `docker build` command. For example:

```bash
docker build --build-arg API_URL=https://api.example.com -t your-app-name .
```

This will set the `API_URL` environment variable to `https://api.example.com` during the build.

### Nginx Configuration

The Dockerfile includes an Nginx configuration file (`nginx.conf`) that configures Nginx to serve the built application. The configuration file sets the root directory to `/app/build` and listens on port 80.

This configuration is suitable for serving a single-page application (SPA), where all requests should serve the `index.html` file, and routing is handled on the client side.
