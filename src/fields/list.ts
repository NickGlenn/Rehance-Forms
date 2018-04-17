import { FormDelegate } from "..";

export interface FieldFactory<FieldType, FieldValueType> {
  (form: FormDelegate, value: FieldValueType): FieldType;
}

export class List<FieldType extends { value: FieldValueType, isValid: boolean } = any, FieldValueType = any> {

  protected _form: FormDelegate;
  protected _factory: FieldFactory<FieldType, FieldValueType>;
  protected _items: FieldType[] = [];

  /**
   * Construct the list.
   */
  constructor(form: FormDelegate, factory: FieldFactory<FieldType, FieldValueType>) {
    this._form = form;
    this._factory = factory;
  }

  /**
   * Returns all of the immediately nested fields/groups as an array.
   */
  get fields(): FieldType[] {
    return this._items.slice(0);
  }

  /**
   * All of the nested field/group values in a single, indexed array.
   */
  get value(): FieldType[] {
    return this._items.map(getValue);
  }

  /**
   * Is true when all fields in the list are considered valid.
   */
  get isValid(): boolean {
    for (let field of this._items) {
      if (!field.isValid) {
        return false;
      }
    }

    return true;
  }

  /**
   * Maps over each field/group in the list.
   */
  map(fn: (item: FieldType, index: number) => any, thisArg?: any) {
    return this._items.map(fn, thisArg);
  }

  /**
   * Generate and push multiple fields/groups at once.
   */
  fill(values: FieldValueType[], dontUpdate?: boolean) {
    for (let value of values) {
      this.push(value, true);
    }

    if (!dontUpdate) this._form.forceUpdate();

    return this;
  }

  /**
   * Creates a new field/group and pushes it onto the stack.
   */
  push(value: FieldValueType, dontUpdate?: boolean) {
    this._items.push(this._factory(this._form, value));
    if (!dontUpdate) this._form.forceUpdate();

    return this;
  }

  /**
   * Drops the field at the given index.
   */
  drop(index: number) {
    this._items.splice(index, 1);
    this._form.forceUpdate();

    return this;
  }

}

/**
 * Gets the value from the given "field" object.
 */
function getValue(field: { value: any }): any {
  return field.value;
}