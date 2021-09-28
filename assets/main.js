window.onload = function () {
    fetch("/api/entries")
        .then(response => response.json())
        .then(data => setup_proj(data))
}

function get_entry() {
    return window.entries[window.index]
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function set_ui(entry) {
    speechSynthesis.cancel();

    const synth = new Tone.Synth().toDestination();
    hertz = (300 / (window.entries.length)) * (window.index + 1)
    synth.triggerAttackRelease(hertz + "hz", "8n")

    document.getElementById("text").innerText = entry.text
    //textFit(document.getElementById("text"))
    document.getElementById("index").innerText = window.index + 1 + " / " + window.entries.length

    document.getElementById("body").style.backgroundColor = entry.color
    document.getElementById("body").style.color = invertColor(entry.color)
    
    say(entry.text)
}

function say(text) {
    let utterance = new SpeechSynthesisUtterance(text)

    speechSynthesis.speak(utterance)
}

function increment_entry() {
    if (window.index > window.entries.length - 2) {
        window.index = 0
    } else {
        window.index += 1
    }
}

function next_entry() {
    increment_entry()
    set_ui(get_entry())
}

function setup_proj(data) {
    window.entries = data
    window.index = 0
    window.last_change = 0
    if (localStorage.getItem("min_interval") == undefined) {
        localStorage.setItem("min_interval", 1000)
    }

    document.getElementById("delay-inp").value = localStorage.getItem("min_interval") / 1000

    document.addEventListener("keyup", function(event) {
    if (window.last_change + parseInt(localStorage.getItem("min_interval")) < new Date().getTime()) {
        window.last_change = new Date().getTime()
        next_entry()
    }
});

    set_ui(get_entry())
}

function set_min_delay() {
    data = document.getElementById("delay-inp").value

    if (!parseFloat(data)) {
        alert("That number (for the minimum delay) is invalid and has not been set.")
        return;
    }
    localStorage.setItem("min_interval", data * 1000)
}