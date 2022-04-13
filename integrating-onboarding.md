# Integrating PAAS Onboarding with your application
onboarding part of pass consist of registering institutions on on PAAS.

Requirements for Obarding are:
- having a valid interchangeid
- Ensure the email has not been used on passport
- ensure the bank id has not been used
- ensure the mobile number has not been used on passport.
## Steps to integrate

- Load the application url in an iframe below is an example of how to.
```html
<iframe src="<place paas url here>" class="iframe" id="iframe" frameborder="0"></iframe>
```
- Below is snippet of the JS implementation
```js
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
```
the code snippet above explains how to implement the `JavaScript` aspect of it.

## what Happens when you load your page with `iframe` with the `Javascript` snippet?

- An event listener is triggered on dom load of your application
- When the url in the `iframe` is done loading, it sends an initial message for synchronization.
- PAAS sends a reposponse whic is `loaded` indicating it has received a `loading` action.- This means PAAS is requesting for the application secret to confirm if it can continue communication
- on successful confirmation, it means the app continues sending data between each other.
- `Reconnect` action is to reconfirm the sync.
- `Account created` action stands for when a user has completed the onboarding process.

# Take Note
You will need to provide the url to your app so it can be registered on PAAS UI