class StartScene extends Phaser.Scene{
    constructor(){
        super('StartScene')
    }
    create(){
        setTimeout(()=>{
            this.add.text(game.config.width/2,game.config.height/3,"Salvador do Reino",{fontSize: '45px'})
            .setOrigin(.5)
            this.add.text(game.config.width/2,game.config.height/2,"Pressione Enter",{fontSize: '32px'})
            .setOrigin(.5)
            this.input.keyboard.addKey('enter')
            .on('down',()=>{
                this.scene.start('Scene01')
            })
        },1000)
    }
}