Bullet = function(game,position, key){
    Phaser.Sprite.call(this, game, position.x, position.y, key);
    this.key = key
	this.game = game;
	this.anchor.setTo(0.5);	
    this.game.physics.arcade.enable(this);	
    this.scale.setTo(0.3)
    this.checkWorldBounds = true;
	this.outOfBoundsKill  = true;
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;
