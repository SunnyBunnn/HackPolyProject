var ctx
var mazeimage
var canvas

window.addEventListener('load', function(){
        
    mazeimage = document.getElementById("maze")
    console.log(mazeimage)

    canvas = document.getElementById("mazeCanvas")

    let size = Math.min(window.innerWidth, window.innerHeight)
    canvas.width  = size;
    canvas.height = size;

    // context.webkitImageSmoothingEnabled = false;
    // context.mozImageSmoothingEnabled = false;
    // context.imageSmoothingEnabled = false;

    // canvas.getContext('2d').drawImage(mazeimage, 0, 0, canvas.width, canvas.height)

    ctx = canvas.getContext('2d')

    resetGame();

    var outer = document.getElementById("outer")
    outer.addEventListener('mousemove', onMouseMove, false)
})

var gameStart = false;

function resetGame() {
    gameStart = false;
    ctx.reset()
    
    ctx.beginPath();
    ctx.arc(0, 224, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
}

function onMouseMove(event) {
    const { offsetX, offsetY } = event;

    if (gameStart) {
        ctx.reset();
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, 30, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(mazeimage, 0, 0, canvas.width, canvas.height)

        const colorData = ctx.getImageData(offsetX, offsetY, 1, 1).data;
        // console.log(colorData);

        if (colorData[1] < 176) {
            console.log("YOU FAILLLEDDDDDDD")
            resetGame();
        }
    } else {
        const colorData = ctx.getImageData(offsetX, offsetY, 1, 1).data;
        // console.log(colorData);

        if (colorData[1] == 128) {
            gameStart = true;
        }
    }
}