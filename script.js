let input = document.getElementById("input")
let output = document.getElementById("output")
let storedInput = ""
let currentDir = "/home/guest"

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

let asciiDigits = {
    "0": [" ███ ", "█   █", "█   █", "█   █", " ███ "],
    "1": ["  █  ", " ██  ", "  █  ", "  █  ", " ███ "],
    "2": [" ███ ", "    █", " ███ ", "█    ", " ███ "],
    "3": [" ███ ", "    █", " ███ ", "    █", " ███ "],
    "4": ["█   █", "█   █", " ████", "    █", "    █"],
    "5": [" ███ ", "█    ", " ███ ", "    █", " ███ "],
    "6": [" ███ ", "█    ", " ███ ", "█   █", " ███ "],
    "7": [" ███ ", "    █", "   █ ", "  █  ", " █   "],
    "8": [" ███ ", "█   █", " ███ ", "█   █", " ███ "],
    "9": [" ███ ", "█   █", " ███ ", "    █", " ███ "],
    ":": ["     ", "  █  ", "     ", "  █  ", "     "]
}

function renderClock() {
    let el = document.getElementById("clock-ascii")
    if (!el) return
    let now = new Date()
    let t = now.toLocaleTimeString("en-GB", { hour12: false })
    let lines = ["", "", "", "", ""]
    for (let ch of t) {
        let art = asciiDigits[ch] || ["     ", "     ", "     ", "     ", "     "]
        for (let i = 0; i < 5; i++) {
            lines[i] += art[i] + " "
        }
    }
    el.textContent = lines.join("\n")
}


let dragSrc = null
function enableDrag() {
    let panels = document.querySelectorAll("#left-panel, #clock-panel, #idk-panel")
    panels.forEach(p => {
        p.addEventListener("dragstart", function(e) {
            dragSrc = p
            e.dataTransfer.effectAllowed = "move"
            p.style.opacity = "0.5"
        })
        p.addEventListener("dragend", function(e) {
            p.style.opacity = "1"
            document.getElementById("layout").classList.remove("dragging")
        })
        p.addEventListener("dragover", function(e) {
            e.preventDefault()
            e.dataTransfer.dropEffect = "move"
            document.getElementById("layout").classList.add("dragging")
        })
        p.addEventListener("drop", function(e) {
            e.preventDefault()
            if (dragSrc && dragSrc !== p) {
                if (p.id === "clock-panel" && dragSrc.id === "idk-panel" || p.id === "idk-panel" && dragSrc.id === "clock-panel") {
                    let parent = document.getElementById("right-panel")
                    let tmp2 = document.createElement("div")
                    parent.insertBefore(tmp2, p)
                    parent.insertBefore(p, dragSrc)
                    tmp2.parentNode.insertBefore(dragSrc, tmp2)
                    tmp2.remove()
                    return
                }
                let tmp = document.createElement("div")
                p.parentNode.insertBefore(tmp, p)
                dragSrc.parentNode.insertBefore(p, dragSrc)
                tmp.parentNode.insertBefore(dragSrc, tmp)
                tmp.remove()
            }
        })
    })
}
document.addEventListener("DOMContentLoaded", function(){
document.querySelectorAll("#left-panel, #clock-panel, #idk-panel").forEach(el => {
    el.addEventListener("dblclick", function() {
        el.style.width = ""
        el.style.height = ""
        el.style.resize = "both"
    })
})
})

let touchSrc = null
document.querySelectorAll("#left-panel, #clock-panel, #idk-panel").forEach(p=>{
    p.addEventListener("touchstart", e=>{ touchSrc=p; p.style.opacity="0.5"; })
    p.addEventListener("touchend", e=>{
        p.style.opacity="1"
        let touch = e.changedTouches[0]
        let target = document.elementFromPoint(touch.clientX, touch.clientY)
        let panel = target.closest("#left-panel, #clock-panel, #idk-panel")
        if(panel && panel!==touchSrc){
            let tmp=document.createElement("div"); panel.parentNode.insertBefore(tmp,panel); touchSrc.parentNode.insertBefore(panel,touchSrc); tmp.parentNode.insertBefore(touchSrc,tmp); tmp.remove();
        }
    })
})

