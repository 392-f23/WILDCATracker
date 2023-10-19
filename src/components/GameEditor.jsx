import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from "../utilities/useFormData";
import { useNavigate } from "react-router-dom";
import "./GameEditor.css";

const validateGameData = (key, val) => {
  switch (key) {
    case 'eventKey': 
      return /((WSOC|MSOC|WVB|FB|FHOCKEY|WFENC|MSWIM|MBB|WBB){1,1})/.test(val) ? '' : 'must be one of the following event keys: WSOC, MSOC, WVB, FB, FHOCKEY, WFENC, MSWIM, MBB, or WBB';
    case 'date':
      return (/(\d{4}[-]\d{2}[-]\d{2})/.test(val) && val.length === 10) ? '' : 'must be in the form of YYYY-MM-DD, e.g., 2023-10-16';
    case 'time':
      return /(\d{1}[:]\d{2}\s(a.m.|p.m.))/.test(val) ? '' : 'must follow the structure #:## a.m. (or p.m.), e.g., 7:00 p.m.';
    case 'point':
      return /(\d)/.test(val) ? '' : 'must be a number';
    default: return '';
        //case 'location':
        //case 'opponent':
  }
};

const InputField = ({name, text, state, change}) => {
  //console.log(change)
  if (name === 'date' && (state?.values[name].length === 10 || typeof state?.values[name] === 'number')){
    var date = new Date(state.values?.[name])
    var new_state = new Date(date.getTime() - (date.getTimezoneOffset() * 60000) ).toISOString().split("T")[0];
    //var new_state = date.getTime();
    return(
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name} 
            defaultValue={new_state} onChange={change} />
        <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
    );
}
else{
    return(
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name} 
            defaultValue={state.values?.[name]} onChange={change} />
        <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
  );  
}
}

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled} style={{background: 'rgb(78, 42, 132)', border: 'rgb(78, 42, 132)'}} >Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const GameEditor = ({id, game}) => {
  const [update, result] = useDbUpdate(`/events/${id}`);
  const [state, change] = useFormData(validateGameData, game);
  //console.log(state);
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors && state.values !== game) {
      var date = new Date(state.values['date']);
      date.setDate(date.getDate() + 1);
      state.values['date'] = date.getTime();
      state.values['point'] = Number(state.values['point']) ;
      update(state.values);
    }
  };

  return (
    <div className='content'>
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="eventKey" 
                  text="Event Key" 
                  state={state} 
                  change={change} />
      <InputField name="opponent"
                  text="Opponent"
                  state={state}
                  change={change} />
      <InputField name="date" text="Date" state={state} change={change} />
      <InputField name="time" text="Time" state={state} change={change} />
      <InputField name="location"
                  text="Location" 
                  state={state} 
                  change={change} />
      <InputField name="point" 
                  text="Points" 
                  state={state} 
                  change={change} />
      <ButtonBar message={result?.message} />
    </form>
    </div>
  )
};

export default GameEditor;