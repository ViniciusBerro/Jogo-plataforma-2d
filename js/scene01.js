class Scene01 extends Phaser.Scene{
    constructor(){
        super('Scene01')
    }

    preload(){
        this.load.image('sky','img/sky.png')
        this.load.image('plataforma','img/plataforma.png')
        this.load.spritesheet('player','img/gurreiro_parado.png', {frameWidth:79, frameHeight:71})
    }
    create(){
        this.sky = this.add.image(0,0,'sky').setOrigin(0,0)
        this.sky.displayWidth = 800
        this.sky.displayHeight = 600

        this.player = this.physics.add.sprite(50,450, 'player')
        .setCollideWorldBounds(true)
        .setScale(1)
        this.player.canJump = true

        this.control = this.input.keyboard.createCursorKeys()

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(0,600,'plataforma')
        .setScale(3,1)
        .setOrigin(0,1)
        .refreshBody()
        this.platforms.create(100,300,'plataforma')
        .setScale(2,0.5).refreshBody()
        this.platforms.create(600,400,'plataforma')
        .setScale(0.75,0.5).refreshBody()

        this.physics.add.collider(this.player, this.platforms)
    }
    update(){
        if(this.control.left.isDown){
            this.player.setVelocityX(-150)
        }else
        if(this.control.right.isDown){
            this.player.setVelocityX(150)
        }
        else{
            this.player.setVelocityX(0)
        }
        if(this.control.up.isDown && this.player.canJump){
            this.player.setVelocityY(-600)
            this.player.canJump = false
        }

        if(!this.control.up.isDown && !this.player.canJump){
            this.player.canJump = true
        }
    }
}