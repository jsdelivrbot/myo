var soundSrc = "https://www53.zippyshare.com/d/7qYMcbXe/21914/Ed%20Sheeran%20-%20Perfect%20Music%20Video%20%28mp3cut.net%29.mp3"

var sound = new Howl({
  src: [soundSrc]
});

let id;

Myo.connect('com.salvvador.myo');

Myo.on("connected", function(data, timestamp) {
  Myo.setLockingPolicy("none");
  console.log("Myo successfully connected. Data: " + JSON.stringify(data) + ". Timestamp: " + timestamp + ".");
});

Myo.on('double_tap', function(){
  if (id === undefined) {
    id = sound.play();
  } else if (!sound.playing(id)) {
    sound.play(id);
  } else {
    sound.pause(id);
  }
	this.vibrate();
});

Myo.on('wave_in', function(){
  if (id !== undefined && sound.playing(id)) {
    sound.seek(sound.seek() - 5, id);
  }
	this.vibrate();
});

Myo.on('wave_out', function(){
  if (id !== undefined && sound.playing(id)) {
    sound.seek(sound.seek() + 5, id);
  }
	this.vibrate();
});

Myo.onError = function () {
  console.log("Woah, couldn't connect to Myo Connect");
}

Myo.on("pose", function(pose_name) {
  console.log("Myo pose detected! Pose was: " + pose_name + ".");
});
