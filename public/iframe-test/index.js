/**
 * @type {string}
 * the base url of paas on boarding is here
 * the current value is for local development test
 */
const onboardingURL = "http://localhost:3000" /* (This is the current production url but may change in the future) */

/**
 * @typedef MessageObject
 * @type {object}
 * @property {string} action - an activity.
 * @property {string} value - the secret key to be provided by PAAS UI Developer.
 */

/**
 * @type {MessageObject}
 * @constant
 * @default
 * Ensure you have this object on your code (the value will be given to you from PAAS UI)
 * This object is needed for verification so as to allow information flow between the platform
 */
const applicationSecret = { "action": "Confirm Key", "value": "key1" };

/**
 * @type {MessageObject}
 * @constant
 * @default
 */
const loading = {"action":"Loading"}

var iFrame = document.getElementById('iframe');
/**
 * 
 * @param {Event} ev 
 * This function is responsible for sending and receiving data via content postmesssage
 */
function readEventMsg(ev) {
    // debugger
    /**
     * othere are other postmessage events that happen on the platform. So we have to check only for the one from onboardingurl
     */
    if (ev.data && ev.origin === onboardingURL) {

        /** @type {MessageObject} */
        const message = JSON.parse(ev.data)
        // console.log({parentmessage: message})
        switch (message.action) {
            case "Loaded":
                iFrame.contentWindow.postMessage(JSON.stringify(applicationSecret), "http://localhost:3000")
                break;
            case "Reconnect":
                iFrame.contentWindow.postMessage(JSON.stringify(applicationSecret), "http://localhost:3000")
                break;
            case "Account created":
                window.sessionStorage.setItem("response", ev.data) // at this point the data from PAAS UI is stored in the sessionStorage
                window.location.href = "account-created.html" // feel free to replace this line of code with any other implementatio.
                break;
        }
    }
}
window.addEventListener("DOMContentLoaded", (ev) => {
    window.addEventListener("message", readEventMsg)
})
window.addEventListener("load", (ev) => {
    // debugger
    iFrame.contentWindow.postMessage(JSON.stringify(loading), onboardingURL)

})