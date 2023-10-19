import { useState } from 'react';

export const useFormData = (validator = null, values = {}) => {
  const [state, setState] = useState(() => ({ values }));

  const change = (evt) => {
    const { id, value } = evt.target;
    const error = validator ? validator(id, value) : '';
    evt.target.setCustomValidity(error);
    if (error.length == 0){
      var date = new Date(state.values['date']);
      state.values['date'] = date.getTime();
      console.log(state.values['date'])
    }


    const values = {...state.values, [id]: value};
    const errors = {...state.errors, [id]: error};
    const hasError = Object.values(errors).some(x => x !== '');
    setState(hasError ? { values, errors } : { values });
  };

  return [state, change];
};