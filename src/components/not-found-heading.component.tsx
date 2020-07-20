import React, { FC } from "react";

export const NotFoundHeading:FC = ({ children }) => {
  return (
    <h3 className="c-heading c-heading--subsubtitle c-heading--centered">{children}</h3>
  )
}