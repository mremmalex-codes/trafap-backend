/**
 *  validate email is a funciton that takes an email string and returns true or false
 *  if the email string matchs the req exp for validating email address
 * */
function email_validator(email: string): boolean {
    const val = email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (val) {
        return true;
    } else {
        return false;
    }
}

export default email_validator;
