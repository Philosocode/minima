import React, { FC } from "react";

import { LoginForm } from "components/form/login-form.component";

export const LoginPage: FC = () => (
  <div className="o-grid">
    <div className="o-grid__item--wide">
      <LoginForm />
    </div>
  </div>
);