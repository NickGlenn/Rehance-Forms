import { FieldState, FormDelegate } from "..";

export type TogglePropType = React.InputHTMLAttributes<HTMLInputElement>;

export enum ToggleMode {
  None,
  MustBeTrue,
  MustBeFalse,
}

export class Toggle implements FieldState<boolean, TogglePropType> {

  private _form: FormDelegate;
  private _initialValue: boolean;
  private _value: boolean;
  private _requirement: ToggleMode = ToggleMode.None;

  /**
   * Construct the state manager with form delegate and initial value.
   */
  constructor(form: FormDelegate, value: boolean = false) {
    this._form = form;
    this._initialValue = value;
    this._value = value;
  }

  /**
   * True if the checkbox has been switched from its initial value.
   */
  get hasChanged(): boolean {
    return (this._initialValue !== this._value);
  }

  /**
   * True if the checkbox is considered valid.
   */
  get isValid(): boolean {
    switch (this._requirement) {
      case ToggleMode.MustBeFalse:
        return !this._value;
      case ToggleMode.MustBeTrue:
        return this._value;
      default:
        return true;
    }
  }

  /**
   * The current value of this checkbox field.
   */
  get value(): boolean {
    return this._value;
  }

  /**
   * Set the value of the checkbox.
   */
  setValue = (value: boolean, dontUpdate?: boolean) => {
    if (this._value !== value) {
      this._value = value;
      if (!dontUpdate) {
        this._form.forceUpdate();
      }
    }

    return this;
  }

  /**
   * Toggles the current state of the checkbox.
   */
  toggle = () => {
    this._value = !this._value;
    this._form.forceUpdate();
    return this;
  }

  /**
   * Set the requirement mode of the toggle.
   */
  mustBe = (value: boolean) => {
    if (value === false) {
      this._requirement = ToggleMode.MustBeFalse;
    } else if (value === true) {
      this._requirement = ToggleMode.MustBeTrue;
    }

    return this;
  }

  /**
   * Creates props that can be used for an <input> checkbox.
   */
  get props(): TogglePropType {
    return {
      type: "checkbox",
      checked: this._value,
      onChange: this.toggle,
    };
  }

}