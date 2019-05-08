const Validate = (values, props) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name required!'
  }

  console.log("values:", values, ", errors:", errors);

  return errors;
}

export default Validate;