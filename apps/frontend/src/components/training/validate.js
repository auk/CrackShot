const Validate = (values, props) => {
  const errors = {};

  if (!values.organization) {
    errors.name = 'Organization required!'
  }

  // console.log("values:", values, ", errors:", errors);

  return errors;
}

export default Validate;