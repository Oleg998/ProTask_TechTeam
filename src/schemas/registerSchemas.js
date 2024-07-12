import { string, object, } from "yup";

export const registerSchema = object().shape({
    name: string().required("This field is required"),
    email: string().email("Invalid email").required("This field is required"),
    password: string().required("This field is required"),
});