window.addEventListener("load", enableDrag)

window.addEventListener("load", function() {
    setTimeout(runFastfetch, 300)
    renderClock()
    setInterval(renderClock, 1000)
})


let fileContents = {
    "docs/readme.md": "# TUI-OS docs readme",
    "readme.md": "# TUI-OS\n\nWelcome to TUI-OS!\n\nThis is a retro terminal OS in browser.\n\nTry: help, fastfetch, tree, dir, cd",
    "todo.txt": "- fix clock height\n- add draggable\n- add view command\n- polish IDK panel",
    "notes.txt": "Guest notes:\n- TUI-OS is tuff af\n- Dat-One-Dev is the dev",
    "config.json": "{\n  \"theme\": \"green\",\n  \"bg\": \"black\",\n  \"version\": \"0.4.1\"\n}",
    "index.html": "<!DOCTYPE html> ... TUI OS html",
    "style.css": "body { bg: black; color: green; }",
    "script.js": "// terminal logic",
    "file.zip": "[binary file - cannot display]",
    "image.png": "[image: use view to preview]",
    "secret.txt": "shh... you found the secret file!\nTUI-OS is watching you 👀",
    "log.txt": "[2026-09-11] boot ok\n[2026-09-11] user guest logged in",
    "about.txt": "TUI-OS by Dat-One-Dev (Kartik Patel)\nVersion 0.4.1 - tuff af"
}
function viewFile(name) {
    let content = document.getElementById("idk-content")
    let header = document.getElementById("idk-header")
    if (!content) return
    let clean = name.trim()
    let key = clean.split("/").pop()
    let isImage = key.endsWith(".png") || key.endsWith(".jpg") || key.endsWith(".jpeg") || key.endsWith(".gif") || key.endsWith(".webp")
    if (isImage) {
        let src = "https://via.placeholder.com/320x180/00ff00/000000?text=" + encodeURIComponent(key)
        if (key === "image.png") src = "https://picsum.photos/320/180?random=1"
        content.innerHTML = '<img src="' + src + '" style="max-width:100%; border:1px solid #00ff00; display:block; margin:0 auto;"><div style="text-align:center; margin-top:8px; color:#00ff00; font-size:10px;">' + key + ' — preview</div>'
        if (header) header.textContent = "viewing: " + key + " (image)"
        terminalPrint(["opened " + key + " in IDK panel (image preview)"])
        return
    }
    if (fileContents[key]) {
        content.textContent = fileContents[key]
        if (header) header.textContent = "viewing: " + key
        terminalPrint(["opened " + key + " in IDK panel"])
    } else {
        content.textContent = "view: cannot open '" + name + "': No such file"
        terminalPrint(["view: cannot open '" + name + "': No such file"])
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
            if (text === "fastfetch" || text === "neofetch" || text === "fetch") {
                runFastfetch()
            }
            if (text === "clear") {
                output.innerHTML = ""
                let c = document.getElementById("idk-content")
                if (c) c.textContent = "no file opened. try: view readme.md"
                let h = document.getElementById("idk-header")
                if (h) h.textContent = "IDK — file viewer"
            }
            if (text === "help") {
                terminalPrint([
                    "Available commands:",
                    " help      - show this help",
                    " fastfetch - show TUI OS info",
                    " clear     - clear screen",
                    " time      - show current time",
                    " date      - show current date",
                    " pwd       - show current directory",
                    " tree      - show folder structure",
                    " dir/ls    - list directory contents",
                    " cd [dir]  - change directory",
                    " view [file] - view file in IDK panel"
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
            if (text === "pwd") {
                terminalPrint([currentDir])
            }
            if (text.startsWith("cd ")) {
                let target = text.split(" ")[1]
                if (target === "..") {
                    let parts = currentDir.split("/")
                    parts.pop()
                    if (parts.join("/") === "") currentDir = "/"
                    else {
                        parts = currentDir.split("/")
                        parts.pop()
                        let tmp = parts.join("/")
                        if (tmp === "") tmp = "/"
                        currentDir = tmp
                    }
                    terminalPrint([currentDir])
                } else if (target === "/" || target === "/home" || target === "/home/guest" || target === "home") {
                    currentDir = target.startsWith("/") ? target : "/home/guest"
                    terminalPrint([currentDir])
                } else if (target === "docs" || target === "downloads" || target === "tui-os") {
                    if (currentDir === "/home/guest") {
                        currentDir = currentDir + "/" + target
                        terminalPrint([currentDir])
                    } else {
                        terminalPrint(["cd: no such directory: " + target])
                    }
                } else {
                    terminalPrint(["cd: no such directory: " + target])
                }
            } else if (text === "cd") {
                currentDir = "/home/guest"
                terminalPrint([currentDir])
            }
            if (text.startsWith("view ") || text.startsWith("cat ")) {
                let fname = text.split(" ")[1]
                if (!fname) terminalPrint(["view: missing file name"])
                else viewFile(fname)
            } else if (text === "view" || text === "cat") {
                terminalPrint(["view: missing file name"])
            } else if (text === "tree" || text.startsWith("tree ")) {
                let tpath = text.split(" ")[1] || currentDir
                if (tpath === "/home/guest" || tpath === "." || tpath === currentDir) tpath = currentDir
                if (tpath === "/home/guest") {
                    terminalPrint([
                        currentDir,
                        "├── docs/",
                        "│   ├── readme.md",
                        "│   └── todo.txt",
                        "├── downloads/",
                        "│   ├── file.zip",
                        "│   └── image.png",
                        "├── tui-os/",
                        "│   ├── index.html",
                        "│   ├── style.css",
                        "│   └── script.js",
                        "├── notes.txt",
                        "└── config.json"
                    ])
                } else if (tpath === "/home/guest/docs" || tpath === "docs") {
                    terminalPrint([
                        tpath,
                        "├── readme.md",
                        "└── todo.txt"
                    ])
                } else if (tpath === "/home/guest/downloads" || tpath === "downloads") {
                    terminalPrint([
                        tpath,
                        "├── file.zip",
                        "└── image.png"
                    ])
                } else if (tpath === "/home/guest/tui-os" || tpath === "tui-os") {
                    terminalPrint([
                        tpath,
                        "├── index.html",
                        "├── style.css",
                        "└── script.js"
                    ])
                } else if (tpath === "/" || tpath === "/home") {
                    terminalPrint([
                        tpath,
                        "├── home/",
                        "│   └── guest/",
                        "│       ├── docs/",
                        "│       ├── downloads/",
                        "│       └── tui-os/",
                        "├── etc/",
                        "│   └── config/",
                        "└── var/",
                        "    └── log/"
                    ])
                } else {
                    terminalPrint(["tree: cannot access '" + tpath + "': No such directory"])
                }
            }
            if (text === "dir" || text === "ls" || text.startsWith("dir ") || text.startsWith("ls ")) {
                let parts = text.split(" ")
                let path = parts[1] || currentDir
                let fs = {
                    "/": ["home/", "etc/", "var/"],
                    "/home": ["guest/"],
                    "/home/guest": ["docs/", "downloads/", "tui-os/", "notes.txt", "config.json", "secret.txt", "log.txt", "about.txt"],
                    "/home/guest/docs": ["readme.md", "todo.txt"],
                    "/home/guest/downloads": ["file.zip", "image.png"],
                    "/home/guest/tui-os": ["index.html", "style.css", "script.js"],
                    "home": ["guest/"],
                    "docs": ["readme.md", "todo.txt"],
                    "downloads": ["file.zip", "image.png"],
                    "tui-os": ["index.html", "style.css", "script.js"]
                }
                let key = path
                if (path === ".") key = currentDir
                let base = key.split("/").pop()
                if (fs[key]) {
                    terminalPrint(fs[key])
                } else if (fs[base]) {
                    terminalPrint(fs[base])
                } else if (fs[currentDir]) {
                    terminalPrint(fs[currentDir])
                } else {
                    terminalPrint(["dir: cannot access '" + path + "': No such file or directory"])
                }
            }
            input.value = ""
        }
    }
})
