/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

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
................
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
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`,
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
  player2: bitmap`
......HHH.......
.....HHHHH......
...000000000....
...0..5.5..0....
...0.00000.0....
...0..3.3..0....
...0..333..0....
...000000000....
.....00000......
....0..0..0.....
.......0........
.....00000......
....00...00.....
................
................
................`,
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
}

const excludeList = ['o', 'u']

setLegend(
  ...Object.entries(sprites).map(sprite => ([
    spriteKeys[sprite[0]], sprite[1]]))
)

setSolids(Object.values(spriteKeys).filter(s => excludeList.indexOf(s) === -1))
setPushables({
  [spriteKeys.player]: [spriteKeys.dough, spriteKeys.pizza, spriteKeys.player]
})

setMap(map`
wwwwwwww
wo.....w
w......w
w..t...w
w.....ww
w....www
wp....uw
wwwwwwww`)

const getPlayerSprite = () => getFirst(spriteKeys.player)
const getDoughSprite = () => getFirst(spriteKeys.dough)

const setOvenFire = (fire) => {
  const oven = getFirst(spriteKeys.oven) ?? getFirst(spriteKeys.ovenFire)

  const x = oven.x
  const y = oven.y

  clearTile(x, y)
  addSprite(x, y, fire === true ? spriteKeys.ovenFire : spriteKeys.oven)
}

const ovenFire = () => {
  setOvenFire(true)
  setTimeout(() => {
    setOvenFire(false)
    addSprite(2, 2, spriteKeys.pizza)
  }, 3 * 1000)
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

  addSprite(5, 3, spriteKeys.dough)
})

afterInput(() => {
  const doughSprite = getFirst(spriteKeys.dough)
  const pizzaSprite = getFirst(spriteKeys.pizza)

  if (pizzaSprite) {
    const player2Sprite = getFirst(spriteKeys.player2)
    if (pizzaSprite.x === player2Sprite.x && pizzaSprite.y === player2Sprite.y) {
      giveMoney()
    }
    
  } else if (doughSprite) {
      const oven = getFirst(spriteKeys.oven)

      if (doughSprite.x === oven.x && doughSprite.y === oven.y) {
        ovenFire()
      }

  }
})
