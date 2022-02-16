import { a, b, c } from "../constants";

export function setCookie(cname: string, cvalue: string, minutes: number, domain?: string) {
    const d = new Date();
    d.setTime(d.getTime() + (minutes * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    if (domain) {
        (document[(a+b+c) as keyof Document] as string) = `${cname}=${cvalue};${expires};domain=.${domain};secure;path=/`
    } else {
        (document[(a+b+c) as keyof Document] as string) = `${cname}=${cvalue};${expires};path=/`;
    }
}
export function getCookie(cname: string) {
    let name = cname + "=";
    let ca = (document[(a+b+c) as keyof Document] as string).split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}