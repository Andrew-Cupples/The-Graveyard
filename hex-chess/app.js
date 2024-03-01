board_width = 8;
board_height = 8;
peice_size = 50;
let player = 0;
let board = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
let selected_piece;
let highlight_objs = [];


// new


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const a = 2 * Math.PI / 6
const r = 40;

let hexBoard = [[0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,1,0,1,0,0,0,0],[0,0,0,1,0,1,0,1,0,0,0],[0,0,1,0,1,0,1,0,1,0,0],[0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]];
let hexArray = [];



class hex {
    constructor(color, x, y, active) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.active = active;
    }
}

main();

function drawHex(x , y) {
    // if(hexBoard[x][y] == 1) {
        ctx.beginPath();
        for(let i = 0; i < 6; i++) {
            ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
        }
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.stroke();
        let h = new hex();
        h.color;
        h.x = x;
        h.y = y;
        h.active = "true";
        hexArray.push(h)
    // }
}


function drawHexGrid(width, height) {
    for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
      for (let x = r, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
        drawHex(x, y);
      }
    }
  }

function main() {    
    drawHexGrid(canvas.width,canvas.height);
    // makeBoard();
    // createPeices();

}


function makeBoard () {
    let switcher = 1;
    for(let i = 0; i < board_width; i++) {
        if(switcher == 0) {
            switcher = 1;
        } else {
            switcher = 0;
        }

        for(let j = 0; j < board_height; j++) {
            const element = document.createElement('div');
            element.classList.add("square" + switcher);
            element.setAttribute("id", i + "_" + j);
            element.setAttribute("x", i);
            element.setAttribute("y", j);
            element.style.position = "absolute"
            element.style.top = j * peice_size + 'px';
            element.style.left = i * peice_size + 'px';
            element.setAttribute("valid", 0);
            element.onclick = tileFunc;
            document.body.appendChild(element);
            
            if(switcher == 0) {
                switcher = 1;
            } else {
                switcher = 0;
            }

        }
    }
}

function tileFunc() {
    if(parseInt(this.getAttribute("valid")) == 1) {
        if(isOccupied(convert(this.getAttribute("x"), this.getAttribute("y"))) == 0) {
            let x = parseInt(this.getAttribute("x"));
            let y = parseInt(this.getAttribute("y"));
            selected_piece.style.top = y * peice_size + 'px';
            selected_piece.style.left = x * peice_size + 'px';
            selected_piece.setAttribute("x", x);
            selected_piece.setAttribute("y", y);
            selected_piece.setAttribute("moved", 1);
            unhighlight();
        }
        if(isOccupied(convert(this.getAttribute("x"), this.getAttribute("y"))) == -1) {
            // take piece
        }
    }
}

function createPeices() {
    let pieces = [];
    let id = 0;
    let x = 0;
    let y = 0;
    // white pawns
    for(let i = 0; i < 8; i++) {
        pieces.push(createPeice("pawn", "white_pawn.png", x, 1, pawnFunc, 0, id))
        id++;
        x++;
    }
    // white bishops
    pieces.push(createPeice("bishop", "white_bishop.png", 2, 0, bishopFunc, 0, id++))
    pieces.push(createPeice("bishop", "white_bishop.png", 5, 0, bishopFunc, 0, id++))

    // white knights
    pieces.push(createPeice("knight", "white_knight.png", 1, 0, knightFunc, 0, id++))
    pieces.push(createPeice("knight", "white_knight.png", 6, 0, knightFunc, 0, id++))

    // white rooks
    pieces.push(createPeice("rook", "white_rook.png", 0, 0, rookFunc, 0, id++))
    pieces.push(createPeice("rook", "white_rook.png", 7, 0, rookFunc, 0, id++))

    // white king
    pieces.push(createPeice("king", "white_king.png", 4, 0, kingFunc, 0, id++))

    // white queen
    pieces.push(createPeice("queen", "white_queen.png", 3, 0, queenFunc, 0, id++))

    // black

    x = 0;
    // black pawns
    for(let i = 0; i < 8; i++) {
        pieces.push(createPeice("pawn", "black_pawn.png", x, 6, pawnFunc, 1, id))
        id++;
        x++;
    }
    // black bishops
    pieces.push(createPeice("bishop", "black_bishop.png", 2, 7, bishopFunc, 1, id++))
    pieces.push(createPeice("bishop", "black_bishop.png", 5, 7, bishopFunc, 1, id++))

    // black knights
    pieces.push(createPeice("knight", "black_knight.png", 1, 7, knightFunc, 1, id++))
    pieces.push(createPeice("knight", "black_knight.png", 6, 7, knightFunc, 1, id++))

    // black rooks
    pieces.push(createPeice("rook", "black_rook.png", 0, 7, rookFunc, 1, id++))
    pieces.push(createPeice("rook", "black_rook.png", 7, 7, rookFunc, 1, id++))

    // black king
    pieces.push(createPeice("king", "black_king.png", 4, 7, kingFunc, 1, id++))

    // black queen
    pieces.push(createPeice("queen", "black_queen.png", 3, 7, queenFunc, 1, id++))

    return pieces;
}

