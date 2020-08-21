import React, { FC } from "react";

interface IProps {
  className?: string;
}

export const Divider: FC<IProps> = ({ className }) => { 
  let dividerClasses = "c-divider";
  if (className) dividerClasses += ` ${className}`;

  return <div className={dividerClasses} />
 };
