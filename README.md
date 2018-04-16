# Rehance-Forms

This library aims to ease the pain of creating forms in React.  It offers support for handling validation and interaction states for both individual fields and the form as a whole.  It is built to work with both native `<input>` elements or custom ones.

## Getting Started

Install via `npm`:

```bash
npm i -S rehance-forms
```

## Quick Start

Rather than creating a higher-order components or relying on context and render props, RehanceForms chooses to expose a new base class for your form components.  This decision was made to allow for your form to have complete control over the fields within it and any additional state you may need to track (like a multi-step form or image upload).

```tsx
import { FormComponent } from "rehance-forms";

export class LoginForm extends FormComponent {

  defineFields({ text, checkbox, group }, props) {
    this.email = text({ type: "email" });
    this.password = text({ type: "password" });
    this.rememberMe = checkbox({ required: false });
  }

  submitForm = () => {
    console.log("form values: ", this.getValues());
  }

  render() {
    return (
      <div>
        <input {...this.email.props} placeholder="Email Address" />
        <span>{this.email.error}</span>
        <input {...this.password.props} placeholder="Password" />
        <span>{this.password.error}</span>
        <input {...this.rememberMe.props} />
        <button disabled={!this.isValid()} onClick={this.submitForm}>
          Submit
        </button>
      </div>
    );
  }

}
```

### Defining Fields

The `defineFields()` method is invoked during the construction of the form component.  It is given two arguments:

1. An object containing factory methods for creating new field types.
2. The props that were passed to the component on construction.

Once the fields are created, you should store them on the component itself for reference later.  The type of field returned is dependent on the factory function called.  The available factories are `text()`, `checkbox()`, `radio()`, `select()`, `textarea()` and `file()`.

### Field Basics

All fields have the following structure:

```tsx
interface Field<ValueType, PropType> {
  readonly key: string;
  readonly value: ValueType;
  readonly error: string;
  readonly errors: string[];
  readonly isValid: boolean;
  readonly isFocused: boolean;
  readonly isDirty: boolean;
  readonly props: PropType;
}
```

| Property      | Description                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| **key**       | The ID or key of the field.  The built-in field types generate this automatically.                             |
| **value**     | The current value of the field (by state, not by element).                                                     |
| **error**     | The first error of all errors for the field.  Will be `null` if no errors are set.                             |
| **errors**    | An array containing all of the errors for the field.  Will be an empty array if there are currently no errors. |
| **isValid**   | Is `true` when there are no errors on the field and the field has been validated.                              |
| **isFocused** | Is `true` when the field is currently focused or active.                                                       |
| **isDirty**   | Is `true` when the user has interacted with the field in some way.                                             |
| **props**     | An auto-generated object containing the compatible props for the HTML component.                               |

### The `props` Property

You may notice above that there is a `prop` property on fields that is marked as `readonly`.  This property is a getter that creates all of the necessary bindings and values for an HTML component.  By using the following syntax below, the `value` is automatically provided to the `<input>` element, along with `ref` bindings and the methods for `onFocus`, `onBlur`, `onChange`, etc...

```tsx
<input {...this.myField.props}>
```

### Checking Form Validity

You can check the validity of all of the fields bound to the form by using the `isValid()` method.  This can be useful for a number of things but is likely most useful for disabling the submit button on your form (as seen in the example above).

```tsx
render() {
  return (
    <div>
      <input {...this.myRequiredField.props} />
      <button disabled={!this.isValid()} onClick={this.submitForm}>
        Submit
      </button>
    </div>
  );
}
```

You can also supply the `isValid()` method with an array of fields if you wish to check a specific selection of fields.  An example use case for this would be if you had a multi-step form and you wanted to ensure that the user didn't proceed to the next step until the current step was valid.

```tsx
render() {
  const isStep1Valid = this.isValid([this.fullName, this.email]);
  const isStep2Valid = this.isValid([this.favFood]);

  return (
    <div>
      <section className="Step-1">
        <div>
          What is your full name?
          <input {...this.fullName.props} />
        </div>
        <div>
          What is your email?
          <input {...this.email.props} />
        </div>
        <button disabled={!isStep1Valid} onClick={this.nextStep}>
          Next Step
        </button>
      </section>
      <section className="Step-2">
        <div>
          What is your favorite food?
          <input {...this.favFood.props} />
        </div>
        <button disabled={!isStep2Valid} onClick={this.nextStep}>
          Next Step
        </button>
      </section>
    </div>
  );
}
```