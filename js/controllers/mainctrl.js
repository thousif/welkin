var MainCtrl = angular.module('MainCtrl', ['apiService','ui.bootstrap']);

MainCtrl.controller('MainCtrl',['$scope','apiService',function($scope,api) {

	console.log("in the main ctrl");
	$scope.songs = [];
	$scope.progress = "0%";

	$scope.init = function(playlist) {
	  this.playlist = playlist;
	  this.index = 0;
	  $scope.playing = false;
	  // Display the title of the first track.
	  $scope.current = playlist[0];

	  // Setup the playlist display.
	  // playlist.forEach(function(song) {
	  //   var div = document.createElement('div');
	  //   div.className = 'list-song';
	  //   div.innerHTML = song.title;
	  //   div.onclick = function() {
	  //     player.skipTo(playlist.indexOf(song));
	  //   };
	  //   list.appendChild(div);
	  // });
	};

	$scope.togglePlay = function(id){
		console.log("toggling play ", id);
		$scope.playing ? $scope.Player.pause(id) : $scope.Player.play(id) ;
		return;
	}

	$scope.Player= {
		play: function(index) {
		    var self = this;
		    var sound;
		    $scope.playing = true;
		    self.playlist = $scope.playlist;

		    console.log("playing", self.playlist );

		    index = typeof index === 'number' ? index : self.index;
		    var data = self.playlist[index];

		    $scope.current = data;

		    // If we already loaded this track, use the current one.
		    // Otherwise, setup and load a new Howl.
		    if (data.howl) {
		      sound = data.howl;
		    } else {
		      sound = data.howl = new Howl({
		        src: data.url,
		        format: ['mp3','aac'],
		        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
		        onplay: function() {
		          // Display the duration.
		          $scope.duration = self.formatTime(Math.round(sound.duration()));
		          
		          // Start upating the progress of the track.
		          requestAnimationFrame(self.step.bind(self));

		          // // Start the wave animation if we have already loaded
		          // wave.container.style.display = 'block';
		          // bar.style.display = 'none';
		          // pauseBtn.style.display = 'block';
		        },
		        onload: function() {
		          // Start the wave animation.
		          // wave.container.style.display = 'block';
		          // bar.style.display = 'none';
		          // loading.style.display = 'none';
		        },
		        onend: function() {
		          // Stop the wave animation.
		          // wave.container.style.display = 'none';
		          // bar.style.display = 'block';
		          // self.skip('right');
		        },
		        onpause: function() {
		          // Stop the wave animation.
		          // wave.container.style.display = 'none';
		          // bar.style.display = 'block';
		        },
		        onstop: function() {
		          // Stop the wave animation.
		          // wave.container.style.display = 'none';
		          // bar.style.display = 'block';
		        }
		      });
		    }

		    // Begin playing the sound.
		    sound.play();

		    // Update the track display.
		    // track.innerHTML = (index + 1) + '. ' + data.title;

		    // // Show the pause button.
		    // if (sound.state() === 'loaded') {
		    //   playBtn.style.display = 'none';
		    //   pauseBtn.style.display = 'block';
		    // } else {
		    //   loading.style.display = 'block';
		    //   playBtn.style.display = 'none';
		    //   pauseBtn.style.display = 'none';
		    // }

		    // Keep track of the index we are currently playing.
		    self.index = index;
		},
		pause: function() {
		    var self = this;
		    $scope.playing = false;
		    // Get the Howl we want to manipulate.
		    var sound = self.playlist[self.index].howl;

		    // Puase the sound.
		    sound.pause();

		    console.log("paused");
		    // Show the play button.
		    // playBtn.style.display = 'block';
		    // pauseBtn.style.display = 'none';
	  	},
	  	formatTime: function(secs) {
		    var minutes = Math.floor(secs / 60) || 0;
		    var seconds = (secs - minutes * 60) || 0;

		    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
		},
		step: function() {
		    var self = this;

		    // Get the Howl we want to manipulate.
		    var sound = self.playlist[self.index].howl;

		    // Determine our current seek position.
		    var seek = sound.seek() || 0;
		    $scope.timer = self.formatTime(Math.round(seek));
		    $scope.progress = (((seek / sound.duration()) * 100) || 0) + '%';
		    $scope.$apply();

		    // If the sound is still playing, continue stepping.
		    if (sound.playing()) {
		      requestAnimationFrame(self.step.bind(self));
		    }
		},
		skip: function(direction) {
		    var self = this;
		    
		    if(!self.playlist){
		    	self.playlist = $scope.playlist;
		    }
		    // Get the next track based on the direction of the track.
		    var index = 0;
		    if (direction === 'prev') {
		      index = self.index - 1;
		      if (index < 0) {
		        index = self.playlist.length - 1;
		      }
		    } else {
		      index = self.index + 1;
		      if (index >= self.playlist.length) {
		        index = 0;
		      }
		    }

		    self.skipTo(index);
		},
		skipTo: function(index) {
		    var self = this;

		    // Stop the current track.
		    if (self.playlist[self.index].howl) {
		      self.playlist[self.index].howl.stop();
		    }

		    // Reset progress.
		    $scope.progress = '0%';

		    // Play the new track.
		    self.play(index);
		},
	}

	api.getSongs(function(res){

		$scope.playlist = res; 
		var data;
		for(var i = 0;i<$scope.playlist.length;i++){
			(function(i){
				$scope.playlist[i].id = i;
				data = new Howl({
					src : $scope.playlist[i].url,
					format: ['mp3','aac'],
		        	html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
				})
				console.log(data);
				$scope.playlist[i].duration = $scope.Player.formatTime(Math.round(data.duration()));
			})(i);
		}

		$scope.init($scope.playlist);

	},function(res){
		console.log(res);
	})

}]);


// artists:"Rahat Fateh Ali Khan, Momina Mustehsan"
// cover_image:"http://hck.re/kWWxUI"
// song:"Afreen Afreen"
// url:"http://hck.re/Rh8KTk"