class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver')
    }
    create(){
        setTimeout(()=>{
            this.add.text(game.config.width/2,game.config.height/3,"Você morreu",{fontSize: '45px', })
            .setOrigin(.5)
            this.add.text(game.config.width/2,game.config.height/2,"Pressione Enter",{fontSize: '32px'})
            .setOrigin(.5).setShadow(0,0,'#000',3)
            .setScrollFactor(0)
            this.input.keyboard.addKey('enter')
            .on('down',()=>{
                this.scene.start('StartScene')
            })
        },1000)
    }
}