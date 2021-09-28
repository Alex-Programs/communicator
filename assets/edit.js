function remove_entry(uid) {
    console.log(uid)
    element = document.getElementById("entries-body")

    for (let i = 0; i < element.children.length; i++) {
        child = element.children[i]
        if (child.getAttribute("data-uid") === uid) {
            child.remove()
        }
    }
}