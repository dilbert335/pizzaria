/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

//Adjust this to how many pizzas needed to advance
const PIZZAS_NEEDED = 1

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
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`,
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
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`,
  player3:bitmap`
................
................
................
................
................
................
DHHHD..........D
DDHDD..........D
DDDDDDDDDDDDDDDD
D404D4444444444D
333334444444444D
000DDDDDDDDDDDDD
0008888888888888
0008888888888888
8888888888888888
8888888888888888`
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
  bg: 'z',
  player3: 'h',
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
w....whw
w....www
wp....uw
wwwwwwww`,
  map`
wwwwwwww
wu.....w
ww.ww..w
wo.....w
ww.....w
wwwt...w
whwww.pw
wwwwwwww`,
  map`
wwwwwwww
wu...www
wo....ww
ww.....w
whwt...w
ww.w...w
wwp..www
wwwwwwww`,
  map`
wwwwwwwwww
wo.....w.w
w........w
wwww.w.t.w
whww....ww
wwww..w..w
ww.p....ww
w..w.....w
w....w..uw
wwwwwwwwww`,
  map`
wwwwwwwwwwwww
w...........w
w.p.....t...w
wwww...www..w
wo..........w
ww....w..ww.w
www..w...w..w
wu....w..w..w
www.....w...w
ww...w......w
www...ww.w..w
whww........w
wwwwwwwwwwwww`,
  map`
w..www
w...pw
w....w
w.wuww
wotwhw
wwwwww`,
  map`
