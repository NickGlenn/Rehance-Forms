export interface ValidationRule<ValueType = any> {
  (value: ValueType): ValidationRuleResult;
}

export type ValidationRuleResult = {
  key: string;
  valid: boolean;
  default: string;
};

export type StringMap = {
  [key: string]: string;
};

/**
 * Checks a given value against an array of validation rules and compiles a list of
 * error messages using the given messages object.
 */
export function validate<ValueType = any>(
  name: string,
  value: ValueType,
  rules: ValidationRule<ValueType>[],
  messages: StringMap,
): string[] {
  let errors: string[] = [];

  for (let rule of rules) {
    let result = rule(value);
    if (result && !result.valid) {
      // get the message for the error
      let msg = (messages[name + "." + result.key] || messages[result.key] || result.default);
      errors.push(msg);
    }
  }

  return errors;
}

/**
 * Performs a validation check for truthy values.
 */
export function isRequired(value: string): ValidationRuleResult {
  return {
    key: "required",
    valid: (!!value),
    default: "This field is required.",
  };
}

/**
 * Returns a new validation rule that compares a given string value against
 * the given regex pattern.
 */
export function matchesPattern(pattern: RegExp, key: string, defaultMessage: string): ValidationRule<string> {
  return function (value) {
    return {
      key: key,
      valid: (!pattern.test(value)),
      default: defaultMessage,
    };
  }
}

/**
 * Performs a validation check to ensure that the given value is an email.
 */
export const isEmail = matchesPattern(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  "email",
  "This field must be a valid must be a email address."
);