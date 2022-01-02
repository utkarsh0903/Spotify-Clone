console.log('Welcome to spotify');

let songIndex = 1;
let masterPlay = document.querySelector('.masterplay');
let audioElement = new Audio('./songs/1.mp3');
const myProgressBar = document.getElementById('myProgressBar');
const masterSongName = document.getElementById('masterSongName');
const gif = document.getElementById('gif');
const songItemPlay = document.getElementsByClassName('songItemPlay');


const songs = [
    { songName: '"Rhiannon," Fleetwood Mac', filePath: "./songs/1.mp3", coverPath: "../covers/1.jpg" },
    { songName: '"Eleanor Rigby," The Beatles', filePath: "./songs/2.mp3", coverPath: "../covers/2.jpg" },
    { songName: '"Runaround Sue," Dion', filePath: "./songs/3.mp3", coverPath: "../covers/3.jpg" },
    {
        songName: '"Come On, Eileen," Dexys Runners', filePath: "./songs/4.mp3", coverPath: "../covers/4.jpg"
    },
    { songName: '"Johnny B. Goode," Chuck Berry', filePath: "./songs/5.mp3", coverPath: "../covers/5.jpg" },
    { songName: '"Darling Nikki," Prince', filePath: "./songs/6.mp3", coverPath: "../covers/6.jpg" },
    { songName: '"Me and Bobby McGee," Janis Joplin', filePath: "./songs/7.mp3", coverPath: "../covers/7.jpg" },
    { songName: '"Sweet Caroline," Neil Diamond', filePath: "./songs/8.mp3", coverPath: "../covers/8.jpg" },
    { songName: '"A Boy Named Sue," Johnny Cash', filePath: "./songs/9.mp3", coverPath: "../covers/9.jpg" },
    { songName: '"Daniel," Elton John', filePath: "./songs/10.mp3", coverPath: "../covers/10.jpg" }
]

//Handle Play/Pause clicks
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
        document.getElementById(`${songIndex}`).classList.add('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.remove('fa-pause-circle');
    }
})



const makeAllPlays = () => {
    Array.from(songItemPlay).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(songItemPlay).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        if (audioElement.paused || audioElement.currentTime <= 0
           /*|| e.target.classList.contains('fa-pause-circle')*/) {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            songIndex = parseInt(e.target.id);
            masterSongName.innerText = songs[songIndex - 1].songName;
            audioElement.src = `./songs/${songIndex}.mp3`;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }

        // if (e.target.classList.contains('fa-play-circle')) 
        else if (audioElement.currentTime > 0) {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle')
            gif.style.opacity = 0;
        }
        else {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            songIndex = parseInt(e.target.id);
            masterSongName.innerText = songs[songIndex - 1].songName;
            audioElement.src = `./songs/${songIndex}.mp3`;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    })
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //Progress calculated in percentage
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    //Update in seek bar
    myProgressBar.value = progress;
    if (myProgressBar.value == 100) {
        songIndex = songIndex >= 10 ? 1 : songIndex + 1;
        audioElement.src = `./songs/${songIndex}.mp3`;
        audioElement.play();
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songIndex - 1].songName;
        makeAllPlays();
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    }
});

//Changing according to Seek bar
myProgressBar.addEventListener('change', () => {
    //Current time calculated from percentage to duration
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

//Previous button function
document.querySelector('#previous').addEventListener('click', () => {
    songIndex = songIndex <= 1 ? 1 : songIndex - 1;
    audioElement.src = `./songs/${songIndex}.mp3`;
    audioElement.play();
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex - 1].songName;
    makeAllPlays();
    // document.getElementById(`${songIndex + 1}`).classList.remove('fa-pause-circle');
    // document.getElementById(`${songIndex + 1}`).classList.add('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//Next button function
document.querySelector('#next').addEventListener('click', () => {
    songIndex = songIndex >= 10 ? 1 : songIndex + 1;
    audioElement.src = `./songs/${songIndex}.mp3`;
    audioElement.play();
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex - 1].songName;
    makeAllPlays();
    // document.getElementById(`${songIndex == 1 ? 10 : songIndex - 1}`).classList.remove('fa-pause-circle');
    // document.getElementById(`${songIndex == 1 ? 10 : songIndex - 1}`).classList.add('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
