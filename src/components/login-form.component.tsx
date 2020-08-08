import React, { FC, ChangeEvent } from "react";

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
  const { email, password } = values;
  const error = useSelector(selectAuthError)
  const dispatch = useDispatch();
  const history = useHistory();

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
        autoComplete="off"
      >
        <FormGroup
          name="email"
          type="email"
          onChange={handleChange}
          value={email}
        />

        <FormGroup
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
        />
        
        <div className="c-form__group">
          { error && <p className="c-form__error">{error}</p> }
          <button className="c-button c-button--black c-form__submit" type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  )
};