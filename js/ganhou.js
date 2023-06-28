class Ganhou extends Phaser.Scene{
    constructor(){
        super('Ganhou')
    }
    create(){
        setTimeout(()=>{
            this.add.text(game.config.width/2,game.config.height/3,"Você salvou o Reino",{fontSize: '45px', })
            .setOrigin(.5)
            this.add.text(game.config.width/2,game.config.height/2,"parabéns",{fontSize: '32px'})
            .setOrigin(.5).setShadow(0,0,'#000',3)
            .setScrollFactor(0)
            this.input.keyboard.addKey('enter')
            .on('down',()=>{
                this.scene.start('StartScene')
            })
        },1000)
    }
}