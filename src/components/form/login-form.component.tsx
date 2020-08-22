import React, { FC, ChangeEvent, FocusEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import { useForm } from "hooks/use-form.hook";
import { loginUser, selectAuthError } from "redux/auth";
import { FormGroup } from "./form-group.component";
import { Button } from "components/button/button.component";

export const LoginForm: FC = () => {
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, handleChange, touched, setTouched } = useForm({ email: "", password: "" });
  const { email, password } = values;

  function handleBlur(ev: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    /**
     * When a user clicks out of an input, mark it as touched
     *
     * @param ev - Event object
     */
    const inputName = ev.target.name as "email" | "password";
    if (touched[inputName]) return;

    setTouched({
      ...touched,
      [inputName]: true
    });
  }

  function handleSubmit(ev: ChangeEvent<HTMLFormElement>) {
    /**
     * Dispatch a login call. If successful, redirect to home page
     *
     * @param ev - Event object
     */
    ev.preventDefault();

    dispatch(loginUser(email, password, () => history.push("/")));
  }

  const errorClasses = classNames({
    "c-form__error": true,
    "is-visible": error
  });
  
  return (
    <div className="o-grid__item--wide">
      <h1 className="c-heading c-heading--title c-text--spaced c-text--centered">Login</h1>
      <form
        acceptCharset="UTF-8" 
        onSubmit={handleSubmit}
        name="login"
        className="c-form__container" 
        method="POST"
      >
        <FormGroup
          name="email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          touched={touched["email"]}
          value={email}
        />

        <FormGroup
          name="password"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          touched={touched["password"]}
          value={password}
        />
        
        <div className="c-form__group">
          <div className={errorClasses}>{error}</div>
          <Button className="c-form__submit" type="submit">SUBMIT</Button>
        </div>

      </form>
    </div>
  )
};