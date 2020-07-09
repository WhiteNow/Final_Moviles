GameOver = function(game){}

GameOver.prototype = {
	init: function(score, maxScore) {
		this.score = score;
		this.maxScore = maxScore
	},
	create:function(){
		this.goMenuTime = 0
		this.sky = this.game.add.sprite(0, 0, "bg_sky");
		this.background = this.game.add.sprite(0, 0, "bg_layer4");
		this.background.width = this.game.world.width;
		this.background.height = this.game.world.height;

		let title = this.add.text(0,0,'GAME OVER',{
			font : "80px Arial",
			fill : "#000000"
		});
		title.anchor.setTo(0.5);
		title.x = this.game.world.centerX;
		title.y = 200;

		let hiScore = this.add.text(0,0,'Max Score: ' + this.maxScore,{
			font : "66px Arial",
			fill : "#000000"
		});
		hiScore.anchor.setTo(0.5);
		hiScore.x = this.game.world.centerX;
		hiScore.y = 380;		

		let score = this.add.text(0,0,'Your Score: ',{
			font : "66px Arial",
			fill : "#000000"
		});
		score.anchor.setTo(0.5);
		score.x = this.game.world.centerX;
		score.y = 500;
		score.text = "Your Score: " + this.score;
	},
	update: function() {
		this.goMenuTime += this.game.time.elapsed
		if (this.goMenuTime >= 3000) {
			this.goMenu()
		}
	},
	goMenu:function(){
		this.state.start("Menu");
	},
	buttonSelected:function(){
		this.playButton.scale.setTo(this.playButtonScale*1.1)
	},
	buttonReset:function(){
		this.playButton.scale.setTo(this.playButtonScale)
	}
}