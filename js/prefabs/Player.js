Player = function(game,position,gravity){
	Phaser.Sprite.call(this,game,position.x,position.y,'dude');
	this.game = game;
	this.gravity = gravity;
	this.anchor.setTo(0.5);	
	this.game.physics.arcade.enable(this);	
	this.animations.add("left",[0,1,2,3],10,true);	
	this.animations.add("right",[5,6,7,8],10,true);	
	this.body.gravity.y = this.gravity;
	this.body.collideWorldBounds = true
	this.frame = 4;
	this.game.add.existing(this);
	this.keys = this.game.input.keyboard.createCursorKeys();
	this.RUNNING_SPEED = 100;
	this.JUMPING_SPEED  = 600;
	this.facingTo = 'player'
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	this.body.velocity.x = 0;
    if(this.keys.left.isDown) {
      this.body.velocity.x = -this.RUNNING_SPEED;
      this.scale.setTo(1,1);
	  this.animations.play("left");
	  this.facingTo = 'left'
    }
    else if(this.keys.right.isDown){
      this.body.velocity.x = this.RUNNING_SPEED;
	  this.animations.play("right");
	  this.facingTo = 'right'
    }else{
      this.animations.stop();
	  this.frame = 4;
	  this.facingTo = 'player'
    }
    if(this.keys.up.isDown 
		&& (this.body.touching.down || this.body.blocked.down))
		{
        this.body.velocity.y = -this.JUMPING_SPEED;
    }
}
