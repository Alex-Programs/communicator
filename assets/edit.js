function remove_entry(uid) {
    console.log(uid)
    element = document.getElementById("entries-body")

    for (let i = 0; i < element.children.length; i++) {
        child = element.children[i]
        if (child.getAttribute("data-uid") === uid) {
            child.remove()
        }
    }

    let xhttp = new XMLHttpRequest()

    xhttp.open("POST", "/api/delete")

    xhttp.setRequestHeader("uid", uid)

    xhttp.send()
}

function reload_after_delay() {
    setTimeout(function () {
        window.location.reload(true)
    }, 1000)
}