Wall = function(game, position, dimension){
    Phaser.TileSprite.call(this, game, position.x, position.y, game.world.width, 60, 'choco');
    this.game = game
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.game.add.existing(this);
}

Wall.prototype = Object.create(Phaser.TileSprite.prototype);
Wall.prototype.constructor = Wall;



