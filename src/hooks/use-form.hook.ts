import { useState, ChangeEvent } from 'react';

export const useForm = <T>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return { 
    values,
    setValues,
    handleChange,
  }
};