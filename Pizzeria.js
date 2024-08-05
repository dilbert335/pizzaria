/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

//Adjust this to how many pizzas needed to advance
const PIZZAS_NEEDED = 5

const sprites = {
  player: bitmap`
................
................
........4.......
.......404......
.......444......
....344444......
...2020244......
....444444......
.......0........
......303.......
.......0........
.....00000......
....00...00.....
3333333333333333
................
................`,
  player2: bitmap`
....HHHHHHH.....
...HHHHHHHHH....
..H000000000H...
...022525220....
...020000020....
...022323220....
...022333220....
...000000000....
.....00000......
....0..0..0.....
.......0........
.....00000......
....00...00.....
3333333333333333
................
................`,
  pizza: bitmap`
................
................
................
................
....99999999....
...9966666699...
...9663663669...
...9666666669...
...9636366369...
...9666666669...
...9963663699...
....99999999....
................
................
................
................`,
  wall: bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`,
  oven: bitmap`
................
................
................
...0000000000...
...0000000000...
...LLLLLLLLLL...
...L11000011L...
...L11111111L...
...L11111111L...
...L11111111L...
...LLLLLLLLLL...
...L........L...
5555555555555555
................
................
................`,
  ovenFire: bitmap`
................
................
................
...0000000000...
...0000000000...
...LLLLLLLLLL...
...L33333333L...
...L39999993L...
...L39666693L...
...L39666693L...
...LLLLLLLLLL...
...L........L...
5555555555555555
................
................
................`,
  table: bitmap`
................
................
................
................
................
.CC..........CC.
.CCCC000000CCCC.
..CCCCCCCCCCCC..
..CC0C9999C0CC..
..CC0C9999C0CC..
..CC0C9999C0CC..
..CCCCCCCCCCCC..
.CCCC000000CCCC.
.CC..........CC.
................
................`,
  dough: bitmap`
................
................
................
................
.....CCCCCC.....
....C999999C....
....C999999C....
....C999999C....
....C999999C....
....C999999C....
.....CCCCCC.....
................
................
................
................
................`,
  bg: bitmap`
................
........8.8..8.8
.8.8.....8....8.
..8.............
................
.8.8.8.8...8.8..
..8...8.....8...
................
...8.8.....8.8..
....8..8.8..8...
........8.......
................
.8.8.8.8...8.8..
..8...8.....8...
................
................`
}
const spriteKeys = {
  player: 'p',
  player2:'u',
  pizza: 'v',
  wall: 'w',
  oven: 'o',
  ovenFire: 'f',
  table: 't',
  dough: 'd',
  bg: 'z'
}

setBackground(spriteKeys.bg)

const excludeList = ['o', 'u']

setLegend(
  ...Object.entries(sprites).map(sprite => ([
    spriteKeys[sprite[0]], sprite[1]]))
)

setSolids(Object.values(spriteKeys).filter(s => excludeList.indexOf(s) === -1))
setPushables({
  [spriteKeys.player]: [spriteKeys.dough, spriteKeys.pizza, spriteKeys.player]
})

let currentLevel = -1
const levels = [
  map`
wwwwwwww
wo.....w
w......w
w..t...w
w......w
w....www
wp....uw
wwwwwwww`,
  map`
wwwwwwww
wu.....w
ww.ww..w
wo.....w
wwww...w
w......w
wt....pw
wwwwwwww`,
  map`
wwwwwwww
wu...www
wo....ww
ww.....w
w.wt...w
w..w...w
wwp..www
wwwwwwww`,
  map`
wwwwwwwwww
wo.....w.w
w........w
wwww.w.t.w
w..w....ww
w.....w..w
ww.p....ww
w..w.....w
w....w..uw
wwwwwwwwww`
]
const levelDoughPositions = [
  [5, 3],
  [5, 2],
  [4, 3],
  [2, 2]
]

const nextLevel = () => {
  currentLevel++
  if (levels[currentLevel]) {
    setMap(levels[currentLevel])
  } else {
    //todo
    alert("you win")
  }
}

const reset = () => {
  setMap(levels[currentLevel])
}

nextLevel()

const getPlayerSprite = () => getFirst(spriteKeys.player)
const getDoughSprite = () => getFirst(spriteKeys.dough)

const setOvenFire = (fire) => {
  const oven = getFirst(spriteKeys.oven) ?? getFirst(spriteKeys.ovenFire)

  const x = oven.x
  const y = oven.y

  clearTile(x, y)
  addSprite(x, y, fire === true ? spriteKeys.ovenFire : spriteKeys.oven)
}

let MONEY = 0
const updateMoneyText = () => {
  clearText()
  addText(`money: ${MONEY}`, {
    x: 6,
    y: 1,
    color: color`D`
  })
}

updateMoneyText()

const giveMoney = () => {
  MONEY += 5
  updateMoneyText()

  if (MONEY === PIZZAS_NEEDED * 5) {
    MONEY = 0
    nextLevel()
  }
}

onInput("w", () => {
  const playerSprite = getPlayerSprite()
  if (playerSprite.y > 0) {
    playerSprite.y -= 1
  }
});
onInput("s", () => {
  const playerSprite = getPlayerSprite()
  if (playerSprite.y < height() - 1) {
    playerSprite.y += 1
  }
});
onInput("a", () => {
  const playerSprite = getPlayerSprite()
  if (playerSprite.x > 0) {
    playerSprite.x -= 1
  }
});
onInput("d", () => {
  const playerSprite = getPlayerSprite()
  if (playerSprite.x < width() - 1) {
    playerSprite.x += 1
  }
});

onInput("j", () => {
  if (getFirst(spriteKeys.dough)) {
    return;
  }

    const [x,y] = levelDoughPositions[currentLevel]

  addSprite(x, y, spriteKeys.dough)
})

onInput("l", () => reset())

afterInput(() => {
  const doughSprite = getFirst(spriteKeys.dough)
  const pizzaSprite = getFirst(spriteKeys.pizza)

  if (pizzaSprite) {
    const player2Sprite = getFirst(spriteKeys.player2)
    const x = player2Sprite.x
    const y = player2Sprite.y
    
    if (pizzaSprite.x === player2Sprite.x && pizzaSprite.y === player2Sprite.y) {
      clearTile(x, y)
      addSprite(x, y, spriteKeys.player2)
      giveMoney()
    }
  }
  
  if (doughSprite) {
      const oven = getFirst(spriteKeys.oven)

      if (doughSprite.x === oven.x && doughSprite.y === oven.y) {
        setOvenFire(true)
        setTimeout(() => {
          setOvenFire(false)
          addSprite(2, 2, spriteKeys.pizza)
        }, 3 * 1000)
      }
  }
})

const test = tune`
352.94117647058823: E4~352.94117647058823,
352.94117647058823: E4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: E4~352.94117647058823 + G4~352.94117647058823,
352.94117647058823: D4~352.94117647058823 + F4~352.94117647058823,
352.94117647058823: E4~352.94117647058823,
352.94117647058823: E4~352.94117647058823`
