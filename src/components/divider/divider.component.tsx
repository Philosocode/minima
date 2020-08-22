import React, { FC } from "react";
import classNames from "classnames";

interface IProps {
  className?: string;
}

export const Divider: FC<IProps> = ({ className }) => { 
  const dividerClasses = classNames({ "c-divider": true }, className);

  return <div className={dividerClasses} />
 };
