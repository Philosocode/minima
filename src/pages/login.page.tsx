import React, { FC } from "react";
import { LoginForm } from "components/login-form.component";

export const LoginPage: FC = () => (
  <div className="o-grid__container">
    <div className="o-grid__item--wide">
      <LoginForm />
    </div>
  </div>
);