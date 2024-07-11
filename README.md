## Quick Start

To get started with the **react-state-building-script** project, follow these steps:

### Installation

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/your-username/react-state-building-script.git
cd react-state-building-script
```

Next, install the dependencies:

```bash
npm install
```

### Running the Application

To run the application and start the mock API server, use the following command:

```bash
npm start
```

This command will start both the React application and the mock API server concurrently.

## Project Overview

This project was bootstrapped with Create React App and enhanced with the following features:

- **Mock API using json-server:** A mock API is set up using `json-server` and configured to run alongside the React application.
  
- **Enhanced npm start command:** `npm start` is configured to run both the React app and the mock API server concurrently using `npm-run-all`.

- **React Router setup:** `react-router-dom` is installed for client-side routing, and `history` is used as a peer dependency of React Router. 

- **Environment variables:** `cross-env` is used for declaring environment variables in a cross-platform manner.

- **Basic React components:** Initial components like Header, Footer, and Spinner are provided to help kickstart development.

- **Styling:** Initial styling is applied using `App.css` and Tailwind CSS for component styling.

- **Image assets:** Placeholder images are stored in `/public/images`.

- **Data fetching services:** Basic data fetching functions are implemented in `/src/services` to interact with the mock API.

- **Mock database:** `db.json` is used as the mock database for `json-server`, defining initial data structure and content.

- **Configuration changes:** Some default Create React App files and configurations are modified or removed to streamline the project structure.

For detailed steps on setting up a similar environment from scratch, refer to the documentation on [Building Applications with React and Flux](https://reactjs.org/docs/getting-started.html).

