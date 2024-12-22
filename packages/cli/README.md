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
#### Flags
 - `--manual` `<-m>` : Allows you to manually define the configuration during initialisation instead of automatically detecting the values.

  This command initialises your project to start using CubicsUI, this will create a `cui.config` file that will be used to generate components. 
  During initialisation it will check a few things in your project and assign the values automatically in the `cui.config` file, you can always manually define the config by using the `--manual` flag:-

##### 1. Check which supported environment is being used in the project
This check is done to figure out which library and framework is being used to set the value of `env` in the config file. 
- `react` is the default value for the library.
- `none` is the default value for the framework.
- When a `next.config` file is detected in the project root the framework is set to `next` and the library is set to `react`.
- When a `svelte.config` file is detected in the project root then the the framework is set to `sveltekit` and the library is set to `svelte`. 

##### 2. Check if Project is using typescript or not
- By default the value for `typescript` is `false`
- When a `tsconfig` file is detected in the root of the project the value for `typescript` is set to true.

##### 3. Check which supported style engine is being used.
- By default the value for `styleEngine` is set to `css`
- When any `tailwind.config` file is detected in the project root then the value for `styleEngine` is set to `tailwind`
- When any `.sass` file is detected anywhere in the project, then the value of `styleEngine` is set to `scss`.

*Note: the priority for `styleEngine` selection goes something like this `tailwind > scss > css`.

##### 4. Check if a `src` folder is being used to organise the project.
- If a `src` folder is present in the root of the project then the value for `componentDir` is set to the `src` folder instead of the rootDir 

### `create <?component>`

This command is used to generate the components, before you run this command make sure to check your config file.
