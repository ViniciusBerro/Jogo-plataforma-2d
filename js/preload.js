class Preload extends Phaser.Scene{
    constructor(){
        super('Preload')
    }
    preload(){
        this.load.image('sky','img/sky.png')
        this.load.image('plataforma','img/plataforma.png')
        this.load.spritesheet('wolf', 'img/wolf.png', {frameWidth:74,frameHeight: 61})
        this.load.spritesheet('player','img/jogador.png', {frameWidth:58, frameHeight:61})
        this.load.spritesheet('slime', 'img/slime.png', {frameWidth:96,frameHeight: 80})
        this.load.spritesheet('star','img/star.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('vida','img/heart.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('porta','img/porta.png',{frameWidth: 58, frameHeight: 51})
        this.load.spritesheet('boss','img/boss.png',{frameWidth:383,frameHeight:406})
        this.load.spritesheet('bomba','img/bomba.png',{frameWidth:32,frameHeight:29})

    }
    create(){
        

        this.scene.start('StartScene')
    }
}