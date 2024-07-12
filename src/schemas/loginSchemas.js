import { string, object, } from "yup";

export const loginSchema = object().shape({
    email: string().email("Invalid email").required("This field is required"),
    password: string().required("This field is required"),
});