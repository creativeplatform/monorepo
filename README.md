# CREATIVE monorepo

# Turbo Repo

Welcome to our CREATIVE Monorepo powered by turborepo! This project is designed to help you get started with developing decentralized applications (dApps) on the Ethereum blockchain using the Turbo Repo framework. Turbo Repo provides a streamlined and efficient development environment for building smart contracts and web interfaces.

## Prerequisites

Before getting started, make sure you have the following prerequisites installed on your machine:

- Node.js (v14 or higher)
- Yarn (recommended) or npm
- Git

## Getting Started

To start your Turbo Repo project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
   Alternatively, you can create a new repository based on the Turbo Repo template.

2. Install dependencies:
   ```bash
   cd Creative
   yarn install
   ```

3. Configure the environment variables:
   - Copy the `.env.example` file and rename it to `.env`.
   - Fill in the required environment variables based on your project's configuration.

4. Compile smart contracts:
   ```bash
   yarn compile
   ```

5. Deploy smart contracts:
   ```bash
   yarn deploy
   ```
   This will deploy your smart contracts to the desired network specified in the `.env` file.

6. Start the development server:
   ```bash
   yarn turbo run dev --filter creative-tv
   ```
   This will start the development server and provide you with a local development environment for your dApp.

7. Access your dApp:
   Open your web browser and visit `http://localhost:3000` to access your dApp running locally.

## Project Structure

The Turbo Repo project has the following structure:

- `apps/contracts`: This directory contains your smart contracts written in Solidity.
- `apps/creative-tv`: This directory contains your web application's source code, including the front-end components and configurations.
- `packages/ui`: This directory contains the shared components for your UI accross all apps.

## Available Scripts

In the project directory, you can run the following scripts:

- `yarn start`: Starts the development server for your web application.
- `yarn compile`: Compiles the smart contracts using Hardhat.
- `yarn deploy`: Deploys the smart contracts to the specified network.
- `yarn test`: Runs the test suite for your smart contracts.

## Learn More

To learn more about Turbo Repo and how to use it effectively, refer to the [Turbo Repo documentation](https://turbo-repo-docs.com).

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please submit an [issue](https://feedback.creativeplatform.xyz) or create a pull request.

- Before making a pull request be sure to run `yarn turbo lint`. 

## License

This project is licensed under the [MIT License](LICENSE).

---

That's it! You're now ready to start developing with Creative Organization DAO using Turbo Repo. Happy coding!