wwwwwwwwwwwwwww
wo....ww.....ow
w.....ww......w
w..t..ww..t...w
w.....ww...uwww
w..........ww.w
w.....p...ww.hw
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwww
wo..u..www
w..t...www
wp.....whw
wwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wo......p.....ww
w...........wwww
w...........wwww
w........t.wwwww
wwwwww..wwwwwwu.
wwhwww..........
wwwwww..........`,
]
const levelDoughPositions = [
  [5, 3],
  [5, 2],
  [4, 3],
  [2, 2],
  [2, 2], 
  [1, 1],
  [1, 2],
  [1, 1],
  [6, 3],
]

const nextLevelSound = tune`
222.22222222222223: G4/222.22222222222223 + A4/222.22222222222223 + B4/222.22222222222223 + C5/222.22222222222223,
222.22222222222223: D5/222.22222222222223 + E5/222.22222222222223 + F5/222.22222222222223,
444.44444444444446,
222.22222222222223: G5/222.22222222222223 + F5/222.22222222222223 + E5/222.22222222222223 + D5/222.22222222222223,
222.22222222222223: C5/222.22222222222223 + B4/222.22222222222223,
222.22222222222223: A4/222.22222222222223 + G4/222.22222222222223,
222.22222222222223,
222.22222222222223: F4/222.22222222222223 + G4/222.22222222222223 + A4/222.22222222222223 + B4/222.22222222222223 + C5/222.22222222222223,
222.22222222222223,
222.22222222222223: F5/222.22222222222223,
222.22222222222223: E5/222.22222222222223 + D5/222.22222222222223 + C5/222.22222222222223,
222.22222222222223: B4/222.22222222222223 + A4/222.22222222222223,
222.22222222222223: G4/222.22222222222223,
222.22222222222223: C5/222.22222222222223 + D5/222.22222222222223 + E5/222.22222222222223 + F5/222.22222222222223 + G5/222.22222222222223,
222.22222222222223: G5/222.22222222222223,
222.22222222222223: G5/222.22222222222223,
222.22222222222223,
222.22222222222223: G5/222.22222222222223 + F5/222.22222222222223 + E5/222.22222222222223 + D5/222.22222222222223 + C5/222.22222222222223,
222.22222222222223: A4/222.22222222222223 + G4/222.22222222222223,
222.22222222222223: F4/222.22222222222223 + E4/222.22222222222223 + A4/222.22222222222223 + B4/222.22222222222223 + C5/222.22222222222223,
222.22222222222223: G5/222.22222222222223,
222.22222222222223: G5/222.22222222222223,
222.22222222222223,
222.22222222222223: G5/222.22222222222223,
222.22222222222223: G5/222.22222222222223 + F5/222.22222222222223 + E5/222.22222222222223 + D5/222.22222222222223 + C5/222.22222222222223,
222.22222222222223: G4/222.22222222222223 + F4/222.22222222222223,
222.22222222222223: F4/222.22222222222223,
222.22222222222223: F5/222.22222222222223 + G5/222.22222222222223,
222.22222222222223: A5/222.22222222222223,
222.22222222222223: A5/222.22222222222223,
222.22222222222223`

const bgMusic = tune`
468.75: F4~468.75 + D4~468.75,
468.75: G4~468.75 + E4~468.75 + C4~468.75,
468.75: G4~468.75 + E4~468.75 + C4~468.75,
468.75: G4~468.75 + E4~468.75 + C4~468.75,
468.75: F4~468.75 + D4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: F4~468.75 + D4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: F4~468.75 + D4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: F4~468.75 + D4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: F4~468.75 + D4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: F4~468.75 + D4~468.75 + E4~468.75,
468.75: G4~468.75 + C4~468.75 + E4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: E4~468.75 + G4~468.75 + C4~468.75,
468.75: F4~468.75 + D4~468.75,
468.75: G4~468.75 + E4~468.75 + C4~468.75,
468.75: G4~468.75 + E4~468.75 + C4~468.75,
468.75: G4~468.75 + E4~468.75 + C4~468.75`
const bgPlayback = playTune(bgMusic, Infinity)

const nextLevel = (sound = true) => {
  currentLevel++
  if (levels[currentLevel]) {
    if (sound) {
      playTune(nextLevelSound)
      setTimeout(() => setMap(levels[currentLevel]), 4500)
    } else {
      setMap(levels[currentLevel])
    }
      
    
  } else {
    //todo
    alert("YOU WIN CONGRATS")
  }
}

const reset = () => {
  setMap(levels[currentLevel])
}

nextLevel(false)

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
    color: color`4`
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

    const [x,y] = levelDoughPositions[currentLevel] ?? [1,1]

  addSprite(x, y, spriteKeys.dough)
})

onInput("l", () => reset())

const doughInOvenSound = tune`
245.9016393442623: F4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: F5~245.9016393442623,
245.9016393442623: F5~245.9016393442623,
245.9016393442623: F4~245.9016393442623 + G4~245.9016393442623,
245.9016393442623: F4~245.9016393442623 + G4~245.9016393442623,
245.9016393442623: F5~245.9016393442623,
245.9016393442623: F5~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: F5~245.9016393442623,
245.9016393442623: F5~245.9016393442623,
245.9016393442623: F4~245.9016393442623 + G4~245.9016393442623,
245.9016393442623: F4~245.9016393442623 + G4~245.9016393442623,
245.9016393442623: F5~245.9016393442623,
245.9016393442623: F5~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
3442.622950819672`
const pizzaToChefSound = tune``

afterInput(() => {
  const doughSprite = getFirst(spriteKeys.dough)
  const pizzaSprite = getFirst(spriteKeys.pizza)

  if (pizzaSprite) {
    const player2Sprite = getFirst(spriteKeys.player2)
    const x = player2Sprite.x
    const y = player2Sprite.y
    
    if (pizzaSprite.x === player2Sprite.x && pizzaSprite.y === player2Sprite.y) {
      bgPlayback.end()
      playTune(pizzaToChefSound)

      setTimeout(() => playTune(bgMusic, Infinity), 9000)
      
      clearTile(x, y)
      addSprite(x, y, spriteKeys.player2)
      giveMoney()
    }
  }
  
  if (doughSprite) {
      const oven = getFirst(spriteKeys.oven)

      if (doughSprite.x === oven.x && doughSprite.y === oven.y) {
        setOvenFire(true)
        playTune(doughInOvenSound)
       
        setTimeout(() => {
          setOvenFire(false)
          addSprite(2, 2, spriteKeys.pizza)
        }, 3 * 1000)
      }
  }
})
