let input = document.getElementById("input")
let output = document.getElementById("output")
let storedInput = ""

function terminalPrint(arr) {
    for (let i = 0; i < arr.length; i++) {
        let p = document.createElement("p")
        p.textContent = arr[i]
        p.style.color = "#00ff00"
        p.style.margin = "5px 0"
        p.style.fontFamily = "'JetBrains Mono', monospace"
        output.appendChild(p)
    }
}

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        let text = input.value
        storedInput = text
        if (text !== "") {
            let p = document.createElement("p")
            p.textContent = "> " + text
            p.style.color = "#00ff00"
            p.style.margin = "5px 0"
            output.appendChild(p)
            input.value = ""
        }
    }
})
