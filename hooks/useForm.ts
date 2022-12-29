import { useState, useCallback } from "react"

export interface IValidate {
    [key: string]: {
        required?: boolean;
        validate: ( value: any ) => boolean;
        messageError: string;
    }
}

export interface IError {
    [key: string]: string;
}


export function useForm<Type> ( initialState: Type | any, validations: IValidate ) {

    const [values, setValues] = useState<Type>(initialState)
    const [errors, setErrors] = useState<IError>({})
    
    const handlerChange = useCallback( (e: any) => {
        const { name, value } = e.target as { name: string, value: string };
        const newValues = {
            ...values,
            [name]: value
        }
        
        const newErrors = Object.keys(validations).reduce((errors, v) => {
            const { required, validate, messageError } = validations[v];
            if( required && !newValues[v] ) {
                return {
                    ...errors,
                    [v]: "This field is required"
                }
            }
            if( !validate( newValues[v] ) ) {
                return {
                    ...errors,
                    [v]: messageError
                }
            }
            return errors;
        }, {})

        setValues(newValues);
        setErrors(newErrors);
    }, [validations, values])

    const setInitialValues = useCallback(( values: Type ) => setValues(values), []);

    return {
        handlerChange,
        validations,
        setInitialValues,
        values,
        errors
    }

}
