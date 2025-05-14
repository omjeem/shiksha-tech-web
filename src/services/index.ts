import { school } from "./api/school";
import {auth} from "./api/auth"
import {classes} from "./api/class"
import { student } from "./api/student";


const apiServices = {
    school,
    auth,
    classes,
    student
}

export default apiServices