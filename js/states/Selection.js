Selection = function(game){}

Selection.prototype = {
	create:function(){
		this.sky = this.game.add.sprite(0, 0, "bg_sky");
		this.background = this.game.add.sprite(0, 0, "bg_layer4");
		this.background.width = this.game.world.width;
        this.background.height = this.game.world.height;
		this.normal = this.game.add.text(0, 0, 'Normal', {fontSize: 20})
		this.normal.anchor.setTo(0.5);
		this.normal.x = this.game.world.centerX - 100
		this.normal.y = this.game.world.centerY
		this.normal.type = "normal"
		this.normal.inputEnabled = true;
		this.normal.events.onInputDown.add(this.startGame, this);
		this.parao = this.game.add.text(0, 0, 'Parao sin polo', {fontSize: 20})
		this.parao.anchor.setTo(0.5);
		this.parao.x = this.game.world.centerX + 100
		this.parao.y = this.game.world.centerY
		this.parao.type = "parao"
		this.parao.inputEnabled = true;
		this.parao.events.onInputDown.add(this.startGame, this);
	},
	startGame:function(sprite){
		this.state.start("Game", true, false, sprite.type);
	}
}