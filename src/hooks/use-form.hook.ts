import {useState, ChangeEvent, useEffect} from 'react';

interface ITouchedState {
  [key: string]: boolean
}

export const useForm = <FormState>(initialValues: FormState) => {
  /**
   * Hook for storing and managing form data
   *
   * @param initialValues - object containing the initial state of the form
   *                        (e.g. { email: "", password: "" })
   *
   * @returns handleChange - event handler to call when a value changes
   *          touched - e.g. { email: false, password: true }
   *          values - values of the form fields
   */
  const [values, setValues] = useState<FormState>(initialValues);
  const [touched, setTouched] = useState<ITouchedState>({});

  useEffect(() => {
    // Initiate `touched` state from the fields in `initialValues`
    let initTouched: ITouchedState = {};

    Object.keys(initialValues).forEach(fieldName => initTouched[fieldName] = false);

    setTouched(initTouched);
    // eslint-disable-next-line
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // Change `values` based on input events
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return { 
    handleChange,
    touched,
    setTouched,
    values,
  }
};