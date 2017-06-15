var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gameObject = (function () {
    function gameObject(str, parent, x, y) {
        this.div = document.createElement(str);
        parent.appendChild(this.div);
        this.x = x;
        this.y = y;
    }
    return gameObject;
}());
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(parent, x, speed, s) {
        var _this = _super.call(this, "block", parent, x, 240) || this;
        s.subscribe(_this);
        _this.height = Enums.Dimensions.blockHeight;
        _this.width = Enums.Dimensions.blockWidth;
        _this.speed = speed;
        ;
        return _this;
    }
    Block.prototype.notify = function () {
        this.speed = 0;
    };
    Block.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Block;
}(gameObject));
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (object1, object2) {
        return (object1.x < object2.x + object2.width &&
            object1.x + object1.width > object2.x &&
            object1.y < object2.y + object2.height &&
            object1.height + object1.y > object2.y);
    };
    Util.removeFromGame = function (go, arr) {
        go.div.remove();
        var i = arr.indexOf(go);
        if (i != -1) {
            arr.splice(i, 1);
        }
    };
    return Util;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(parent) {
        var _this = _super.call(this, "player", parent, 100, 143) || this;
        _this.observers = new Array();
        _this.deadState = 0;
        _this.behaviour = new Running(_this);
        _this.speed = 0;
        _this.height = Enums.Dimensions.playerHeight;
        _this.width = Enums.Dimensions.playerWidth;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Player.prototype.onKeyDown = function (e) {
        console.log(e.key);
        this.behaviour.onkeydown(e);
    };
    Player.prototype.setDead = function (deadState) {
        this.deadState = deadState;
    };
    Player.prototype.getDead = function () {
        return this.deadState;
    };
    Player.prototype.draw = function () {
        this.behaviour.draw();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Player.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Player.prototype.unsubscribe = function (o) {
    };
    return Player;
}(gameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.GO = new Array();
        this.score = 0;
        var container = document.getElementById("container");
        this.GO.push(this.player = new Player(container));
        for (var c = 2000; c < 4000; c += Math.floor(Math.random() * 500) + 200) {
            console.log("block created");
            this.GO.push(new Block(container, c, -5, this.player));
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.score > 0 && this.score < 99) {
            document.getElementById("welcome").innerHTML = "Welcome to 0909257";
        }
        if (this.score > 100 && this.score < 159) {
            document.getElementById("welcome").innerHTML = "Press any key to jump";
        }
        if (this.score > 200 && this.score < 199) {
            document.getElementById("welcome").innerHTML = "Good luck and have fun!";
        }
        if (this.score > 239) {
            document.getElementById("welcome").innerHTML = "";
        }
        for (var _i = 0, _a = this.GO; _i < _a.length; _i++) {
            var g = _a[_i];
            if (g instanceof Player) {
                g.draw();
            }
            if (g instanceof Block) {
                g.draw();
                if (Util.checkCollision(g, this.player)) {
                    this.player.behaviour = new Died(this.player);
                    console.log("endgame");
                    for (var _b = 0, _c = this.player.observers; _b < _c.length; _b++) {
                        var o = _c[_b];
                        o.notify();
                    }
                }
                else {
                    this.updateScore();
                }
                if (g.x <= -30) {
                    Util.removeFromGame(g, this.GO);
                    console.log(this.GO.length);
                }
            }
        }
        if (this.GO.length == 1) {
            this.wonGame();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.updateScore = function () {
        if (this.player.getDead() == 1) {
            document.getElementById("score").innerHTML = "Score : " + Math.round(this.score) + ", press f5 to play again";
        }
        else {
            this.score += 0.1;
            document.getElementById("score").innerHTML = "Score : " + Math.round(this.score);
        }
    };
    Game.prototype.endGame = function () {
        var endDiv = document.getElementById("welcome");
        endDiv.innerHTML = "Game Over<br>Score: " + Math.round(this.score);
        TweenLite.to(endDiv, 2, { ease: SlowMo.ease.config(0.7, 0.7, false), y: 400 });
        this.player.setDead(1);
        this.player.div.classList.add("crashed");
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
    };
    Game.prototype.wonGame = function () {
        var endDiv = document.getElementById("welcome");
        endDiv.innerHTML = "Well done!<br>Your final score: " + Math.round(this.score) + "<br> press f5 to restart";
        TweenLite.to(endDiv, 2, { ease: SlowMo.ease.config(0.7, 0.7, false), y: 400 });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Died = (function () {
    function Died(p) {
        this.player = p;
    }
    Died.prototype.draw = function () {
        var g = Game.getInstance();
        g.endGame();
    };
    Died.prototype.onkeydown = function () {
    };
    return Died;
}());
var Enums;
(function (Enums) {
    var Dimensions;
    (function (Dimensions) {
        Dimensions[Dimensions["playerHeight"] = 128] = "playerHeight";
        Dimensions[Dimensions["playerWidth"] = 60] = "playerWidth";
        Dimensions[Dimensions["blockHeight"] = 31] = "blockHeight";
        Dimensions[Dimensions["blockWidth"] = 32] = "blockWidth";
    })(Dimensions = Enums.Dimensions || (Enums.Dimensions = {}));
})(Enums || (Enums = {}));
var Jumping = (function () {
    function Jumping(p) {
        var _this = this;
        this.player = p;
        this.jumpDirection = -18;
        window.addEventListener("keydown", function (e) { return _this.onkeydown(e); });
    }
    Jumping.prototype.draw = function () {
        this.player.x += this.player.speed;
        this.player.y += this.jumpDirection;
        this.jumpDirection += 1;
        if (this.player.y > 140) {
            this.player.behaviour = new Running(this.player);
        }
    };
    Jumping.prototype.onkeydown = function (e) {
    };
    return Jumping;
}());
var Running = (function () {
    function Running(p) {
        this.player = p;
    }
    Running.prototype.draw = function () {
        this.player.x += this.player.speed;
    };
    Running.prototype.onkeydown = function () {
        this.player.behaviour = new Jumping(this.player);
    };
    return Running;
}());
//# sourceMappingURL=main.js.map