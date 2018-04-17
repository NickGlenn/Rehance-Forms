import { FieldState } from "..";

export type FieldGroupType<FieldTypes> = {
  [name in keyof FieldTypes]: FieldState<FieldTypes[name]>;
};

export class Group<FieldTypes = any> {

  private _fields: FieldGroupType<FieldTypes>;

  /**
   * Construct the field group.
   */
  constructor(fields: FieldGroupType<FieldTypes>) {
    this._fields = fields;
  }

  /**
   * Gets all of the field values as single object.
   */
  get value(): FieldTypes {
    let output: FieldTypes = {} as any;

    for (let key in this._fields) {
      output[key] = this._fields[key].value;
    }

    return output;
  }

  /**
   * Is true when all fields in the group are valid.
   */
  get isValid(): boolean {
    for (let key in this._fields) {
      if (!this._fields[key].isValid) return false;
    }

    return true;
  }

}