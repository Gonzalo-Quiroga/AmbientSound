// Song data
const songList = [
    {

        title: "LLuvia",
        file: "RainSound.mp3",
        cover: "Nube.png",
        background: "Rain.mp4"

    },
    {

        title: "Noche",
        file: "NightSound.mp3",
        cover: "Luna.png",
        background: "Night.mp4"

    },
    {

        title: "Cascada",
        file: "WaterfallSound.mp3",
        cover: "Cascada.png",
        background: "Waterfall.mp4"

    },
    {

        title: "Playa",
        file: "BeachSound.mp3",
        cover: "Palmera.png",
        background: "Beach.mp4"

    },
]

// Sonido actual
let actualSong = null

// Capturar elementos del DOM para trabajar en JS
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)

// Escuchar el elemento AUDIO
audio.addEventListener("timeupdate", updateProgress)

// Escuchar clicks en los controles
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

// Cargar sonidos y mostrar el listado
function loadSongs() {
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li")
        // Crear a 
        const link = document.createElement("a")
        // Hidratar a
        link.textContent = song.title
        link.href = "#"
        // Escuchar clicks
        link.addEventListener("click", () => loadSong(index))
        // Añadir a li
        li.appendChild(link)
        // Añadir li a ul
        songs.appendChild(li)
    })
}

// Cargar sonido seleccionado
function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeBackground(songIndex)
        changeCover(songIndex)
        changeSongtitle(songIndex)
    }
}

// Actualizar barra de progreso del sonido
function updateProgress(event) {
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%"
}

// Hacer la barra de progreso clicable
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}

// Actualizar controles
function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

// Reproducir sonido
function playSong() {
    if (actualSong !== null) {
        audio.play()
        updateControls()
    }
}

// Pausar sonido
function pauseSong() {
    audio.pause()
    updateControls()
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
    
}

// Cambiar el background de los sonidos
function changeBackground(songIndex) {
    background.src = "./video/" + songList[songIndex].background
} 

// Cambiar el cover de los sonidos
function changeCover(songIndex) {
    cover.src = "./img/" + songList[songIndex].cover
}

// Cambiar el título de los sonidos
function changeSongtitle(songIndex) {
    title.innerText = songList[songIndex].title
}

// Anterior sonido
function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
}

// Siguiente sonido
function nextSong() {
    if (actualSong < songList.length -1){
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    } 
}

// Lanzar siguiente sonido cuando se acaba el actual
audio.addEventListener("ended", () => nextSong())


// GO!
loadSongs()
