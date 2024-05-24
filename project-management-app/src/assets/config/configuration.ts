export const PHONE_PATTERN: string = "^(\\\+\\\d{12}|00\\\d{12}|0\\\d{9})$";
export const EMAIL_PATTERN: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\.[a-zA-Z]{2,4}$";

export class Configuration {

    serverUrl       : string;
    applicationUrl  : string;
    defaultLanguage : string;
    universityCode  : string;
    countryCode     : string;
    toastDuration   : string;

}