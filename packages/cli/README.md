# CLI

To start using the CLI install using:
```
// To install globally
npm i -g @cubicsui/cli
npx cui init

// To install in your project
npm i -D @cubicsui/cli
npx cui init
```
Once you've installed the CLI you can start generating components without having to worry about dependencies in your package.json file.

## Commands

### `init`
  This command initialises your project to start using CubicsUI, this will create a `cui.config` file that will be used to generate components. 
  During initialisation it will check a few things in your project and assign the values automatically in the `cui.config` file:-

#### 1. Check which supported environment is being used in the project
- `react`(default)
- `next`: When `next.config` file is detected in the project root.
- `svelte`: When `svelte.config` file is detected in the project root

#### 2. Check if Project is using typescript or not
- `false`(default)
- `true`: When a `tsconfig` file is detected in the root of the project.

#### 3. Check which supported style engine is being used.
- `css`(default)
- `scss`: When any `.sass` file is detected.
- `tailwind`: When any `tailwind.config` file is detected in the project root

#### 4. Check if a `src` folder is being used.
- `false`(default)
- `true`: 
  - When a `src` folder is detected in the project root.  
  - When the `env` is `next` then the cli will check the `tsconfig.json` or `jsconfig.json` to see if the path alias has been set to `"@/*": ["./src/*"]`. 
  - When the `env` is `svelte`.

### `create <?component>`