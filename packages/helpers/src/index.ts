export {
  default as dependencyAnalyser,
  createExternalDependency,
  createLocalDependency,
} from "./functions/dependencyAnalyser.js";

export { default as isNodeModule } from "./functions/isNodeModule.js";

export {
  resolveLocalDependencyPath,
  resolveRelativePath,
} from "./functions/pathResolvers.js";

export { npmPackageNameRegex } from "./regex/nameRegex.js";
