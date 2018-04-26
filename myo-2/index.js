const soundSources = [
  "https://www53.zippyshare.com/d/7qYMcbXe/21914/Ed%20Sheeran%20-%20Perfect%20Music%20Video%20%28mp3cut.net%29.mp3",
  "https://www63.zippyshare.com/d/26115718/10192/Weekend%20-%20Ona%20Tanczy%20Dla%20Mnie%20%28Radio%20Edit%29.mp3",
  "./potter.mp3"
];

let sound = [];
soundSources.forEach(function(currnetSound) {
  sound.push(
    new Howl({
      src: [currnetSound]
    })
  );
});

console.log(sound)
let currentSong = 0;
let id;

Myo.connect('com.salvvador.myo');

Myo.on("connected", function(data, timestamp) {
  Myo.setLockingPolicy("none");
  console.log("Myo successfully connected. Data: " + JSON.stringify(data) + ". Timestamp: " + timestamp + ".");
});

Myo.on('double_tap', function(){
  if (id === undefined) {
    id = sound[currentSong].play();
  } else if (!sound[currentSong].playing(id)) {
    sound[currentSong].play(id);
  } else {
    sound[currentSong].pause(id);
  }
	this.vibrate();
});

Myo.on('wave_in', function() {
  if (id !== undefined && sound[currentSong].playing(id)) {
    sound[currentSong].stop(id);
    currentSong--;
    if (currentSong < 0) {
      currentSong = soundSources.length - 1;
    }
    id = sound[currentSong].play();
    this.vibrate();
  }
});

Myo.on('wave_out', function(){
  if (id !== undefined && sound[currentSong].playing(id)) {
    sound[currentSong].stop(id);
    currentSong++;
    if (currentSong >= soundSources.length) {
      currentSong = 0;
    }
    id = sound[currentSong].play();
    this.vibrate();
  }
});

Myo.onError = function () {
  console.log("Woah, couldn't connect to Myo Connect");
}

Myo.on("pose", function(pose_name) {
  console.log("Myo pose detected! Pose was: " + pose_name + ".");
});
