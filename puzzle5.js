
var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

 var imgOrder = ["41","42","43",  "44", "45", "46", "47",  "3","48"];
//var imgOrder = ["44", "48", "42", "3", "49","47", "46", "45", "43"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("3.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
    checkWin();
    playSound();
    //addbutton();
    /*if(imgOrder == ["1", "2", "3", "4", "5", "6", "7", "8", "9"]){
        alert();
    }*/
}
function checkWin() {
    let tiles = document.getElementById("board").getElementsByTagName("img");
    let currentOrder = Array.from(tiles).map(tile => tile.src.split('/').pop().split('.').shift()); // Assumes image names are the numbers
    let winningOrder =["41","42","43",  "44", "45", "46", "47",  "48","3"];
    if (currentOrder.every((val, index) => val === winningOrder[index])) 
    {
        //alert("puzzle is complete");
        addbutton();
        showFullScreenGif();
        playSoundEffect();
    }
}
function addbutton()
{
    var button=document.createElement("button");
    button.innerHTML="NEXT LEVEL";
    button.onclick=function()
    {
        window.location.href="puzzle61.html";
    };
    document.body.appendChild(button);
}
function showFullScreenGif() {
    // Create the full-screen overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'transparent';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.cursor = 'pointer';

    // Create the img element for the GIF
    const gif = document.createElement('img');
    // Replace 'your-gif-url.gif' with the actual URL or path to your GIF
    gif.src = 'win.gif';
    gif.style.maxWidth = '50%';
    gif.style.maxHeight = '50%';

    // Append the img to the overlay
    overlay.appendChild(gif);

    // Append the overlay to body
    document.body.appendChild(overlay);

    // Add click event to close the overlay
    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}
function playSoundEffect() {
    // Creating a new audio object
    var soundEffect = new Audio('winsound.mp3');
    
    // Playing the sound
    soundEffect.play()
        .then(() => {
            console.log("Sound played successfully");
        })
        .catch(error => {
            console.error("Error playing the sound:", error);
        });
    }
    function playSound() {
        // Creating a new audio object
        var soundEffect = new Audio('slide.mp3');
        
        // Playing the sound
        soundEffect.play()
            .then(() => {
                console.log("Sound played successfully");
            })
            .catch(error => {
                console.error("Error playing the sound:", error);
            });
    }