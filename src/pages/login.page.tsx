import React, { FC } from "react";

import { LoginForm } from "components/form/login-form.component";

export const LoginPage: FC = () => (
  <div className="o-grid">
    <div className="o-grid__item--wide">
      <LoginForm />
      {
        process.env.REACT_APP_DEMO && (
          <div className="c-demo" style={{ textAlign: "center", margin: "0 auto" }}>
            <h3>Email: test@test.com</h3>
            <h3>Password: password</h3>
          </div> 
        )
      }
    </div>
  </div>
);