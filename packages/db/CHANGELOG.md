# @cubicsui/db

## 1.1.1

### Patch Changes

- Added postinstall script

## 1.1.0

### Minor Changes

- - Changed db schema
  - Created studio, docs, helpers
  - Modified cli to handle changes in db schema
  - Added ability for users to add new components and projects in database using either
    - CLI: When using cui as provider
    - Studio: When using cui as provider or consumer
  - Added ability for users to add components to their projects from the database

## 1.0.6

### Patch Changes

- Checking if release workflow respects the paths for "\*\*/CHANGELOG.md" on push

## 1.0.5

### Patch Changes

- Added additional files to ignore while publishing

## 1.0.4

### Patch Changes

- Added npmignore to @cubicsui/gen as it also wasnt including the dist directory in the published package in npm

## 1.0.3

### Patch Changes

- Moved npmignore to cli as it wasnt working in the root of the monorepo

## 1.0.2

### Patch Changes

- Added npmignore as it was ignoring the dist folders

## 1.0.1

### Patch Changes

- Changes across dependecies

## 1.0.0

### Major Changes

- Releasing major version of @cubicsui/db and patching @cubicsui/cli and @cubicsui/gen
