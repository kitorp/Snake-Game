var game = new Phaser.Game("100%",
    "100%",
    Phaser.AUTO,
    'tiger-trap', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

var screenWidth, screenHeight;
var boardLeft, boardRight, boardTop, boardBottom;

var texture;
var gems;

var boardPoints = [];

function preload() {
    screenWidth = game.width;
    screenHeight = game.height;

    boardLeft = (screenWidth / 2) - 50;

    game.load.image('ball', 'assets/Circle-xxl.png');
    game.load.image('goat', 'assets/spinObj_01.png');
    game.load.image('tiger', 'assets/Tiger-Face-263x279.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    gems = game.add.group();

    // create board
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 3; j++) {
            createGrid(j, i);
        }
    }

    // Initialize all goat objects
    for (var k = boardPoints.length - 1; k > 11; k--) {
        var position;
        if (k !== 12) {
            position = boardPoints[k];

        } else {
            position = boardPoints[k - 1];
        }
        createGoat(position.x, position.y);
    }

    // Initialize tiger
    var tiger = game.add.sprite(boardPoints[1].x, boardPoints[1].y, 'tiger');
    tiger.scale.setTo(0.125);
    tiger.inputEnabled = true;
    tiger.input.enableDrag();
}

function update() {
    // game.physics.arcade.collide(block, tile);
}

function render() {

}

function createGrid(x, y) {

    if (y === 3 && x !== 1) return;

    var spaceInc = y;
    if (y > 3) {
        spaceInc = 6 - y;
    }

    var space = 0;
    if (x === 0) {
        space = spaceInc * 32;
    } else if (x === 2) {
        space = -(spaceInc * 32);
    }

    var x1 = 256 + space + (x * 128);
    var y1 = 200 + (y * 64);


    var ball = game.add.sprite(x1, y1, 'ball');
    ball.scale.setTo(0.125);

    // ball.inputEnabled = true;
    // ball.input.enableDrag();

    gems.add(ball);

    boardPoints.push({x: x1, y: y1, available: true});
}

function createGoat(x, y) {

    var goat = game.add.sprite(x - 32, y - 32, 'goat');
    goat.scale.setTo(0.50);
    game.physics.arcade.enable(goat);

    goat.inputEnabled = true;
    goat.input.enableDrag();
    goat.input.enableSnap(32, 32, true, true);

    goat.events.onDragStart.add(onDragStart, this);
    goat.events.onDragStop.add(onDragStop, this);

    goat.originalPosition = goat.position.clone();

    var index = boardPoints.findIndex(function (point) {
        return point.x === x && point.y === y
    });
    boardPoints[index].available = false;

    // boardPoints.push({x: x1, y: y1, available: true});
}

function onDragStart(sprite, pointer) {
    sprite.body.moves = false;

}

function onDragStop(sprite, pointer) {
    var perfectPosition = false;
    for (var i = 0; i < this.boardPoints.length; i++) {
        if (!boardPoints[i].available) {
            continue;
        }

        if (pointer.x <= this.boardPoints[i].x + 32 &&
            pointer.x >= this.boardPoints[i].x - 32 &&
            pointer.y <= this.boardPoints[i].y + 32 &&
            pointer.y >= this.boardPoints[i].y - 32) {

            sprite.position.x = this.boardPoints[i].x - 32;
            sprite.position.y = this.boardPoints[i].y - 32;

            boardPoints[i].available = false;
            perfectPosition = true;


            var index = boardPoints.findIndex(function (point) {
                console.log(point);
                console.log(sprite.originalPosition);
                return point.x === sprite.originalPosition.x + 32 && point.y === sprite.originalPosition.y + 32;
            });
            console.log("Index: " + index);
            if (index !== -1) {
                boardPoints[index].available = true;
            }
            sprite.originalPosition = sprite.position.clone();
            break
        }
    }


    if (!perfectPosition) {
        sprite.position.copyFrom(sprite.originalPosition)
    }
}