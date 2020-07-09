Game = function(game){}

Game.prototype = {
	init: function(type) {
		console.log("new level");
		console.log(type)
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.currentType = type || "normal"
		this.lifes = this.currentType == "normal" ? 4 : 1;
		this.wave = 1
		this.score = 0
	},
	create:function(){
		// Constants
		this.SHOOT_SPEED = 200;
		this.SHOOT_INTERVAL = 0;
		this.CURRENT_TYPE = "";

		this.sky = this.game.add.sprite(0, 0, "bg_sky");
		this.background = this.game.add.sprite(0, 0, "bg_layer4");
		this.background.width = this.game.world.width;
		this.background.height = this.game.world.height;

		if (localStorage.maxScore != null) {
			this.maxScore = parseInt(localStorage.maxScore);
		} else {
			this.maxScore = 0;
		}

		this.createScoreBoard();

		this.player = new Player(this.game, {x: 400, y:400}, 600)
		this.createFloor()
		this.bullets = this.game.add.group()
		this.enemies = this.game.add.group()
		this.createWaves();
	},
	update:function(){
		this.SHOOT_INTERVAL += this.game.time.elapsed
		this.ENEMIES_INTERVAL += this.game.time.elapsed
		this.game.physics.arcade.collide(this.player, this.wall)
		this.game.physics.arcade.collide(this.bullets, this.enemies, this.bulletCollision, null, this)
		this.game.physics.arcade.collide(this.player, this.enemies, this.enemyCollision, null, this)
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.A) && this.SHOOT_INTERVAL >= 300) {
			this.SHOOT_INTERVAL = 0; 
			this.shooting('brown')
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.S) && this.SHOOT_INTERVAL >= 300) {
			this.SHOOT_INTERVAL = 0; 
			this.shooting('cream')
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) && this.SHOOT_INTERVAL >= 300) {
			this.SHOOT_INTERVAL = 0; 
			this.shooting('fly')
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.F) && this.SHOOT_INTERVAL >= 300) {
			this.SHOOT_INTERVAL = 0; 
			this.shooting('red')
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.G) && this.SHOOT_INTERVAL >= 300) {
			this.SHOOT_INTERVAL = 0; 
			this.shooting('yellow')
		}
	},
	createScoreBoard: function() {
		this.lifeText = this.game.add.text(10, 20, 'Vidas: ' + this.lifes)
		this.scoreText = this.game.add.text(this.game.world.centerX, 20, 'Score: ' + this.score)
		this.highScoreText = this.game.add.text(this.game.world.centerX + 200, 20, 'Max Score: ' + this.maxScore)
	},
	createFloor: function() {
		this.wall = new Wall(this.game, {x: 0, y: this.game.height - 60})
	},
	shooting: function(key) {
		this.CURRENT_TYPE = key
		let bullet = this.bullets.getFirstDead();
		if (bullet && this.CURRENT_TYPE == bullet.key) {
			bullet.reset(this.player.x, this.player.y)
			bullet.body.velocity.x = this.player.facingTo == 'left' ? -(this.SHOOT_SPEED) : this.SHOOT_SPEED; 
		} else {
			bullet = new Bullet(this.game, {x: this.player.x, y: this.player.y}, key)
			this.bullets.add(bullet)
			bullet.body.velocity.x = this.player.facingTo == 'left' ? -(this.SHOOT_SPEED) : this.SHOOT_SPEED; 
		}
	},
	createWaves: function() {
		this.wave1 = this.waveGenerator(4, 8, ['red'], 0)
		this.wave2 = this.waveGenerator(8, 6, ['red', 'yellow'], 40)
		this.wave3 = this.waveGenerator(16, 4, ['red', 'yellow', 'fly'], 96)
		this.wave4 = this.waveGenerator(32, 3, ['red', 'yellow', 'fly', 'brown'], 192)
		this.wave5 = this.waveGenerator(64, 2, ['red', 'yellow', 'fly', 'brown', 'cream'], 324)
	},
	waveGenerator: function(queue, spawnTime, types, start) {
		this.game.time.events.add(Phaser.Timer.SECOND * start, function () {
			this.game.time.events.repeat(Phaser.Timer.SECOND * spawnTime, queue, function () {
				let enemyKey = types[this.rnd.integerInRange(0, types.length - 1)]
				let enemy = new Enemy(this.game, enemyKey);
				this.enemies.add(enemy);
			}, this);
		}, this); 
	},
	bulletCollision: function(bullet, enemy) {
		if(bullet.key == enemy.imageKey) {
			this.score += enemy.points;
			this.scoreText.text = "Score: " + this.score;
			bullet.kill();
			enemy.kill();
		} else {
			bullet.kill();
		}
	},
	enemyCollision: function(player, enemy) {
		enemy.kill();
		this.lifes--;
		this.lifeText.text = "Life Points: " + this.lifes;
		if (this.lifes >= 0) {
			if (this.score > this.maxScore) {
				localStorage.maxScore = parseInt(this.score);
			}
			this.state.start("GameOver", true, false, this.score, this.maxScore);
		}
	}
}