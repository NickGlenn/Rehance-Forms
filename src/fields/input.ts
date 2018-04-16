import { FormEvent } from "react";
import { FieldState, FormDelegate } from "../index";
import { ValidationRule, validate, isRequired, isEmail } from "../validation";

export type TextFieldPropType =
  & React.InputHTMLAttributes<HTMLInputElement>
  & { ref?(el: HTMLInputElement): void }

export type InputTypeAttribute =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "number";

/**
 * Manages state for a standard, text-based input field.
 */
export class InputState implements FieldState<string, TextFieldPropType> {

  protected _form: FormDelegate;
  protected _name: string;
  protected _value: string;
  protected _focused: boolean = false;
  protected _dirty: boolean = false;
  protected _element: HTMLInputElement;
  protected _errors: string[] = [];
  protected _validate: ValidationRule;
  protected _rules: ValidationRule<string>[] = [];

  public type: InputTypeAttribute;

  /**
   * Creates the text input state object and provides it with a delegate.
   */
  constructor(form: FormDelegate, name: string, type: InputTypeAttribute = "text") {
    this._form = form;
    this._name = name;
    this.type = type;

    if (type === "email") {
      this._rules.push(isEmail);
    }
  }

  /**
   * The name of the field.
   */
  get name(): string {
    return this._name;
  }

  /**
   * The current value of the field.
   */
  get value(): string {
    return this._value;
  }

  /**
   * Returns the first error message for the field or `null` if there are no errors.
   */
  get error(): string {
    return (this._errors.length === 0 ? null : this._errors[0]);
  }

  /**
   * Returns all of the error messages for the field.
   */
  get errors(): string[] {
    return this._errors;
  }

  /**
   * Whether or not this field is disabled based on the validation state
   * of the field.
   */
  get isDisabled(): boolean {
    return !this.isValid;
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
   * Adds the isRequired rule.
   */
  required = () => {
    return this.addRule(isRequired);
  }

  /**
   * Adds a requiredIf rule.
   */
  requiredIf = () => {
  }

  /**
   * Add a validation rule to the input state.
   */
  addRule = (rule: ValidationRule<string>) => {
    if (this._rules.indexOf(rule) === -1) {
      this._rules.push(rule);
    }

    return this;
  }

  /**
   * Validate the field using the set validation rules and the current value.
   */
  validate = (): boolean => {
    this._errors = validate(this._name, this.value, this._rules, {});
    return (this._errors.length > 0);
  }

  /**
   * Set the value of the field, with support for optionally bypassing re-renders.
   */
  setValue = (newValue: string, update: boolean = true) => {
    this._value = newValue;
    this.validate();
    if (update) this._form.forceUpdate();
    return this;
  }

  /**
   * Set the default value for the input.
   */
  setDefault = (value: string) => {
    return this.setValue(value, true);
  }

  /**
   * Set the reference to the element that this field is attached to.  Used for the
   * the ref prop on <input> fields.
   */
  setElement = (c: any) => {
    this._element = c;
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
    if (typeof ev === "string") {
      this.setValue(ev);
    } else {
      this.setValue(ev.currentTarget.value);
    }
  }

  /**
   * Handle onBlur events for the input field.
   */
  onBlur = () => {
    this._focused = false;
  }

  /**
   * Returns the props for the field when invoked.
   */
  get props(): TextFieldPropType {
    return {
      type: this.type,
      disabled: this.isDisabled,
      ref: this.setElement,
      value: this._value,
      onFocus: this.onFocus,
      onChange: this.onChange,
      onBlur: this.onBlur,
    };
  }

}