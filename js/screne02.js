class Scene02 extends Phaser.Scene{
    constructor(){
        super('Scene02')
        
        
    }

    create(){
        this.cont = 0  
        this.sky = this.add.image(0,0,'sky').setOrigin(0,0)
        this.sky.displayWidth = 1000
        this.sky.displayHeight = 1000

        this.player = this.physics.add.sprite(50,450, 'player')
        .setCollideWorldBounds(true)
        .setScale(1)
        .setBounce(.4)
        this.player.canJump = true
        this.player.invulneravel = false
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

        let mPlatforms = this.mPlatforms.create(200,150,'plataforma').setScale(.25,.5)
            mPlatforms.speed = 2
            mPlatforms.minX = 150
            mPlatforms.maxX = 300
        
        this.totalLife = 3
        this.heart = this.totalLife
        this.xp = 0
        this.txtHeart = this.add.text(15,10,`HP:${this.heart}`).setScrollFactor(0)
        this.txtXp = this.add.text(15,30,`Xp:${this.xp}`).setScrollFactor(0)
        this.up()
        
        this.txtTitle = this.add.text(15,550,`Nivel 1`).setScrollFactor(.4)
        
        this.enemies = this.physics.add.group()
        let enemy = this.enemies.create(0,0, 'wolf')
        .setBounce(.2)
        .setCollideWorldBounds(true)
        .setVelocityX(-400)

        let slime = this.enemies.create(0,0, 'slime')
        .setBounce(.2)
        .setCollideWorldBounds(true)
        .setVelocityX(-800)
        
        
        this.porta = this.physics.add.group({
            key:'porta',
            setXY:{
                x: 700,
                y: 10
            }
        })
        this.star = this.physics.add.group({
            key: 'star',
            repeat: 4,
            setXY: {
                x: 12,
                y: -50,
                stepX: 160
            }
        })
        this.vida = this.physics.add.group({
            key: 'vida',
            setXY: {
                x:0,
                y: 12,
            }
        })

        this.enemies.children.iterate((c)=>{
            c.setBounceY(.4)
        })

        this.physics.add.collider(this.player, this.mPlatforms, this.platformsMoveThings)
        this.physics.add.collider(this.enemies, this.mPlatforms, this.platformsMoveThings)
        this.physics.add.collider(this.player, this.enemies, this.enemyHit, null, this)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemies, this.platforms)
        this.physics.add.collider(this.star, this.platforms)
        this.physics.add.collider(this.vida, this.platforms)
        this.physics.add.collider(this.porta, this.platforms)
        this.physics.add.collider(this.star, this.mPlatforms, this.platformsMoveThings)
        this.physics.add.overlap(this.player, this.star, this.coletaStar, null, this)
        this.physics.add.overlap(this.player, this.vida, this.coletaVida, null, this)
        this.physics.add.overlap(this.player, this.porta, this.mudarFase, null, this)

        this.physics.world.setBounds(0,0,800,1500)
        this.cameras.main.startFollow(this.player).setBounds(0,0,800, 600)
        
        this.gameOver = false
    }
    mudarFase(){
        this.scene.start('SceneBoss')
    }
    setVidaXp(){
        this.txtHeart.setText(this.heart > 9 ? `HP:${this.heart}`:`HP:0${this.heart}`).setScrollFactor(0)
        this.txtXp.setText(this.xp>9 ? `Xp:${this.xp}`:`Xp:0${this.xp}`).setScrollFactor(0)
    }
    coletaVida(p,vida){
        vida.destroy()
        this.heart++
        if(this.heart>this.totalLife){
            this.heart--
        }else{
            this.setVidaXp()
        }
    }
    coletaStar(p, star){
        star.destroy()
        this.xp++
        this.setVidaXp()
    }
    up(){
        if(this.xp == 5){
            this.xp = 0
            this.totalLife++
            this.heart++
            this.setVidaXp()
        }
    }
    enemyHit(player, enemies){
        if(!this.player.invulneravel){
            this.heart = this.heart - 1
            this.player.invulneravel = true
            this.player.setAlpha(0.5)
            this.temp()
            this.setVidaXp()
            if(this.heart === 0){
                this.physics.pause()
                player.setTint(0xff0000)
                player.anims.stop()
                this.gameOver = true

                this.scene.start('GameOver')
            }
        }
        
    }
    playerHit(player, enemy){
        if(this.physics.add.collider(this.player, this.enemies, this.enemyHit, null, this)){
            this.enemy.destroy()
        }
            
        
    }
    temp(){ 
        if(this.player.invulneravel){
            this.cont++
            if(this.cont>= 100){
                console.log(this.cont)
                console.log(this.player.invulneravel)
                this.player.invulneravel = false
                this.cont = 0
                this.player.setAlpha(1)
                this.temp()
            }
        }
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
        this.up()
        this.temp()
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
            }else 
            {
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