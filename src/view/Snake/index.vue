<template>
  <div class="snake-game">
    <canvas ref="canvas" class="canvas"></canvas>
    <div class="score">Score: {{ score }}</div>
    <div v-if="gameOver" class="game-over">Game Over</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      context: null,
      snake: [{ x: 10, y: 10 }],
      food: { x: 5, y: 5 },
      direction: 'right',
      score: 0,
      gameOver: false
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext('2d')
    this.startGame()
  },
  methods: {
    startGame() {
      this.gameOver = false
      this.score = 0
      this.snake = [{ x: 10, y: 10 }]
      this.direction = 'right'

      setInterval(this.moveSnake, 100)
    },
    moveSnake() {
      if (this.gameOver) return

      // 移动贪吃蛇
      const head = { ...this.snake[0] }
      switch (this.direction) {
        case 'up':
          head.y -= 1
          break
        case 'down':
          head.y += 1
          break
        case 'left':
          head.x -= 1
          break
        case 'right':
          head.x += 1
          break
      }

      // 检测是否吃到食物
      if (head.x === this.food.x && head.y === this.food.y) {
        // 食物被吃掉，生成新的食物
        this.food = {
          x: Math.floor((Math.random() * this.canvas.width) / 10),
          y: Math.floor((Math.random() * this.canvas.height) / 10)
        }
        this.snake.unshift(head)
        this.score += 10
      } else {
        // 没有吃到食物，移动贪吃蛇
        this.snake.pop()
        this.snake.unshift(head)
      }

      // 检测碰撞
      if (this.checkCollision()) {
        this.gameOver = true
      }

      this.drawGame()
    },
    checkCollision() {
      // 检测是否撞到墙壁或追尾
      const head = this.snake[0]

      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= this.canvas.width / 10 ||
        head.y >= this.canvas.height / 10
      ) {
        return true // 撞墙
      }

      for (let i = 1; i < this.snake.length; i++) {
        if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
          return true // 追尾
        }
      }

      return false
    },
    drawGame() {
      // 绘制游戏画面
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // 绘制食物
      this.context.fillStyle = 'red'
      this.context.fillRect(this.food.x * 10, this.food.y * 10, 10, 10)

      // 绘制贪吃蛇
      this.context.fillStyle = 'green'
      this.snake.forEach((segment) => {
        this.context.fillRect(segment.x * 10, segment.y * 10, 10, 10)
      })
    },
    changeDirection(event) {
      // 阻止默认键盘事件行为
      event.preventDefault()

      // 改变贪吃蛇的移动方向
      if (this.gameOver) return

      switch (event.key) {
        case 'ArrowUp':
          if (this.direction !== 'down') this.direction = 'up'
          break
        case 'ArrowDown':
          if (this.direction !== 'up') this.direction = 'down'
          break
        case 'ArrowLeft':
          if (this.direction !== 'right') this.direction = 'left'
          break
        case 'ArrowRight':
          if (this.direction !== 'left') this.direction = 'right'
          break
      }
    }
  },
  created() {
    window.addEventListener('keydown', this.changeDirection)
  }
}
</script>

<style scoped>
.snake-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

canvas {
  border: 1px solid #000;
}

.score {
  font-size: 20px;
  margin-top: 10px;
}

.game-over {
  font-size: 30px;
  color: red;
  margin-top: 10px;
}
</style>
