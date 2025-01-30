import { Project } from "../types/Project";

export const samplePkgJson = (project?: Project) => `{
  "name": "${project?.name ?? "projectName"}",
  "version": "1.0.0",
  "description": "${project?.desc ?? ""}",
  "author": "",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {}
}
`;
export const sampleTsconfig = `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;
export const sampleTsComponentReact = `import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";
import styles from "./Avatar.module.scss";

export type AvatarProps = {
  displayName: string;
  image?: string | null;
  size?: "small" | "medium" | "large";
  component?: ElementType;
} & ComponentPropsWithoutRef<"div">;

function getInitials(name: string) {
  var words = name.split(" ");
  var initials = "";
  for (var i = 0; i < words.length; i++) {
    initials += words[i][0].toUpperCase();
  }
  return initials;
}
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const {
      children,
      displayName,
      image,
      component: Component = "div",
      size = "medium",
      className = "",
      ...divProps
    } = props;

    return (
      <Component
        ref={ref}
        className={\`\${className} \${styles.container} \${styles[size]}\`}
        {...divProps}
      >
        {image ? (
          <img src={image} alt={displayName} />
        ) : (
          <p>{getInitials(displayName)}</p>
        )}
      </Component>
    );
  }
);

export default Avatar;
`;
export const sampleSassModule = `
.container {
  border-radius: 8px;
  background-color: slate;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;

  &.small {
    width: 20px;
  }
  &.medium {
    width: 32px;
  }
  &.large {
    width: 40px;
  }

  & > img {
    align-self: center;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  & > p {
    font-size: 1rem;
    // letter-spacing: 3px;
    color: white;
    font-weight: bold;
  }
}
`;
export const sampleCssModule = `.container {
	border-radius: 8px;
	background-color: slate;
	padding: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
	aspect-ratio: 1;
}

.small {
	width: 20px;
}

.medium {
	width: 32px;
}

.large {
	width: 40px;
}

.container>img {
	align-self: center;
	border-radius: 8px;
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.container>p {
	font-size: 1rem;
	color: white;
	font-weight: bold;
}`;

export const sampleJsComponentReact = `import React, { forwardRef } from "react";
import styles from "./Avatar.module.scss";

function getInitials(name) {
  var words = name.split(" ");
  var initials = "";
  for (var i = 0; i < words.length; i++) {
    initials += words[i][0].toUpperCase();
  }
  return initials;
}

const Avatar = forwardRef(function Avatar(props, ref) {
  const {
    children,
    displayName,
    image,
    component: Component = "div",
    size = "medium",
    className = "",
    ...divProps
  } = props;

  return (
    <Component
      ref={ref}
      className={\`\${className} \${styles.container} \${styles[size]}\`}
      {...divProps}
    >
      {image ? (
        <img src={image} alt={displayName} />
      ) : (
        <p>{getInitials(displayName)}</p>
      )}
    </Component>
  );
});

export default Avatar;

`;
