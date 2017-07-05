"use strict";


 // this function, defines an enemy that the player must avoid

var Enemy = function(b) {
    // Variables applied to each of our instances go here
    this.a =this.randomSpeed(200, 1010);
    this.b = b;
    this.wMove  = 100;
    this.hMove = 90;
    this.speed = this.randomSpeed(300,500);
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Updates the enemy's position.
Enemy.prototype.update = function(dt) {
//this will multiply any movement by the dt parameter which will ensure the game runs at the same speed forall computers.
    this.a = this.a + this.speed * dt;
    if (this.a > 1000) {
        this.a = this.randomSpeed(-200, -100);
        this.speed = this.randomSpeed(300,500);
    }
};

var allEnemies = [];

//This function draws the enemy on the screen.

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

Enemy.prototype.randomSpeed= function (low_val, high_val)  {
 return Math.floor((Math.random() * (low_val - high_val) + low_val));
}

// this class represents the charachter's image
var Player = function() {
    this.a= 300;
    this.b = 400;
    this.wMove  = 50;
    this.hMove  = 50;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
     "use strict";
    
      var status;
    if (this.b < 42) {
        this.b = 300;
        status.setNewScore(1);
        document.getElementById('score').innerHTML = status.getScore();
        console.log(status.getScore());

        //  say congratulate, if the player won
         
        if (status.getScore() === 5) {
            alert('Congratulations! You won!');
            location.reload();
        }
    }
};

Player.prototype.render = function(dt) {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

// represent the available player moves. and update it's position

Player.prototype.handleInput = function(keyPress) {
    "use strict";
    console.log(keyPress, this.a);
    if (keyPress === 'left') {
        if (this.a < 0) {
            this.a = 0;
        } else {
            this.a -= 103;
        }
    }
    if (keyPress=== 'right') {
        if (this.a > 400) {
            this.a = 300;
        } else {
            this.a += 103;
        }
    }
    if (keyPress === 'down') {
        if (this.b === 386) {
            this.b = 386;
        } else {
            this.b += 86;
        }
    }
    if (keyPress === 'up') {
        this.b -= 86;
    }
    else {
        console.log('Wrong Key');
        return null;
    }

};


// Place all enemy objects in an array called allEnemies


var allEnemies = [
    new Enemy(0, 40),
    new Enemy(20, 80),
    new Enemy(100, 130),
    new Enemy(80, 180),
    new Enemy(120, 220),
    new Enemy(150, 300),
];

// Place the player object in a variable called player

var player = new Player();

// This listens for key presses and sends the keys to your Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);

});

// this function check if an collision is happend, if that happen we say -wanna try again- ?
function checkForCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.a < allEnemies[i].a + allEnemies[i].wMove  &&
            player.a + player.wMove > allEnemies[i].a &&
            player.b < allEnemies[i].b + allEnemies[i].hMove &&
            player.b + player.hMove > allEnemies[i].b) {
            player.a = 200;
            player.b = 300;
            stats.setNewLives(1);
            document.getElementById('lives').innerHTML = stats.getLives();
            if (stats.getLives() === 0) {
                alert('Wanna try again?');
                location.reload();
            }
        }
    }

}



// we use this funcion to check on the player's status -of score and lives-
var status = function() {
    var score = 0;
    var lives = 3;
    return {
        setNewScore: function(n) {
            score = score + n;
        },
        getScore: function() {
            return score;
        },
        setNewLives: function(n) {
            lives = lives - n;
        },
        getLives: function() {
            return lives;
        }
    };
}();

