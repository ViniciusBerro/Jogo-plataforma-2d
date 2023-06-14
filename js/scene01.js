class Scene01 extends Phaser.Scene{
    constructor(){
        super('Scene01')
    }

    preload(){
        this.load.image('sky','img/sky.png')
        this.load.image('plataforma','img/plataforma.png')
        this.load.spritesheet('wolf', 'img/wolf.png', {frameWidth:74,frameHeight: 61})
        this.load.spritesheet('player','img/jogador.png', {frameWidth:58, frameHeight:61})

    }
    create(){
        this.sky = this.add.image(0,0,'sky').setOrigin(0,0)
        this.sky.displayWidth = 1000
        this.sky.displayHeight = 600

        this.player = this.physics.add.sprite(50,450, 'player')
        .setCollideWorldBounds(true)
        .setScale(1)
        .setBounce(.4)
        this.player.canJump = true
        this.player.body.setSize(40,55)
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player',{
                start:1,
                end:8
            }),
            frameRate: 8,
            repeat: -1
        })

        this.control = this.input.keyboard.createCursorKeys()

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(0,600,'plataforma')
        .setScale(3.5,1)
        .setOrigin(0,1)
        .refreshBody()
        this.platforms.create(100,300,'plataforma')
        .setScale(2,0.5).refreshBody()
        this.platforms.create(600,400,'plataforma')
        .setScale(0.75,0.5).refreshBody()
        this.platforms.create(800,150,'plataforma')
        .setScale(2,0.5).refreshBody()

        this.mPlatforms = this.physics.add.group({
            allowGravity: false,
            immovable: true
        })

        let mPlatforms = this.mPlatforms.create(150,475,'plataforma').setScale(.25,.5)
            mPlatforms.speed = 2
            mPlatforms.minX = 150
            mPlatforms.maxX = 300

        this.xp = 0
        this.txtXp = this.add.text(15,15,`XP:${this.xp}`).setScrollFactor(0)
        
        this.txtTitle = this.add.text(15,28,`Nivel 1`).setScrollFactor(.4)
        
        this.enemies = this.physics.add.group()
        let enemy = this.enemies.create(Phaser.Math.Between(50, 950),0, 'wolf')
        .setBounce(.2)
        .setCollideWorldBounds(true)
        .setVelocity(Math.random() < .5 ? -200 : 200, 50)
        

        this.physics.add.collider(this.player, this.mPlatforms, this.platformsMoveThings)
        this.physics.add.collider(this.enemies, this.mPlatforms, this.platformsMoveThings)
        this.physics.add.collider(this.player, this.enemies, this.enemyHit, null, this)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemies, this.platforms)

        this.physics.world.setBounds(0,0,1000, 600)
        this.cameras.main.startFollow(this.player).setBounds(0,0,1000, 600)
        let life = 1
        this.gameOver = false
    }
    enemyHit(player, enemy){
        this.physics.pause()
        player.setTint(0xff0000)
        player.anims.stop()
        this.gameOver = true
    }
    movePlatform(p){
        if(p.x < p.minX || p.x > p.maxX){
            p.speed *= -1
        }
        p.x += p.speed
    }
    platformsMoveThings(sprite,plat){
        sprite.x += plat.speed
    }
    update(){
        if(!this.gameOver){
            if(this.control.left.isDown){
                this.player.flipX = true
                this.player.anims.play('walk',true)
                this.player.setVelocityX(-150)
            }else
            if(this.control.right.isDown){
                this.player.flipX = false
                this.player.anims.play('walk',true)
                this.player.setVelocityX(150)
            }
            else{
                this.player.setVelocityX(0).setFrame(0)
            }
            if(this.control.up.isDown && this.player.canJump && this.player.body.touching.down){
                this.player.setVelocityY(-600)
                this.player.canJump = false
            }

            if(!this.control.up.isDown && !this.player.canJump){
                this.player.canJump = true
            }

            this.mPlatforms.children.iterate((plat) => {
                this.movePlatform(plat)
            })
        }
    }
}