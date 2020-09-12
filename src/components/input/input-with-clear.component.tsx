import React, { FC, ChangeEvent, KeyboardEvent } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  onClear: () => void;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  value: string;

  onKeyPress?: (ev: KeyboardEvent<HTMLInputElement>) => void;
  containerClasses?: string;
  inputClasses?: string;
  clearClasses?: string;
  [x: string]: any; // add so spread operator works
}
export const InputWithClear: FC<IProps> = ({
  onClear,
  onChange,
  onKeyPress,
  value,
  containerClasses,
  inputClasses,
  clearClasses,
  ...rest
}) => {
  return (
    <div className={classNames("c-input__container", containerClasses)}>
      <input
        autoComplete="0"
        className={classNames("c-input", inputClasses)}
        onChange={onChange}
        onKeyPress={onKeyPress}
        {...rest}
      />
      <FontAwesomeIcon
        className={classNames("c-input__clear", { "is-showing": value !== "" }, clearClasses)}
        icon={faTimes}
        onClick={onClear}
      />
    </div>
  );
};
