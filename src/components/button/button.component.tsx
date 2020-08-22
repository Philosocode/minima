import React, { FC } from "react";
import classNames from "classnames";

interface IProps {
  centered?: true;
  className?: string;
  [_:string]: any; // to make ...rest work. SEE: https://stackoverflow.com/a/58201122
}

export const Button: FC<IProps> = ({ centered, className, children, ...rest }) => {
  const containerClasses = classNames({
    "c-button__container": true,
    "c-button__container--centered": centered
  });

  const buttonClasses = classNames("c-button", className);

  return (
    <div className={containerClasses}>
      <button className={buttonClasses} {...rest}>{children}</button>
    </div>
  )
};