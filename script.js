let input = document.getElementById("input")
let output = document.getElementById("output")
let storedInput = ""

function terminalPrint(arr) {
    for (let i = 0; i < arr.length; i++) {
        let p = document.createElement("p")
        p.textContent = arr[i]
        p.style.color = "#00ff00"
        p.style.margin = "2px 0"
        p.style.fontFamily = "'JetBrains Mono', monospace"
        p.style.whiteSpace = "pre"
        p.style.fontSize = "13px"
        output.appendChild(p)
    }
}

function runFastfetch() {
    let now = new Date().toLocaleString()
    let art = [
        " ████████╗██╗   ██╗██╗      ██████╗ ███████╗",
        " ╚══██╔══╝██║   ██║██║     ██╔═══██╗██╔════╝",
        "    ██║   ██║   ██║██║     ██║   ██║███████╗",
        "    ██║   ██║   ██║██║     ██║   ██║╚════██║",
        "    ██║   ╚██████╔╝██║     ╚██████╔╝███████║",
        "",
        " OS: TUI-OS",
        " Developer: Dat-One-Dev (Kartik Patel)",
        " Time: " + now
    ]
    terminalPrint(art)
}

window.addEventListener("load", function() {
    setTimeout(runFastfetch, 300)
})

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
            if (text === "fastfetch" || text === "neofetch" || text === "fetch") {
                runFastfetch()
            }
            if (text === "clear") {
                output.innerHTML = ""
            }
            if (text === "help") {
                terminalPrint([
                    "Available commands:",
                    " help      - show this help",
                    " fastfetch - show TUI OS info",
                    " clear     - clear screen",
                    " time      - show current time",
                    " date      - show current date"
                ])
            }
            if (text === "time") {
                let t = new Date().toLocaleTimeString()
                terminalPrint(["Time: " + t])
            }
            if (text === "date") {
                let d = new Date().toLocaleDateString()
                terminalPrint(["Date: " + d])
            }
            input.value = ""
        }
    }
})
