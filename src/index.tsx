import { Toggle } from "./fields/toggle";
import { Input } from "./fields/input";
import { email as isEmail } from "./validation";
import { Collection } from "./fields/collection";
import { FieldFactory } from "./fields/list";
import { FieldGroupType } from "./fields/group";

export * from "./fields/input";
export * from "./fields/toggle";
export * from "./fields/group";
export * from "./fields/list";
export * from "./fields/collection";
export * from "./validation";
export * from "./hoc";

export interface FormDelegate {
  forceUpdate(): void;
}

export interface FieldState<ValueType = any, PropType = any> {
  readonly value: ValueType;
  readonly isValid: boolean;
  readonly props: PropType;
}

/**
 * Creates and returns a new state manager for a Toggle control.
 */
export function toggle(form: FormDelegate, initialValue: boolean) {
  return new Toggle(form, initialValue);
}

/**
 * Creates a collection of field groups.
 */
export function collectionOf<FieldTypes = any>(form: FormDelegate, factory: FieldFactory<FieldGroupType<FieldTypes>, FieldTypes>) {
  return new Collection<FieldTypes>(form, factory);
}

export namespace input {

  /**
   * Creates a standard text input.
   */
  export function text(form: FormDelegate, initialValue: string) {
    return new Input(form, "text", initialValue);
  }

  /**
   * Creates an email input.
   */
  export function email(form: FormDelegate, initialValue: string) {
    return new Input(form, "email", initialValue).rules(isEmail());
  }

  /**
   * Creates a password input.
   */
  export function password(form: FormDelegate, initialValue: string) {
    return new Input(form, "password", initialValue);
  }

}