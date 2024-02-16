export const VALIDATION_TYPE = {
  REQUIRED: 'required',
  EMPTY: 'empty',
  AGE: 'age',
  PHONE: 'phone',
  EMAIL: 'email',
  URL: 'url',
}

export function setValidationState(input, isValid, errorMessage = '') {
  input.validation.isValid = isValid;
  input.validation.errorMessage = isValid ? '' : errorMessage;
  return isValid;
}

export function validateInputWithRegex(input, value, regex, errorMessage) {
  return setValidationState(
    input,
    regex.test(value),
    errorMessage
  );
}

export function validateData(inputs) {
  let isValid = true;

  for (const input of inputs) {
    if (input.value === '') {
      validateInput(input, input.value, VALIDATION_TYPE.EMPTY);
    }
    
    if (!input.validation.isValid) {
      isValid = false;
    }
  }

  return isValid;
}

export function validateInput(input, value = input.value, validationType) {
  switch(validationType) {
    case VALIDATION_TYPE.REQUIRED:
      return setValidationState(
        input,
        value.trim() !== '',
        `Please enter a valid ${input.inputLabel}`
      );
    case VALIDATION_TYPE.EMPTY:
      return setValidationState(
        input,
        value.trim() === '',
        `Please enter a valid ${input.inputLabel}`
      );
    case VALIDATION_TYPE.AGE:
      return setValidationState(
        input,
        value >= 18 && value <= 99,
        'Please enter a valid age (18-99)'
      );
    case VALIDATION_TYPE.PHONE:
      return validateInputWithRegex(
        input,
        value,
        /^380\d{9}$/,
        'Please enter a valid phone number (380*********)'
      );
    case VALIDATION_TYPE.EMAIL:
      return validateInputWithRegex(
        input,
        value,
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email'
      );
    case VALIDATION_TYPE.URL:
      return validateInputWithRegex(
        input,
        value,
        /^(ftp|http|https):\/\/[^ "]+$/,
        'Please enter a valid url'
      );
    default:
      return true;
  }
}
