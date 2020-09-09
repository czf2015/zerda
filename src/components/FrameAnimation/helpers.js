const frame_ani = require('./frameAnimation.js')

export function play_animation({ canvasTargetId, framesUrl, frequency = 20, loop = true, width, height, }) {
    const ani = new frame_ani({
        canvasTargetId, // target canvas ID
        framesUrl, // frames url
        frequency, // count of frames in one second
        loop, // if loop
        width, // source image's width (px)
        height, // source image's height (px)
        // audioIonName: "bgm_1", // ion.sound audio name
        onComplete() { // complete callback
            console.log("Animation loop.");
        },
    });

    // preload & play
    ani.initialize(() => {
        // $("#loading").hide();
        ani.play();
    });
}
