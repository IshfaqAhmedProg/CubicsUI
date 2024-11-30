
  
  import  { useState, forwardRef } from 'react';
  import type { ComponentPropsWithoutRef, ReactNode } from 'react';
  import cssStyles from "./button.module.css";
  
  type ButtonProps = {startDecoration?: ReactNode;endDecoration?: ReactNode;variant?: "contained" | "outline" | "destructive" | "ghost";fullWidth?: boolean;}& ComponentPropsWithoutRef<"button">;
  
  const Button = forwardRef<HTMLButtonElement, ButtonProps>(function innerButton(props, ref){
    const {
    variant = "contained",className = "",startDecoration,endDecoration,children,fullWidth = false,
    ...rest
    } = props
    const buttonCn = `${cssStyles.button} ${cssStyles[variant]} ${className}`
    const startDecorationCn = `${cssStyles.decoration} ${cssStyles.start}`
    const endDecorationCn = `${cssStyles.decoration} ${cssStyles.end}`
    return (
        <button className={buttonCn} ref={ref} {...buttonProps}>
          {startDecoration && (
            <span className={startDecorationCn}>
              {startDecoration}
            </span>
          )}
          <p className={cssStyles.buttonText}>{children}</p>
          {endDecoration && (
            <span className={endDecorationCn}>
              {endDecoration}
            </span>
          )}
        </button>
      );
  });
  
  export default Button;
  