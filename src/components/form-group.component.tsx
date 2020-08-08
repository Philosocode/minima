import React, { FC } from "react";

interface IProps {
  name: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: "email" | "password" | "text" | "textarea";
  value: string;
  customClasses?: string;
  placeholder?: string;
}

export const FormGroup: FC<IProps> = ({ name, onChange, placeholder, type, value }) => { 
  function renderInput() {
    return (
      <input
        type={type}
        className="c-form__input"
        placeholder={placeholder ?? nameCapitalized}
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange}
      />
    );
  }

  function renderTextArea() {
    return (
      <textarea
        className="c-form__input"
        id={name}
        name={name}
        placeholder={placeholder ?? "Enter your message..."}
        rows={8}
        maxLength={999}
        required
        value={value}
        onChange={onChange}
      />
    )
  }

  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="c-form__group">
      {
        type === "textarea"
          ? renderTextArea()
          : renderInput()
      }
      <label htmlFor={name} className="c-form__label">{nameCapitalized}</label>
    </div>
  )
 }