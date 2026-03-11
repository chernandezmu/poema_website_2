const loader = document.getElementById("loader")
const percentText = document.getElementById("percent")
const verticalContainer = document.getElementById("verticalBar")
const horizontalContainer = document.getElementById("horizontalBar")
const scrollContainer = document.querySelector(".horizontal-scroll")
const startButton = document.getElementById("startBtn")
const startScreen = document.querySelector(".start-screen")
const experience = document.getElementById("experience")

let verticalSegments = []
let horizontalSegments = []

const segmentGap = 8
const verticalSize = 16
const horizontalSize = 16

const verticalCount = Math.floor(window.innerHeight / (verticalSize + segmentGap))
const horizontalCount = Math.floor(window.innerWidth / (horizontalSize + segmentGap))

for (let i = 0; i < verticalCount; i++) {
    let segment = document.createElement("div")
    segment.classList.add("segment", "vertical")
    verticalContainer.appendChild(segment)
    verticalSegments.push(segment)
}

for (let i = 0; i < horizontalCount; i++) {
    let segment = document.createElement("div")
    segment.classList.add("segment", "horizontal")
    horizontalContainer.appendChild(segment)
    horizontalSegments.push(segment)
}

function showLoader() {
    loader.style.display = "flex"
    setTimeout(() => {
        loader.classList.remove("loader-exit")
        loader.classList.add("loader-enter")
    }, 10)
}

function hideLoader() {
    loader.classList.remove("loader-enter")
    loader.classList.add("loader-exit")
    setTimeout(() => {
        loader.style.display = "none"
    }, 1200)
}

function startExperience() {
    loader.classList.add("transition-mode")
    showLoader()
    setTimeout(() => {
        startScreen.style.display = "none"
        experience.style.display = "block"
        window.scrollTo({
            top: 0
        })
        hideLoader()
        setTimeout(() => {
            loader.classList.remove("transition-mode")
        }, 1200)
    }, 500)
}

if (startButton) {
    startButton.addEventListener("click", () => {
        startButton.classList.add("fade-out")
        setTimeout(() => {
            startExperience()
        }, 500)
    })
}

let progress = 0

let loading = setInterval(() => {

    progress++

    percentText.innerText = progress + "%"

    if (progress <= 50) {
        let index = Math.floor((progress / 50) * verticalSegments.length)
        if (verticalSegments[index]) {
            verticalSegments[index].classList.add("active")
        }
    }

    else {
        let index = Math.floor(((progress - 50) / 50) * horizontalSegments.length)
        if (horizontalSegments[index]) {
            horizontalSegments[index].classList.add("active")
        }
    }



    if (progress >= 100) {
        clearInterval(loading)
        setTimeout(() => {
            hideLoader()
        }, 300)
    }
}, 35)

window.addEventListener("scroll",()=>{
    const scrollY = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const maxTranslate = scrollContainer.scrollWidth - window.innerWidth
    const progress = scrollY / maxScroll
    const move = progress * maxTranslate
    scrollContainer.style.transform = `translateX(-${move}px)`
})