const Validate = (values, props) => {
  const errors = {};

  if(!values.textarea) {
    errors.textarea = 'Textarea required!'
  }
  if(!values.select) {
    errors.select = 'Select something'
  }
  if(!values.texticon) {
    errors.texticon = 'Like icons?'
  }
  // if(!values.text) {
  //   errors.text = 'Just input text'
  // }
  if(!values.textgroup) {
    errors.textgroup = 'Just input text twice'
  }
  if(!values.textall) {
    errors.textall = 'Here everything'
  }

  return errors;
}

export default Validate;