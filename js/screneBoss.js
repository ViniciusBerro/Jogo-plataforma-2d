class SceneBoss extends Phaser.Scene{
    constructor(){
        super('SceneBoss')
        
        
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
        this.platforms.create(50,400,'plataforma')
        .setScale(2,0.5).refreshBody()

        
        this.totalLife = 3
        this.heart = this.totalLife
        this.xp = 0
        this.txtHeart = this.add.text(15,10,`HP:${this.heart}`).setScrollFactor(0)
        this.txtXp = this.add.text(15,30,`Xp:${this.xp}`).setScrollFactor(0)
        this.up()
        
        this.enemies = this.physics.add.group()
        let enemy = this.enemies.create(0,30, 'boss')
        .setBounce(.2)
        .setCollideWorldBounds(true)
        .setVelocityX(-80)

        
        
        this.bomba = this.physics.add.group({
            key: 'bomba',
            setXY: {
                x:600,
                y:18,
            }
        })

        this.enemies.children.iterate((c)=>{
            c.setBounceY(.4)
        })

        
        this.physics.add.collider(this.player, this.enemies, this.enemyHit, null, this)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemies, this.platforms)
        this.physics.add.collider(this.bomba, this.platforms)
        this.physics.add.overlap(this.player, this.bomba, this.vitoria, null, this)

        this.physics.world.setBounds(0,0,800,1500)
        this.cameras.main.startFollow(this.player).setBounds(0,0,800, 600)
        
        this.gameOver = false
    }
    setVidaXp(){
        this.txtHeart.setText(this.heart > 9 ? `HP:${this.heart}`:`HP:0${this.heart}`).setScrollFactor(0)
        this.txtXp.setText(this.xp>9 ? `Xp:${this.xp}`:`Xp:0${this.xp}`).setScrollFactor(0)
    }
    vitoria(p,vida){
        this.scene.start('Ganhou')
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
                
        }
        
        
    }
}