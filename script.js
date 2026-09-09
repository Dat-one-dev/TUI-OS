let input = document.getElementById("input")
let output = document.getElementById("output")

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        let text = input.value
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
