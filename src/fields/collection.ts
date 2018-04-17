import { List, FieldFactory } from "./list";
import { Group, FieldGroupType } from "./group";
import { FormDelegate } from "..";

export class Collection<FieldTypes = any> extends List<Group<FieldTypes>, FieldTypes> {

  /**
   * Construct the collection.
   */
  constructor(form: FormDelegate, factory: FieldFactory<FieldGroupType<FieldTypes>, FieldTypes>) {
    super(form, (form: FormDelegate, value: FieldTypes) => new Group<FieldTypes>(factory(form, value)));
  }

}