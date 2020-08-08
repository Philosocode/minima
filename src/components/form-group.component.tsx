import React, { FC } from "react";

interface IProps {
  name: string;
  onBlur: (ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: "email" | "password" | "text" | "textarea";
  touched: boolean;
  value: string;
  customClasses?: string;
  placeholder?: string;
}

export const FormGroup: FC<IProps> = ({ name, onBlur, onChange, placeholder, touched, type, value }) => { 
  function renderInput() {
    return (
      <input
        type={type}
        className={inputClasses}
        id={name}
        name={name}
        required
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    );
  }

  function renderTextArea() {
    return (
      <textarea
        className={inputClasses}
        id={name}
        name={name}
        placeholder={placeholder ?? "Enter your message..."}
        rows={8}
        maxLength={999}
        required
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    )
  }

  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  const inputClasses = touched
    ? "c-form__input is-touched"
    : "c-form__input";

  return (
    <div className="c-form__group">
      {
        type === "textarea"
          ? renderTextArea()
          : renderInput()
      }
      <div className="c-form__border"></div>
      <label htmlFor={name} className="c-form__label">{nameCapitalized}</label>
    </div>
  )
 }