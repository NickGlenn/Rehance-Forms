export interface FormDelegate {
  forceUpdate(): void;
}

export interface FieldState<ValueType = any, PropType = any> {
  readonly name: string;
  readonly value: ValueType;
  readonly isValid: boolean;
  readonly props: PropType;
}