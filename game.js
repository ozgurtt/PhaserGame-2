var pad, ball, bg, score, cursors, scoreText, levelText, level, health, healthText;
var loop = 1;


var Game = {
    
    preload : function() {
        
        game.load.image('sky', 'starbg.png');
        game.load.image('pad', 'pad.png');
        game.load.image('ball', 'ball.png');
        
    },
    
    create : function() {
        
        ball = [];
        score = 0;
        level = 0;
        health = 0;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.checkCollision.down = false;
        bg = game.add.sprite(0, 0, 'sky');
        
        pad = game.add.sprite(game.world.width * 0.5, game.world.height - 20, 'pad');
        pad.scale.setTo(1.22, 1);
        game.physics.enable(pad, Phaser.Physics.ARCADE);
        pad.body.collideWorldBounds = true;
        pad.body.immovable = true;
        
        var a = 0;
        this.generateball(a);
        
        scoreText = game.add.text(20, 5, 'Score: 0', { font: 'bold 20px lucida console', fill: '#46c0f9'});
        levelText = game.add.text(600, 5, 'Level: 0', { font: 'bold 20px lucida console', fill: '#46c0f9'});
        healthText = game.add.text(300, 5, 'Health: 0', { font: 'bold 20px lucida console', fill: '#46c0f9'});
         
        cursors = game.input.keyboard.createCursorKeys();
                              
    },
    
    update : function() {
        
        game.physics.arcade.collide(pad, ball, function(){
            score += 1;
            scoreText.text = 'Score: ' + score;
            if (score % 5 == 0 && loop < 4){
                level += 1
                levelText.text = 'Level: ' + level;
                if (level % 2 == 0 && level > 0){
                    health += 1;
                    healthText.text = 'Health: ' + health;
                }
                var a = level;
                this.generateball(a);
                if (level % 3 == 0){
                    pad.scale.setTo(1.3, 1);
                }
            }
            else if (score % 15 == 0 && (loop >= 4 && loop < 8)){
                level += 1
                levelText.text = 'Level: ' + level;
                if (level % 2 == 0){
                    health += 1;
                    healthText.text = 'Health: ' + health;
                }
                var a = level;
                this.generateball(a);
                if (level % 3 == 0){
                    pad.scale.setTo(1.3, 1);
                }
            }
        }, null, this);
        if (cursors.left.isDown){
            pad.body.velocity.x = -450 + (level * -15);
        }
        else if (cursors.right.isDown){
            pad.body.velocity.x = 450 + level * 15;
        }
        else{
            pad.body.velocity.x = 0;
        }
        
    },
    
    generateball : function(i){
        
         for(; i < loop; i++){
            ball[i] = game.add.sprite(40 * (Math.random() * 40), 0, 'ball');
            game.physics.enable(ball[i], Phaser.Physics.ARCADE);
            ball[i].body.velocity.set(i * 3 + 90, i * -3 - 100);
            ball[i].body.collideWorldBounds = true;
            ball[i].body.bounce.set(1);
            ball[i].checkWorldBounds = true;
            ball[i].events.onOutOfBounds.add(function() {
                health -= 1;
                healthText.text = 'Health: ' + health;
                if (health == 0 && level > 0){
                    loop = 1;
                    game.state.start('Game_Over');
                }
                if (health == -1){
                    loop = 1;
                    game.state.start('Game_Over');
                }
            }, this);
        }
        loop += 1;
    },
          
};