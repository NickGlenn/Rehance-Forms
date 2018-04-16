import * as React from "react";
import { FieldState, FormDelegate } from "./";
import { InputState, InputTypeAttribute } from "./fields/input";

export abstract class FormComponent<Props = any, State = any>
  extends React.Component<Props, State>
  implements FormDelegate {

  private _fields: { [name: string]: FieldState } = {};

  /**
   * Add a custom field type to the form.
   */
  custom = (name: string, field: FieldState) => {
    return this._fields[name] = field;
  }

  /**
   * Creates a new input state manager and adds it to the form.
   */
  input = (name: string, type?: InputTypeAttribute) => {
    return this._fields[name] = new InputState(this, name, type);
  }

  /**
   * Creates a new textarea input manager and adds it to the form.
   */
  textarea = (name: string) => { }

  /**
   * Creates a new checkbox manager and adds it to the form.
   */
  checkbox = (name: string) => { }

  /**
   * Creates a new radio group manager and adds it to the form.
   */
  radio = (name: string) => { }

  /**
   * Creates a new selection manager and adds it to the form.
   */
  dropdown = (name: string) => { }

  /**
   * Creates a new generic group field manager and adds it to the form.
   */
  group = (name: string, factory: Function) => { }

  /**
   * Returns true if the given fields are considered valid.  If no fields are provided,
   * it will automatically check all of the fields that have been added to the form.
   */
  isValid(fields?: FieldState[]): boolean {
    if (!fields) {
      for (let name in this._fields) {
        if (!this._fields[name].isValid) return false;
      }
    } else {
      for (let field of fields) {
        if (!field.isValid) return false;
      }
    }

    // return true otherwise
    return true;
  }

}




export class ExampleForm extends FormComponent {

  email = this.input("Email", "email").required();
  password = this.input("Password", "password").required();
  // rememberMe = this.checkbox("Remember Me").required();

  render() {
    return (
      <div>
        <input {...this.email.props} />
        <input {...this.password.props} />
        <button disabled={!this.isValid()}>
          Login
        </button>
      </div>
    );
  }

}