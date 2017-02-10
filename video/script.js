var ctx = canvas.getContext('2d'), /// get canvas
    w = canvas.width, /// cache dimensions
    h = canvas.height,
    video1 = document.createElement('video'), /// two video elements
    video2 = document.createElement('video'),
    isVideo1 = false, /// toggler
    list = [], /// video list
    current = 0, /// index
    isPlaying = false; /// is video playing

/// add event handlers so we know when a video finished
video1.addEventListener('ended', play, false);
video2.addEventListener('ended', play, false);

/**
 *  Then we add a few videos to our list
 */

/// first arg. is always mp4 version, second anything else (ogg, webm etc)
addVideo('1.mp4', '1.mp4');
addVideo('2.mp4', '2.mp4');
addVideo('3.mp4', '3.mp4');
addVideo('4.mp4', '4.mp4');
addVideo('5.mp4', '5.mp4');

/// here you re-sort your list with the random (see details for list)
list.sort(function(a, b) {
    return 0.5 - Math.random()
});

/// get first video
getVideo(list[0], play);

/// start loop
render();

/// this will start play the videos
function play() {

    /// what video to start
    var video = (isVideo1 === false ? video1 : video2),
        next = current;

    /// toggle
    isVideo1 = !isVideo1;

    /// get next video in list
    next++;
    if (next > list.length - 1) next = 0;

    if (list.length > 0) getVideo(list[next]);

    /// start video
    video.play();
    isPlaying = true;

    current = next;
}

/// this draws the video frames to canvas
function render() {
    if (isPlaying) {
        var video = (isVideo1 === true ? video1 : video2);
        ctx.drawImage(video, 0, 0, w, h);
    }
    requestAnimationFrame(render);
}

/// this function adds a video to the list
function addVideo(urlMP4, url) {
    list.push({
        urlMP4: urlMP4,
        url: url,
        isReady: false
    })
}

/// start download a video
function getVideo(vid, callback) {

    var video = (isVideo1 === false ? video1 : video2),
        me = this;

    video.addEventListener('canplay', canPlay, false);;

    function canPlay(e) {
        video.removeEventListener('canplay', canPlay, false);
        vid.isReady = true;
        if (typeof callback === 'function')
            callback(vid);
    }

    if (video.canPlayType("video/mp4").length > 0) {
        video.src = vid.urlMP4;
    } else {
        video.src = vid.url;
    }
}
