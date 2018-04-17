export interface ValidationRule<ValueType = any> {
  (value: ValueType): null | string;
}

/**
 * Check multiple field types at once and return true if all are valid.
 */
export function check(...fields: { isValid: boolean }[]): boolean {
  for (let field of fields) {
    if (!field.isValid) return false;
  }

  return true;
}

/**
 * Checks a given value against an array of validation rules and compiles a list of
 * error messages.
 */
export function validate<ValueType = any>(
  value: ValueType,
  rules: ValidationRule<ValueType>[],
): string[] {
  let errors: string[] = [];

  for (let rule of rules) {
    let error = rule(value);
    if (error) errors.push(error);
  }

  return errors;
}

/**
 * Validation check for truthy values.
 */
export function required(
  message: string = "This field is required.",
): ValidationRule<boolean | number | string> {
  return function (value) {
    if (!!value) return null;
    return message;
  };
}

/**
 * Validate against a condition within the given closure.
 */
export function requiredIf<ValueType = any>(
  check: (value: ValueType) => boolean,
  message: string = "This field is required.",
): ValidationRule<ValueType> {
  return function (value) {
    if (check(value)) return null;
    return message;
  };
}

/**
 * Validates a value against the given regular expression.  This rule is skipped
 * if an empty value is provided.
 */
export function matches(
  pattern: RegExp,
  message: string = "This field does not match the expected pattern.",
): ValidationRule<string> {
  return function (value) {
    if (!value || pattern.test(value)) return null;
    return message;
  }
}

/**
 * Performs a validation check to ensure that the given value is an email.
 */
export function email(
  message: string = "This field must be a valid must be a email address.",
): ValidationRule<string> {
  return matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message,
  );
}

/**
 * Validation check for enforcing a min length requirement for a value.
 */
// export function minLengthOf(
//   limit: number,
//   message: string = "This field must contain at least {min}.",
// ): ValidationRule<{ length: number }> {
//   return function (value) {
//     if ((!p.max || value.length <= p.max) && (!p.min || value.length >= p.min)) {
//       return null;
//     }

//     return message.replace(/\{(min|max)\}/g, (_, m) => {
//       return (<any>p)[m] || 0;
//     });
//   };
// }