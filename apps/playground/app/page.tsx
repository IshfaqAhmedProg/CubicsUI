import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";

function Item({ children, href }: { children: ReactNode; href: Route }) {
  return (
    <li>
      <h3>
        <Link href={href}>{children}</Link>
      </h3>
    </li>
  );
}
export default function Page() {
  return (
    <div className={"main"}>
      <h1>Components</h1>
      <h2>Display</h2>
      <ol className={"column"}>
        {/* <Item href={"/components/card"}>Card ⌛</Item>
        <Item href={"/components/passwordStrengthMeter"}>
          PasswordStrengthMeter ⌛
        </Item> */}
      </ol>
      <h2>Inputs</h2>
      <ol className={"column"}>
        <Item href={"/components/button"}>Button ✅</Item>
        <Item href={"/components/checkbox"}>Checkbox ✅</Item>
        <Item href={"/components/closeButton"}>CloseButton ✅</Item>
        {/* <Item href={"/components/passwordInput"}>PasswordInput ✅</Item>
        <Item href={"/components/select"}>Select ⌛</Item>
        <Item href={"/components/textAreaInput"}>TextAreaInput ✅</Item>*/}
        <Item href={"/components/textInput"}>TextInput ✅</Item>
      </ol>
      <h2>Typography</h2>
      <ol className={"column"}>
        {/* <Item href={"/components/inputErrors"}>InputHelperText ⌛</Item> */}
      </ol>
      <h2>Misc</h2>
      <ol className={"column"}>{/* <Item href={"/"}>Ripple ⌛</Item> */}</ol>
    </div>
  );
}
