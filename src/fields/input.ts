import { FormEvent } from "react";
import { FieldState, FormDelegate } from "../index";
import { ValidationRule, validate, required, requiredIf, matches } from "../validation";

export type TextFieldPropType =
  & React.InputHTMLAttributes<HTMLInputElement>
  & { ref?(el: HTMLInputElement): void }

/**
 * Manages state for a standard, text-based input field.
 */
export class Input implements FieldState<string, TextFieldPropType> {

  protected _form: FormDelegate;
  protected _initialValue: string;
  protected _value: string;
  protected _focused: boolean = false;
  protected _dirty: boolean = false;
  protected _errors: string[] = [];
  protected _rules: ValidationRule<string>[] = [];

  public type: string;

  /**
   * Creates the text input state object and provides it with a delegate.
   */
  constructor(form: FormDelegate, type: string = "text", value: string = "") {
    this._form = form;
    this.type = type;
    this._initialValue = value;
    this._value = value;
  }

  /**
   * The current value of the field.
   */
  get value(): string {
    return this._value;
  }

  /**
   * Returns the first error message for the input or `null` if there are no errors.
   */
  get error(): string {
    return (this._errors.length === 0 ? null : this._errors[0]);
  }

  /**
   * Returns all of the error messages for the input field.
   */
  get errors(): string[] {
    return this._errors;
  }

  /**
   * The valid state of the component.
   */
  get isValid(): boolean {
    return (
      (this._dirty || !this.required) &&
      (this._errors.length === 0)
    );
  }

  /**
   * The current "focus" state of the input field.
   */
  get isFocused(): boolean {
    return this._focused;
  }

  /**
   * The current sanitation state of the input field.  When true, it means that the field
   * has been interacted with by a user.
   */
  get isDirty(): boolean {
    return this._dirty;
  }

  /**
   * Is true when the value has been changed from the initial value of the field.
   */
  get hasChanges(): boolean {
    return (this._initialValue !== this._value);
  }

  /**
   * Add one or more validation rules to the input.
   */
  rules = (...rules: ValidationRule<string>[]) => {
    this._rules = this._rules.concat(rules);
    return this;
  }

  /**
   * Adds the "required" validation rule to the input.
   */
  required = (message?: string) => {
    this._rules.push(required(message));
    return this;
  }

  /**
   * Adds the "requiredIf" validation rule to the input.  This is useful
   * if you want this field to only be required based on a conditional statement.
   */
  requiredIf = (check: (val: string) => boolean, message?: string) => {
    this._rules.push(requiredIf<string>(check, message));
    return this;
  }

  /**
   * Adds the "matches" validation rule to the input.  On change, the value will
   * be compared against the given regular expression.  This rule is skipped if
   * the input is empty, so make sure you add the required() rule if you want
   * the field to be required.
   */
  matches = (pattern: RegExp, message?: string) => {
    this._rules.push(matches(pattern, message));
    return this;
  }

  /**
   * Validate the field using the set validation rules and the current value.
   */
  validate = () => {
    this._errors = validate(this._value, this._rules);
    return this;
  }

  /**
   * Set the value of the field, with support for optionally bypassing re-renders.
   */
  setValue = (newValue: string, dontUpdate?: boolean) => {
    this._value = newValue;
    this.validate();
    if (!dontUpdate) {
      this._form.forceUpdate();
    }

    return this;
  }

  /**
   * Handle onFocus events for the input field.
   */
  onFocus = () => {
    this._focused = true;
    this._dirty = true;
  }

  /**
   * Handle onChange events for the input field.
   */
  onChange = (ev: string | FormEvent<any>) => {
    let hasErrors = (this.errors.length > 0);

    if (typeof ev === "string") {
      this.setValue(ev, hasErrors);
    } else {
      this.setValue(ev.currentTarget.value, hasErrors);
    }

    if (hasErrors) {
      this.validate();
      this._form.forceUpdate();
    }
  }

  /**
   * Handle onBlur events for the input field.
   */
  onBlur = () => {
    this._focused = false;
    this.validate();
  }

  /**
   * Returns the props for the field when invoked.
   */
  get props(): TextFieldPropType {
    return {
      type: this.type,
      value: this._value,
      onFocus: this.onFocus,
      onChange: this.onChange,
      onBlur: this.onBlur,
    };
  }

}