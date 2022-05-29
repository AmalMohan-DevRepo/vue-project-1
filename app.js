const getRandomValue = (max, min) => {
    return Math.floor(Math.random() * (max-min)) + min
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            attackCount: 0,
            winner:null,
            logMessages: []

        }
    },
    methods: {
        attackMonster(){
            this.attackCount++
            const attackValue = getRandomValue(12,5)
            this.monsterHealth -= attackValue
            this.writeLog('player', 'attack', attackValue)
            this.attackPlayer()
        },
        attackPlayer(){
            const attackValue = getRandomValue(15,8)
            this.playerHealth -= attackValue
            this.writeLog('monster', 'attack', attackValue)
        },
        launchSpecialAttack(){
            this.attackCount++
            const attackValue = getRandomValue(10,25)
            this.monsterHealth -= attackValue
            this.writeLog('player', 'special-attack', attackValue)
            this.attackPlayer()
        },
        healPlayer(){
            this.attackCount++
            const healValue = getRandomValue(8,20)
            this.playerHealth + healValue > 100 ? 
            this.playerHealth = 100 
            : this.playerHealth += healValue
            this.writeLog('player', 'heal', healValue)
            this.attackPlayer()
        },
        surrenderhandler(){
            this.winner = 'monster'
        },
        restartGame(){
            this.winner= null
            this.monsterHealth = 100
            this.playerHealth = 100
            this.attackCount = 0
            this.logMessages = []
        },
        writeLog(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value

            })
        }
    },
    computed: {
        monsterBarStyle() {
            if(this.monsterHealth < 0){
                return '0%'
            }
            return this.monsterHealth + '%'
        },
        playerBarStyle() {
            if(this.playerHealth < 0){
                return '0%'
            }
            return this.playerHealth + '%'
        },
        specialAttackIsDisabled(){
            return this.attackCount % 3 !== 0
        }

    },
    watch:{
        playerHealth(value){
           if( value <= 0 &&  this.monsterHealth <= 0 ){
               this.winner = 'draw'
           } else if(value <= 0){
                this.winner = 'monster'
           }
        },
        monsterHealth(value){
            if( value <= 0 &&  this.playerHealth <= 0 ){
                this.winner = 'draw'
            } else if(value <= 0){
                 this.winner = 'player'
            }
    }
   }
})

app.mount('#game')