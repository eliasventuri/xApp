var gui = require('nw.gui');

var isMaximized = false;

var Player = function() {
	p = this,
	p.win = gui.Window.get(),

	p.videoId = 0,

	p.config = {
		video: {
			def: '720',
			lang: 'EN'
		},
		subtitles: {
			show: true,
			size: 30,
			color: '#FFFFFF',
			lang: 'ES'
		}
	},

	p.init = function() {

		// Load config
		p.loadConfig();

		// Check if window exists
		p.checkVideoId();

		// Load data from cache
    	if (videoData != null) {
    		var href = videoData.url, subtitles = videoData.subtitles, source = videoData.source;
    	} else {
    		alert(i18n.__('VIDEO_LOAD_ERROR'));
    		p.closeVideo();
    		p.win.close(true);
    		return;
    	}

		// Set title
		if (win.isWin) {

			// Resize player with toolbar
			$('#video-player').height($(window).height());
			$(window).resize(function() {
				$('#video-player').height($(window).height());
			})
		} else if (win.isMac) {
			$('body').addClass('isMac');
		}

    	t.win.on('close', function() {
			if (confirm(i18n.__('CLOSE_VIDEO_ALERT'))) {
				//t.closeVideo();
				this.close(true);
			} else {
				this.focus();
			}
    	})

		var player_container = $('#video-player').show();

    	player_container.empty();

		var tracks = '';
		for (var i in subtitles) {
			if (subtitles[i].def == source.def) {
				tracks += '<track kind="subtitles" src="' + subtitles[i].url + '" srclang="'+subtitles[i].lang.toLowerCase()+'" label="'+(win.languages[subtitles[i].lang]!='undefined'?win.languages[subtitles[i].lang]:subtitles[i].lang)+'" charset="UTF-8" '+((subtitles[i].lang == t.config.subtitles.lang)?'default':'')+' />';
			}
		}

    	$('<video id="player" width="100%" height="100%" preload autoplay><source src="'+href+'" type="video/mp4" />'+tracks+'</video>').appendTo(player_container);

	    var video = $('video');

	    video.mediaelementplayer({
			videoVolume: 'horizontal',
			features: ['playpause','current','progress','duration','fullscreen','volume','tracks','videofit','torrentinfo','fontawesome', 'customtracks'],
			success : function(mediaElement, domObject, player) {
        		t.mePlayer = player;
        		// TODO: Move me into a mediaelement plugin?
				player.container.bind('controlsshown', function() {
					player.container.css('cursor', 'auto')
				})
				player.container.bind('controlshidden', function() {
					player.container.css('cursor', 'none')
				})
			}
		});

	    // Loading info event
		p.loadVideoStats();

    	// Player events

    	// Draggable video window
    	var player_area = player_container.find('.mejs-layers, video');

    	player_area.canDragWindow();

    	// Click event (fullscreen)
    	player_area.dblclick(function(e) {
    		e.preventDefault();
    		win.toggleKioskMode();
    	});
    	player_container.find('.mejs-fullscreen-button').on('click', function() {
    		win.toggleKioskMode();
    	});

    	// Keyboard events
    	$(document).off('keydown.playercontrol').on('keydown.playercontrol', function(e) {
			if (e.preventDefault) e.preventDefault();
    		var key = e.keyCode;
    		switch (key) {
    			// Esc
    			case 27:
    				// Quit fullscreen
    				win.leaveKioskMode();
    				break;
    			// F
    			case 70:
    				win.toggleKioskMode();
    				break;
    		}
    	});

    	// Window events
    	win.on('enter-fullscreen', function() {
			$('body').addClass('fullscreen-mode')
			win.focus();
		})
		win.on('leave-fullscreen', function() {
			$('body').removeClass('fullscreen-mode')
			win.focus();
		})
		win.on('maximize', function () {
			isMaximized = true;
		});
		win.on('unmaximize', function () {
		    isMaximized = false;
		});

	}

	// Config
	p.loadConfig = function() {
		if (localStorage.getItem('config') != null) {
			p.config = JSON.parse(localStorage.getItem('config'));
		} else {
			localStorage.setItem('config', JSON.stringify(t.config));
		}
	}

	// Save config
	p.saveConfig = function() {
		localStorage.setItem('config', JSON.stringify(t.config));
	}

	// Video id
	p.checkVideoId = function() {
		p.videoId = window.videos_last_id;
	}

	p.loadVideoStats = function() {
		var infodiv = $('#mejs-torrent-info');
		win.$(win.document).on('videoLoading'+t.videoId, function(event, percent, speed, active, seeds) {
			infodiv.html(seeds>0 ? speed+'/s - '+active+' '+i18n.__('OF')+' '+seeds+' '+i18n.__('SEEDS') : i18n.__('LOOKING_FOR_SEEDS'));
		});
	}

    // Close video
    p.closeVideo = function() {
    	for (var i in win.windows) {
    		if (win.windows[i] == t.win) {
		    	win.windows.splice(i, 1);
		    	break;
		    }
	    }
    	win.$(win.document).trigger('closeVideo'+t.videoId);
    	$(document).off('keypress.playercontrol');
    	win.close();
    }

	// Initialize
	p.init();

}

var player;

// Drag the window by a specific element
(function( $ ){

  $.fn.canDragWindow = function() {

    return this.each(function(ix, element){

      // Since the -drag CSS property fucks up the touch events, this is a hack so we can drag the window by the video anyway.
      var mouseIsDown = false;
      var previousPos = {};

      // TODO: This breaks under multiple screens on Windows (it won't go outside the screen it's on)
      $(element).mousedown(function(event){
        // Only move with the left mouse button
        if( event.button != 0 ){ return; }
        mouseIsDown = true;
        previousPos = {x: event.screenX, y: event.screenY};
      }).mouseup(function(event){
        mouseIsDown = false;
      }).mousemove(function(event){

        var thisPos = {x: event.screenX, y: event.screenY};
        var distance = {x: thisPos.x - previousPos.x, y: thisPos.y - previousPos.y};
        previousPos = thisPos;

        if( mouseIsDown && !window.player.win.isKioskMode ){
        	event.preventDefault();
          	window.moveBy(distance.x, distance.y);
        }
      });

    });

  };

})( jQuery );
