### Components

1. Accordion
2. Appbar
3. AppContainer
4. Avatar
5. Button
6. ColorScheme
7. Cursor
8. Divider
9. DragNDrop
10. FormContainer
11. FormControl
12. FormInput
13. FormMessage
14. FormMultiStep
15. Hamburger
16. IconButton
17. Input
18. List
19. ListItem
20. Popover
21. Spinner
22. Select
23. Sidebar
24. Toast

### Ruleset
1. Every component should have its own .tsx and its own .module.scss file.

### Infrastructure
```
{
    frameworks:{
        react:{
            styleEngines:"css"|"scss"|"tailwind"
            type:"typescript"|"javascript"
        },
        <!-- Experimental -->
        next:{
            styleEngines:"css"|"scss"|"tailwind"
            type:"typescript"|"javascript"
            router:"app"|"pages"
        },
        svelte:{
            styleEngines:"css"|"scss"|"tailwind"
            type:"typescript"|"javascript"
        },
    }
}
```

## CLI

The 

1. Install the CLI using:

**Locally**

`npm i -D @studiocubics/cli` or `yarn add --dev @studiocubics/cli`

**Globally**

`npm i -g @studiocubics/cli` or `yarn global add @studiocubics/cli`

2. Once installed run `npx scli init`
3. A new file called sc.config.ts will be created in the root directory, this contains all the configuration regarding what type of components will be built in the project, below you can find the configuration properties.

| Name           | Type                       | Default      | Description                                                                           |
| -------------- | -------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| framework      | "react"\|"svelte"          | "react"      | The framework of the components that will be built by the CLI.                        |
| styleEngine    | "css"\|"scss"\|"tailwind"  | "css"        | The style engine you are using to do your design.                                     |
| cssVariableMap | Object                     | {}           | If you want to map your local css variables to  variables in the installed component. |
| type           | "typescript"\|"javascript" | "typescript" | Set to javascript if your project is not built on typescript.                         |
| componentDir   | String                     | "components" | The folder where the components will be installed                                     |