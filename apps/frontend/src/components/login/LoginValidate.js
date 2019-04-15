const validate = (values, props) => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 256 || values.username.length < 3) {
    errors.username = 'Must be 3-256 characters'
  }

  // if (!values.password) {
  //   errors.password = 'Required'
  // } else if (values.password.length > 256 || values.password.length < 3) {
  //   errors.password = 'Must be 3-256 characters'
  // }
  return errors
}

export default validate
