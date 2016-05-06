var Game_Over = {
    
    preload : function() {
        
        game.load.image('gameover', 'gameover.png');
    },
    
    create : function() {
        
        this.add.button(0, 0, 'gameover', this.startMenu, this);
        
        scoreText = game.add.text(500, 100, 'Score: 0', { font: 'bold 40px lucida console', fill: '#46c0f9'});
        scoreText.text = 'Score: ' + score;
        
        levelText = game.add.text(500, 200, 'Level: 0', { font: 'bold 40px lucida console', fill: '#46c0f9'});
        levelText.text = 'Level: ' + level;  
                
    },
    
    startMenu : function() {
        
        this.state.start('Menu');
    },
    
};