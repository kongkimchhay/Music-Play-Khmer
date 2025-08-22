let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'iamg/fantasy-illustration-colorful-neon-lights-planet_798986-626.avif',
        name : 'ភ្លេង​ ការ',
        artist : 'Son Nang',
        music : 'Music/New Songe12.mp3'
    },
    {
        img : 'iamg/7f685530-bb94-11eb-9fb1-432dec7fe989_original.avif',
        name : 'ប្រពន្ធកំសត់',
        artist : 'Ten na',
        music : 'Music/Tena - ប្រពន្ធ_កំសត់_.mp3'
    },
    {
        img : 'iamg/3ed1439cac2698df92c7e0edfa253b06e5bca650.jpg',
        name : 'បើអស់ចិត្ត',
        artist : 'khaver visna',
        music : 'Music/បើអស់ចិត្ត_​_កែវ​_វាសនា​.mp3'
    },
    {
        img : 'iamg/ab6761610000e5eb54c69da41dd8f1349009450f.jpg',
        name : 'អូនរាំអែន',
        artist : 'Khemrak Sereymun ',
        music : 'Music/អូនរាំអែន_เดังคาราเบล_oknha_Khemmarak_sereymun_.mp3'
    },
    {
        img : 'iamg/334300571_1514670815727293_7798988356445373712_n.jpg',
        name : 'លះបង់ប្រុសសាវ៉ា',
        artist : 'នួនបូលក្ខណ៍',
        music : 'Music/លះបង់ប្រុសសាវ៉ា_នួន_បូលក្ខណ៍.mp3'
    },
    {
        img : 'iamg/185782583_107162738234909_3346343183682126581_n.jpg',
        name : 'មិនគួរផ្ញើនឹងមនុស្សដូចបង',
        artist : 'បូលីពៅ',
        music : 'Music/អនាគតអូន_មិនគួរផ្ញើនឹងមនុស្សដូចបង_បូលី_ពៅ_256kbps_cbr_.mp3'
    },
    {
      img :'iamg/ab6761610000e5eb54c69da41dd8f1349009450f.jpg', 
      name :'បេះដូងអ្នកប្រដាល់',
      artist :'ខេមរៈសេរីមន្ត​​',
      music : 'Music/បេះដូងអ្នកប្រដាល់_ខេមរៈសេរីមន្ត​​_128kbps_.mp3' 
    },
    {
        img :'iamg/ab6761610000e5eb54c69da41dd8f1349009450f.jpg', 
        name :'ស្អប់ខ្លួនឯងភ្លេចអូនមិនបាន',
        artist :'Nang​',
        music : 'Music/បងស្អប់ខ្លួនឯងភ្លេចអូនមិនបាន_128kbps_.mp3' 
    },
 
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}