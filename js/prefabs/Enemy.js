Enemy = function (game, key) {
    this.imageKey = key
    this.game = game
    // this.generateProperties();
    switch (this.imageKey) {
        case 'brown': {
            this.posX = this.game.rnd.integerInRange(0, game.world.width);
            this.posY = this.game.world.height;
            this.image = 'duck_outline_target_brown'
            this.points = 5
            break;
        }
        case 'cream': {
            this.posX = this.game.rnd.integerInRange(0, game.world.width);
            this.posY = 0;
            this.image = 'creamMocca'
            // Phaser.Sprite.call(this, game, this.posX, this.posY, 'creamMocca')
            this.points = 20
            break;
        }
        case 'fly': {
            this.posX = this.game.rnd.integerInRange(0, 1) * this.game.world.width;
            this.posY = this.game.world.height / 2;
            this.image = 'shipBeige_manned'
            // Phaser.Sprite.call(this, game, this.posX, this.posY, 'shipBeige_manned')
            this.points = 50
            break;
        }
        case 'red': {
            this.posX = this.game.rnd.integerInRange(0, 1) * this.game.world.width;
            this.posY = this.game.world.height - 80;
            this.image = 'springMan_stand'
            // Phaser.Sprite.call(this, game, this.posX, this.posY, 'springMan_stand')
            this.points = 10
            break;
        }
        case 'yellow': {
            this.posX = this.game.rnd.integerInRange(0, 1) * this.game.world.width;
            this.posY = this.game.world.height - 80;
            this.image = 'wingMan1'
            // Phaser.Sprite.call(this, game, this.posX, this.posY, 'creamMocca')
            this.points = 15
            break;
        }
    }
    Phaser.Sprite.call(this, game, this.posX, this.posY, this.image)
    this.anchor.setTo(0.5);
    this.scale.setTo(0.3)
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill  = true;
    this.body.immovable = true;
    this.generateProperties()
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.generateProperties = function () {
    switch (this.imageKey) {
        case 'brown': {
            this.body.velocity.y = -100
            break;
        }
        case 'cream': {
            this.body.velocity.y = 100
            break;
        }
        case 'red': {
            this.body.velocity.x = this.posX > 0 ? -100 : 100
            break;
        }
        case 'fly': {
            this.body.velocity.x = this.posX > 0 ? -100 : 100
            break;
        } 
        case 'yellow': {
            this.body.velocity.x = this.posX > 0 ? -100 : 100
            break;
        } 
    }
}