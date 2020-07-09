Menu = function(game){}

Menu.prototype = {
	create:function() {
		this.sky = this.game.add.sprite(0, 0, "bg_sky");
		this.background = this.game.add.sprite(0, 0, "bg_layer4");
		this.background.width = this.game.world.width;
		this.background.height = this.game.world.height;
		this.title = this.game.add.text(0, 0, 'Examen Final', {fontSize: 20})
		this.title.anchor.setTo(0.5);
		this.title.x = this.game.world.centerX
		this.title.y = this.game.world.centerY -50
		this.play = this.game.add.text(0, 0, 'Play', {fontSize: 20})
		this.play.anchor.setTo(0.5);
		this.play.x = this.game.world.centerX
		this.play.y = this.game.world.centerY
		this.play.inputEnabled = true;
		this.play.events.onInputDown.add(this.goSelection, this);
	},
	goSelection:function() {
		this.state.start("Selection");
	}
}