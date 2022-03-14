
const onboardingURL = "http://localhost:3000" /* (This is the current production url but may change in the future) */
const applicationSecret = { "action": "Confirm Key", "value": "key1" }

var iFrame = document.getElementById('iframe');
function readEventMsg(ev) {
    // debugger
    if (ev.data && ev.origin === onboardingURL) {
        // debugger

        const message = JSON.parse(ev.data)
        console.log({parentmessage: message})
        if (message.action === "Loaded") {
            console.log("Page loaded") /* Do something with the data from onboarding portal */
            iFrame.contentWindow.postMessage(JSON.stringify(applicationSecret), "http://localhost:3000")
        } else if (message.action === "Reconnect") {
            iFrame.contentWindow.postMessage(JSON.stringify(applicationSecret), "http://localhost:3000")
        } else if (message.action === "Account created") {
            
            window.sessionStorage.setItem("response", ev.data)
            window.location.href="account-created.html"
        }
    }
}
window.addEventListener("DOMContentLoaded", (ev) => {
    window.addEventListener("message", readEventMsg)
})
window.addEventListener("load", (ev) => {
    // debugger
    iFrame.contentWindow.postMessage('{"action":"Loading"}', "http://localhost:3000")

})