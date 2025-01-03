// import db from "@/configs/db";
import Link from "next/link";
import { Stack } from "@mui/material";

export default async function ComponentsPage() {
  // const results = await db.components.findMany({ take: 10 });
  const results = [
    {
      supportedEnvs: [
        { framework: "next", library: "react" },
        { framework: "sveltekit", library: "svelte" },
      ],
      id: "6771ff5e4d6ae1126873b208",
      aliases: ["btn", "Button"],
      categories: ["component", "atomic"],
      code: "import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';import styles from './Button.module.scss';type ButtonProps={startDecoration?:ReactNode;endDecoration?:ReactNode;variant?:'contained'|'outline'|'destructive'|'ghost';fullWidth?:boolean;} & ComponentPropsWithoutRef<'button'>;const Button=forwardRef<HTMLButtonElement,ButtonProps>(function Button(props,ref){const{variant='contained',className='',startDecoration,endDecoration,children,fullWidth=false,...buttonProps}=props;const buttonClassName=`${styles.button} ${styles[variant]} ${className}`;return(<button className={buttonClassName} ref={ref}{...buttonProps}><span className={`${styles.decoration} ${styles.start}`}>{startDecoration}</span><p className={styles.buttonText}>{children}</p><span className={`${styles.decoration} ${styles.end}`}>{endDecoration}</span></button>});export default Button;",
      desc: "This is a button",
      name: "button",
    },
    {
      supportedEnvs: [],
      id: "67720501948ac524f4ecbdf4",
      aliases: [],
      categories: [],
      code: 'import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";\r\nimport styles from "./Avatar.module.scss";\r\n\r\nexport type AvatarProps = {\r\n displayName: string;\r\n image?: string | null;\r\n size?: "small" | "medium" | "large";\r\n component?: ElementType;\r\n} & ComponentPropsWithoutRef<"div">;\r\n\r\nfunction getInitials(name: string) {\r\n var words = name.split(" ");\r\n var initials = "";\r\n for (var i = 0; i < words.length; i++) {\r\n initials += words[i][0].toUpperCase();\r\n }\r\n return initials;\r\n}\r\nconst Avatar = forwardRef<HTMLDivElement, AvatarProps>(\r\n function Avatar(props, ref) {\r\n const {\r\n children,\r\n displayName,\r\n image,\r\n component: Component = "div",\r\n size = "medium",\r\n className = "",\r\n ...divProps\r\n } = props;\r\n\r\n return (\r\n <Component\r\n ref={ref}\r\n className={`${className} ${styles.container} ${styles[size]}`}\r\n {...divProps}\r\n >\r\n {image ? (\r\n <img src={image} alt={displayName} />\r\n ) : (\r\n <p>{getInitials(displayName)}</p>\r\n )}\r\n </Component>\r\n );\r\n }\r\n);\r\n\r\nexport default Avatar;\r\n',
      desc: "",
      name: "avatar",
    },
    {
      supportedEnvs: [],
      id: "677209f78855706b3c9aaf2a",
      aliases: [],
      categories: [],
      code: '"use client";\r\nimport useMousePosition from "../../utils/hooks/useMousePosition";\r\nimport styles from "./Cursor.module.scss";\r\nfunction scale(\r\n number: number,\r\n inMin: number,\r\n inMax: number,\r\n outMin: number,\r\n outMax: number\r\n) {\r\n const result =\r\n ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;\r\n // console.log({ result });\r\n return result;\r\n}\r\nfunction calculateScale(value: number, mouseSpeed: number) {\r\n // console.log("mouseSpeed", mouseSpeed);\r\n return value - Math.round(scale(mouseSpeed, 33, 1000, 0, 100));\r\n}\r\nexport default function Cursor() {\r\n const { mousePosition, touchPosition, mouseSpeed } = useMousePosition({\r\n includeTouch: true,\r\n });\r\n\r\n return (\r\n <div className={styles.cursorContainer}>\r\n <div\r\n className={styles.cursor}\r\n style={{\r\n left: `${mousePosition.x ?? touchPosition.x}px`,\r\n top: `${mousePosition.y ?? touchPosition.y}px`,\r\n // scale: calculateScale(1, mouseSpeed),\r\n width: `${calculateScale(33.75, mouseSpeed)}em`,\r\n height: `${calculateScale(24, mouseSpeed)}em`,\r\n }}\r\n >\r\n ${mousePosition.x} ${mousePosition.y} ${touchPosition.x} $\r\n {touchPosition.y} ${mouseSpeed}\r\n </div>\r\n </div>\r\n );\r\n}\r\n',
      desc: "",
      name: "cursor",
    },
  ];
  return (
    <Stack>
      <Stack>
        <Link href={"/components/create"}>Create New</Link>
      </Stack>
      <ol>
        {results.length == 0 ? (
          <li>No components found!</li>
        ) : (
          results.map((r, i) => (
            <li key={r.id}>
              <Link href={`/components/${r.id}`}>{r.name}</Link>
            </li>
          ))
        )}
      </ol>
    </Stack>
  );
}
