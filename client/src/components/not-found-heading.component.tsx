import React, { FC } from "react";

export const NotFoundHeading:FC = ({ children }) => {
  return (
    <h3 className="c-heading c-heading--medium c-heading--left-align">{children}</h3>
  )
}