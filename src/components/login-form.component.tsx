import React, { FC, ChangeEvent, FocusEvent, useState } from "react";

import { useForm } from "hooks/use-form.hook";
import { FormGroup } from "./form-group.component";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectAuthError } from "redux/auth";
import { useHistory } from "react-router-dom";

export const LoginForm: FC = () => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const { email, password } = values;
  const error = useSelector(selectAuthError)
  const dispatch = useDispatch();
  const history = useHistory();

  function handleBlur(ev: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const inputName = ev.target.name as "email" | "password";
    if (touched[inputName]) return;

    setTouched({
      ...touched,
      [inputName]: true
    });
  }

  function handleSubmit(ev: ChangeEvent<HTMLFormElement>) {
    ev.preventDefault();

    dispatch(loginUser(email, password, () => history.push("/")));
  }
  
  return (
    <div className="o-grid__item--wide">
      <form
        acceptCharset="UTF-8" 
        action="https://usebasin.com/f/6a332af71053"
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
          <p className={`c-form__error ${error && "is-visible"}`}>{error}</p>
          <button className="c-button c-button--black c-form__submit" type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  )
};