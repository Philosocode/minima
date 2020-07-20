import React, { FC } from "react";

interface IProps {
  customClass?: string;
}

export const Divider: FC<IProps> = ({ customClass }) => (
  <div className={`c-divider ${customClass ?? ""}`}></div>
);
