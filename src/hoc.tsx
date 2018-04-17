import * as React from "react";
import { FormDelegate } from ".";
import { FieldGroupType, Group } from "./fields/group";

export type FormProps<FieldTypes> = {
  onSubmit?(values: FieldTypes): void;
};

/**
 * Generates a higher-order FormWrapper component that manages the configured fields and
 * provides some general utilities for faster form generation and prototyping.
 */
export function form<FieldTypes = any, OwnProps = any>(
  fields: (form: FormDelegate, props: OwnProps) => FieldGroupType<FieldTypes>,
  render: (props: { form: Group<FieldTypes> } & OwnProps) => any,
) {
  return class FormWrapper extends React.Component<OwnProps & FormProps<FieldTypes>> {

    form: Group<FieldTypes>;

    constructor(props: OwnProps, context: any) {
      super(props, context);
      this.form = new Group(fields(this, props));
    }

    submit = () => {
      if (this.props.onSubmit) {
        this.props.onSubmit(this.form.value);
      }
    }

    render() {
      const { onSubmit, ...props } = this.props as any;
      const form = Object.assign(this.form.fields, {
        submit: this.submit,
      });

      return render(Object.assign(props, { form }));
    }
  }
}