let game
window.onload = function(){
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [Scene01],
        physics:{
            default: 'arcade',
            arcade: {
                gravity: {y: 1000},
                debug: true
            }
        },
        pixelArt: true
    }
    game = new Phaser.Game(config)
}