// put inside move functions, at the bottom
function showMoves(possiblePositions) {
    unhighlight();
    possiblePositions.forEach(pos => {
        let element = document.getElementById(pos[0] + "_" + pos[1]);
        if(element != null) {
            highlight(element);
            highlight_objs.push(element);
        }
    })


}

function highlight(element) {
    element.style.outline = "3px solid yellow";
    element.style.border
    element.setAttribute("valid", 1);
}

function unhighlight() {
    highlight_objs.forEach(ele => {
        ele.style.outline = null;
        ele.setAttribute("valid", 0);
    })
    highlight_objs = [];
}


function createPeice(name, fileName, x, y, moveFunc, team, id) {
    const element = document.createElement('div');
    const imgElement = document.createElement('img');
    imgElement.src = 'C:/Users/Arcb0/OneDrive/Desktop/chess-pieces/' + fileName;
    imgElement.classList.add(name + "_" + team);
    if(name == "pawn") {
        element.setAttribute("moved", 0);
    }
    element.appendChild(imgElement);
    element.setAttribute("id", id);
    element.setAttribute("x", x);
    element.setAttribute("y", y);
    element.setAttribute("team", team);
    element.style.position = "absolute"
    element.style.left = x * peice_size + 'px';
    element.style.top = y * peice_size + 'px';
    element.onclick = moveFunc;
    document.body.appendChild(element);
    return element;
}

function convert(x, y) {
    return [parseInt(x), parseInt(y)];
}

function isOccupied(pos) {
    return 0;
}



