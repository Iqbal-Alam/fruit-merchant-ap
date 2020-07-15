export interface Validator {
    name: string;
    validator: any;
    message: string;
}
export interface FieldConfig {
    fieldKey?:string;
    fieldLabel?: string;
    fieldName?: string;
    fieldType?: string;
    fieldOptions?: string[];
    fieldValue?: any;
    fieldRequired?: number;
    fieldDisabled?: string;
    fieldValidations?: Validator[];

}