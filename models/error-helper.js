module.exports = (err) => {
  if (err.name !== 'ValidationError') { return err };

  // The first %s is the value that the user entered;
  // The second is the field name

  const messages = {
    'required': '%sThe %s cannot be blank.',
    'min': '"%s" is below the minimum value for %s.',
    'max': '"%s" is above the maximum value for %s.',
    'enum': '"%s" is not an allowed %s.',
    'Duplicate value': '"%s" is already used. Please enter another %s.',
  };

  const errors = [];

  // Loop over the weeors object of the Validation Error
  for (let field of Object.keys(err.errors)) {
    const eObj = err.errors[field];

    if (!message.hasOwnProperty(eObj.kind)) {
      // We don't have a custom message for it.
      errors.push(eObj.kind);
    }
    else {
      errors.push(require('util').format(
        messages[eObj.kind],
        (eObj.value || ''),
        eObj.path
      ));
    }
  }

  return errors;

}