function possibleMove(pos1, pos2) {
    if(pos1 < 0) {
        return 1;
    }
    if(pos1 > 7) {
        return 1;
    }
    if(pos2 < 0) {
        return 1;
    }
    if(pos2 > 7) {
        return 1;
    }
    return 0;
    if(isOccupied(pos) == 0 || isOccupied(pos) == -1) {
        return pos;
    } else {
        return -1;
    }
}
// queen movement function
function queenFunc() {
    
    selected_piece = this;
    let possiblePositions = [];
    let pos = convert(this.getAttribute("x"), this.getAttribute("y"));
    // right
    let x = 1;
    while(possibleMove(pos[0] + x, pos[1]) == 0) {
        possiblePositions.push([pos[0] + x, pos[1]]);
        x++;
    }
    if(possibleMove(pos[0] + x, pos[1]) == -1) {
        possiblePositions.push([pos[0] + x, pos[1]]);
    }
    // left
    x = 1;
    while(possibleMove(pos[0] - x, pos[1]) == 0) {
        possiblePositions.push([pos[0] - x, pos[1]]);
        x++;
    }
    if(possibleMove(pos[0] - x, pos[1]) == -1) {
        possiblePositions.push([pos[0] - x, pos[1]]);
    }
    // up
    let y = 1;
    while(possibleMove(pos[0], pos[1] + y) == 0) {
        possiblePositions.push([pos[0], pos[1] + y]);
        y++;
    }
    if(possibleMove(pos[0], pos[1] + y) == -1) {
        possiblePositions.push([pos[0], pos[1] + y]);
    }
    // down
    
    y = 1;
    while(possibleMove(pos[0], pos[1] - y) == 0) {
        possiblePositions.push([pos[0], pos[1] - y]);
        y++;
    }
    if(possibleMove(pos[0], pos[1] - y) == -1) {
        possiblePositions.push([pos[0], pos[1] - y]);
    }



    x = 1;
    // down right
    while(possibleMove(pos[0] + x, pos[1] + x) == 0) {
        possiblePositions.push([pos[0] + x, pos[1] + x]);
        x++;
        y++;
    }
    if(possibleMove(pos[0] + x, pos[1] + x) == - 1) {
        possiblePositions.push([pos[0] + x, pos[1] + x]);
    }

    // up left
    x = 1;
    while(possibleMove(pos[0] - x, pos[1] - x) == 0) {
        possiblePositions.push([pos[0] - x, pos[1] - x]);
        x++;
        y++;
    }
    if(possibleMove(pos[0] - x, pos[1] - x) == -1) {
        possiblePositions.push([pos[0] - x, pos[1] - x]);
    }

    // down left
    x = 1;
    y = 1;
    while(possibleMove(pos[0] - x, pos[1] + y) == 0) {
        possiblePositions.push([pos[0] - x, pos[1] + y]);
        x++;
        y++;
    }
    if(possibleMove(pos[0] - x, pos[1] + y) == -1) {
        possiblePositions.push(p[os[0] - x, pos[1] + y]);
    }

    // up right
    x = 1;
    y = 1;
    while(possibleMove(pos[0] + x, pos[1] - y) == 0) {
        possiblePositions.push([pos[0] + x, pos[1] - y]);
        x++;
        y++;
    }
    if(possibleMove(pos[0] + x, pos[1] - y) == -1) {
        possiblePositions.push([pos[0] + x, pos[1] - y]);
    }
    showMoves(possiblePositions);
    selected_piece = this;
}
// pawn movement function
function pawnFunc() {
    let dir;
    if(player == 0) {
        dir = 1
    } else {
        dir = -1;
    }
    selected_piece = this;
    let possiblePositions = [];
    // move forward 1
    let pos = convert(this.getAttribute("x"), this.getAttribute("y"));
    pos[1] = pos[1] + (1 * dir)
    // move forward one,
    if(isOccupied(pos) == 0) {
        possiblePositions.push(pos);
    }

    // attack left
    let posLeft = [pos[0] + 1, pos[1]];
    if(isOccupied(posLeft) == -1) {
        possiblePositions.push(posLeft)
    }

    // attack right
    let posRight = [pos[0] - 1, pos[1]]
    if(isOccupied(posRight) == -1) {
        possiblePositions.push(posRight);
    }
    
    // if first move, allow moving 2
    if(parseInt(parseInt(this.getAttribute("moved"))) == 0) {
        pos = convert(this.getAttribute("x"), this.getAttribute("y"));
        pos[1] = pos[1] + 2 * dir
        if(isOccupied(pos) == 0) {
            possiblePositions.push(pos);
        }
    }
    showMoves(possiblePositions);
    selected_piece = this;
}
// rook movement function
function rookFunc() {
    let possiblePositions = [];
    let pos = convert(this.getAttribute("x"), this.getAttribute("y"));
    // right
    let x = 1;
    while(possibleMove(pos[0] + x, pos[1]) == 0) {
        possiblePositions.push([pos[0] + x, pos[1]]);
        x++;
    }
    if(possibleMove(pos[0] + x, pos[1]) == -1) {
        possiblePositions.push([pos[0] + x, pos[1]]);
    }
    // left
    x = 1;
    while(possibleMove(pos[0] - x, pos[1]) == 0) {
        possiblePositions.push([pos[0] - x, pos[1]]);
        x++;
    }
    if(possibleMove(pos[0] - x, pos[1]) == -1) {
        possiblePositions.push([pos[0] - x, pos[1]]);
    }
    // up
    let y = 1;
    while(possibleMove(pos[0], pos[1] + y) == 0) {
        possiblePositions.push([pos[0], pos[1] + y]);
        y++;
    }
    if(possibleMove(pos[0], pos[1] + y) == -1) {
        possiblePositions.push([pos[0], pos[1] + y]);
    }
    // down
    
    y = 1;
    while(possibleMove(pos[0], pos[1] - y) == 0) {
        possiblePositions.push([pos[0], pos[1] - y]);
        y++;
    }
    if(possibleMove(pos[0], pos[1] - y) == -1) {
        possiblePositions.push([pos[0], pos[1] - y]);
    }

    showMoves(possiblePositions);
    selected_piece = this;

}
// knight movement function. needs work
function knightFunc() {
    selected_piece = this;
    let possiblePositions = []
    let pos = convert(this.getAttribute("x"), this.getAttribute("y"));

    // starting from 5C and moving clockwise
    let moveInt = possibleMove(pos[0] - 2,pos[1] - 1); 
    if(moveInt == 0 || moveInt == -1) {
        possiblePositions.push([pos[0] - 2, pos[1] - 1]);
    }

    moveInt = possibleMove(pos[0] - 1,pos[1] - 2); 
    if(moveInt == 0 || moveInt == -1) {
        possiblePositions.push([pos[0] - 1, pos[1] - 2]);
    }

    moveInt = possibleMove(pos[0] + 1,pos[1] - 2); 
    if(moveInt == 0 || moveInt == -1) {
        possiblePositions.push([pos[0] + 1, pos[1] - 2]);
    }

    moveInt = possibleMove(pos[0] + 2,pos[1] - 1); 
    if(moveInt == 0 || moveInt == -1) {
        possiblePositions.push([pos[0] + 2, pos[1] - 1]);
    }

    moveInt = possibleMove(pos[0] + 2,pos[1]  + 1); 
    if(moveInt == 0 || moveInt == -1) {
        possiblePositions.push([pos[0] + 2, pos[1] + 1]);
    }

    moveInt = possibleMove(pos[0] + 1,pos[1] + 2); 
    if(moveInt == 0 || moveInt == -1) {
        possiblePositions.push([pos[0] + 1, pos[1] + 2]);
    }

    moveInt = possibleMove(pos[0] - 1,pos[1] + 2); 
    if(moveInt == 0 || moveInt == -1) {
        possiblePositions.push([pos[0] - 1, pos[1] + 2]);
    }

    moveInt = possibleMove(pos[0] - 2,pos[1] + 1); 
    if(moveInt == 0 || moveInt == -1) {
        possiblePositions.push([pos[0] - 2, pos[1] + 1]);
    }

    showMoves(possiblePositions);
    selected_piece = this;

}
// king movement function
function kingFunc() {
    selected_piece = this;
    let possiblePositions = [];
    let pos = convert(this.getAttribute("x"), this.getAttribute("y"));
    // h:0, v:1
    if(possibleMove(pos[0], pos[1] + 1) != -1) {
        possiblePositions.push([pos[0], pos[1] + 1]);
    }
    // h:1, v:1
    if(possibleMove(pos[0] + 1, pos[1] + 1) != -1) {
        possiblePositions.push([pos[0] + 1, pos[1] + 1]);
    }
    // h:0, V:-1
    if(possibleMove(pos[0], pos[1] - 1) != -1) {
        possiblePositions.push([pos[0], pos[1] - 1]);
    }
    // h:-1, V: -1
    if(possibleMove(pos[0] - 1, pos[1] - 1) != -1) {
        possiblePositions.push([pos[0] - 1, pos[1] - 1]);
    }
    // h: 1, V: -1
    if(possibleMove(pos[0] + 1, pos[1] - 1) != -1) {
        possiblePositions.push([pos[0] + 1, pos[1] - 1]);
    }
    // h: -1, V: 1
    if(possibleMove(pos[0] - 1, pos[1] + 1) != -1) {
        possiblePositions.push([pos[0] - 1, pos[1] + 1]);
    }
    // h: 1, V: 0
    if(possibleMove(pos[0] + 1, pos[1]) != -1) {
        possiblePositions.push([pos[0] + 1, pos[1]]);
    }
    // h: -1, V: 0
    if(possibleMove(pos[0] - 1, pos[1]) != -1) {
        possiblePositions.push([pos[0] - 1, pos[1]]);
    }
    showMoves(possiblePositions);
}
// bishop movement function
function bishopFunc() {
    selected_piece = this;
    let possiblePositions = [];
    let pos = convert(this.getAttribute("x"), this.getAttribute("y"));
    let x = 1;
    let y = 1;
    // down right
    while(possibleMove(pos[0] + x, pos[1] + x) == 0) {
        possiblePositions.push([pos[0] + x, pos[1] + x]);
        x++;
        y++;
    }
    if(possibleMove(pos[0] + x, pos[1] + x) == - 1) {
        possiblePositions.push([pos[0] + x, pos[1] + x]);
    }

    // up left
    x = 1;
    while(possibleMove(pos[0] - x, pos[1] - x) == 0) {
        possiblePositions.push([pos[0] - x, pos[1] - x]);
        x++;
        y++;
    }
    if(possibleMove(pos[0] - x, pos[1] - x) == -1) {
        possiblePositions.push([pos[0] - x, pos[1] - x]);
    }

    // down left
    x = 1;
    y = 1;
    while(possibleMove(pos[0] - x, pos[1] + y) == 0) {
        possiblePositions.push([pos[0] - x, pos[1] + y]);
        x++;
        y++;
    }
    if(possibleMove(pos[0] - x, pos[1] + y) == -1) {
        possiblePositions.push(p[os[0] - x, pos[1] + y]);
    }

    // up right
    x = 1;
    y = 1;
    while(possibleMove(pos[0] + x, pos[1] - y) == 0) {
        possiblePositions.push([pos[0] + x, pos[1] - y]);
        x++;
        y++;
    }
    if(possibleMove(pos[0] + x, pos[1] - y) == -1) {
        possiblePositions.push([pos[0] + x, pos[1] - y]);
    }
    showMoves(possiblePositions);
    selected_piece = this;
}