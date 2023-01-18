




function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(__canvas, 'pointers-' + Date.now(), 'png');
  }
}


let __vectorRanges


let chooseHue, chooseAltHue
function setup() {
  SIZE = min(innerWidth, innerHeight)
  __canvas = createCanvas(SIZE, SIZE)
  noiseSeed(rnd(1000000) + rnd(1000000) + rnd(1000))

  SCALE_ADJ = SIZE/800


  W = 800
  H = 800
  L = 0
  R = W
  T = 0
  B = H

  colorMode(HSB, 360, 100, 100)

  MINT_SIZE = 100
  TOKEN_ID = (Number(tokenData.tokenId) % 1000000)
  CHAOS = (TOKEN_ID / MINT_SIZE)

  CELLS = chance(
    [TOKEN_ID && 7, rndint(5, 8)],
    [TOKEN_ID && 25, rndint(8, 14)],
    [TOKEN_ID && 35, rndint(14, 20)],
    [33, rndint(20, 48)],
  )



  CELL_PADDING = 0
  CELL_SIZE = W/CELLS

  CELL_X = rndint(1, CELLS+1)
  POINT_X = CELL_X * CELL_SIZE
  CELL_Y = rndint(1, CELLS+1)
  POINT_Y = CELL_Y * CELL_SIZE


  HUE = rnd(-10, 10)



  MAX_VECTOR_RANGES = 10000

  DASH_RATE = chance(
    [3, 1],
    [10, rnd(0.1, 0.25)],
    [87, 0]
  )


  LAYOUT = chance(
    [85, 0], // standard
    [TOKEN_ID > 5 && 10, 1], // grid
    [TOKEN_ID > 5 && 4, 2] // flowy
  )

  ARROW_MIN_LEN = prb(0.1) ? CELLS : rndint(1, 5)
  ARROW_MAX_LEN = prb(0.1) ? CELLS : rndint(1, 5) + ARROW_MIN_LEN
  ARROW_DRIFT = map(CHAOS, 0, 1, 0, 15)

  // ****** *10?
  ARROW_ANGLE_DRIFT_AMOUNT = map(CHAOS**2, 0, 1, 0, 2.5)

  ARROW_ANGLE_VAR = map(CHAOS, 0, 1, 0, 1.2)
  LAZY_CARROTS = prb(CHAOS)

  CARROT_TURN = map(CHAOS, 0, 1, 0, 0.1)
  CARROT_DIST_MIN = map(CHAOS, 0, 1, 0, 5)
  CARROT_DIST_MAX = map(CHAOS, 0, 1, 0, 18)

  SQUIGGLEY = prb(0.07)



  SKIP_RATE = map(CHAOS, 0, 1, 0, 0.3)
  STROKE_VARIANCE = map(CHAOS, 0, 1, 0, 1.1)
  STROKE_TURBULENCE = map(CHAOS, 0, 1, 0, 0.25)
  IS_DARK = prb(0.25)
  SMUDGE = prb(CHAOS**3) && !IS_DARK ? map(CHAOS, 0, 1, 0, 0.001)*CHAOS**3 : 0

  DOT_STROKE_MIN = rndint(1, 7*min(1, 24/CELLS))
  DOT_STROKE_MAX = min(DOT_STROKE_MIN + rndint(6*CHAOS), 9)
  SHOW_GRID = prb(0.1)

  COLORS = { // paper
    stroke: color(0, 0, rnd(10, 20)),
    bg: color(HUE+30, 5, 97),
    dot: color(0, 78, 95, .85),
    bgS: (d, x, y) => color(
      HUE + rnd(25, 35),
      rnd(3, 7) + 0.5*d + map(noise(x/400, y/400), 0, 1, 0, 5),
      rnd(93, 100) - 0.5*d - map(noise(x/400, y/400), 0, 1, 0, 5)
    ),
    grid: color(HUE+5, 20, 18, 0.2)
  }





  console.log("What's the point of it all?")



  const sH = rnd(360)
  chooseHue = sample([
    () => color(rnd(360), 100, 100),
    () => color(sH + sample([0, 180]) % 360, 100, 100),
    () => color(sH + sample([60, 120, 240, 300]) % 360, 100, 100),
    () => color(sH + sample([0, 120, 150]) % 360, 100, 100),
    () => color(sH + sample([0, 120, 240]) % 360, 100, 100),
    () => color(sH + sample([0, 150, 210]) % 360, 100, 100),
    () => color(sH + sample([0, 150, 180, 210]) % 360, 100, 100),
    () => color(sH + sample([0, 75]) % 360, 100, 100),
  ])

  chooseAltHue = (h) => {
    const alt = chooseHue()
    return hue(h) === hue(alt) ? chooseAltHue(h) : alt
  }


  DEBUG_MODE = true


  function isComplete() {
    return this.start === this.mid1 && this.end === this.mid2
  }
  __vectorRanges = {
    right: { fn: setWestVector, start: 0, end: CELLS+1, mid1: CELL_Y, mid2: CELL_Y, isComplete },
    left: { fn: setEastVector, start: 0, end: CELLS+1, mid1: CELL_Y, mid2: CELL_Y, isComplete },
    top: { fn: setSouthVector, start: 0, end: CELLS+1, mid1: CELL_X, mid2: CELL_X, isComplete },
    bottom: { fn: setNorthVector, start: 0, end: CELLS+1, mid1: CELL_X, mid2: CELL_X, isComplete },
    allComplete() {
      return this.right.isComplete() && this.left.isComplete() && this.top.isComplete() && this.bottom.isComplete()
    }
  }
}

function draw() {
  // noLoop()
  scale(SCALE_ADJ)
  setCell(CELL_X, CELL_Y, 'r')

  setWestVector(CELL_Y)
  setEastVector(CELL_Y)
  setNorthVector(CELL_X)
  setSouthVector(CELL_X)
  fillOutVectorRanges()

  westVectors.forEach(drawWestVector)
  eastVectors.forEach(drawEastVector)
  northVectors.forEach(drawNorthVector)
  southVectors.forEach(drawSouthVector)
  drawDot()
}




const ARROW_PADDING = .25


const drawWestArrow = (x, y, len, c) => arrow(coord(x)+CELL_SIZE*ARROW_PADDING, coord(y), coord(x - len)+CELL_SIZE*(1-ARROW_PADDING), coord(y), c)
const drawEastArrow = (x, y, len, c) => arrow(coord(x)-CELL_SIZE*ARROW_PADDING, coord(y), coord(x + len)-CELL_SIZE*(1-ARROW_PADDING), coord(y), c)
const drawSouthArrow = (x, y, len, c) => arrow(coord(x), coord(y)-CELL_SIZE*ARROW_PADDING, coord(x), coord(y + len)-CELL_SIZE*(1-ARROW_PADDING), c)
const drawNorthArrow = (x, y, len, c) => arrow(coord(x), coord(y)+CELL_SIZE*ARROW_PADDING, coord(x), coord(y - len)+CELL_SIZE*(1-ARROW_PADDING), c)


const getArrowLen = cursorDist => min(rndint(ARROW_MIN_LEN, ARROW_MAX_LEN), cursorDist)


const westVectors = []
const eastVectors = []
const northVectors = []
const southVectors = []

function setWestVector(row) {
  const y = row
  let x1 , x2

  for (let x = CELLS; x >= CELL_X; x--) {
    if (!getCell(x, y) && !x1) x1 = x
    if (getCell(x, y) && x1) {
      x2 = x + 1
      break
    }
  }

  if (x1 === x2) return setCell(x1, y, 'w')
  for (let x = x1; x >= x2; x--) setCell(x, y, 'w')

  const h = chooseHue()
  westVectors.push([x1, x2, y, rnd(10, 80), h, chooseAltHue(h)])
}

function setEastVector(row) {
  const y = row
  let x1 , x2


  for (let x = 0; x <= CELL_X; x++) {
    if ((!getCell(x, y)) && !x1) x1 = x
    if (getCell(x, y) && x1) {
      x2 = x - 1
      break
    }
  }

  if (x1 === x2) return setCell(x1, y, 'e')
  for (let x = x1; x <= x2; x++) setCell(x, y, 'e')

  const h = chooseHue()
  eastVectors.push([x1, x2, y, rnd(10, 80), h, chooseAltHue(h)])
}

function setNorthVector(col) {
  const x = col
  let y1 , y2

  for (let y = CELLS; y >= CELL_Y; y--) {
    if (!getCell(x, y) && !y1) y1 = y
    if (getCell(x, y) && y1) {
      y2 = y + 1
      break
    }
  }

  if (y1 === y2) return setCell(x, y1, 'n')
  for (let y = y1; y >= y2; y--) setCell(x, y, 'n')
  const h = chooseHue()
  northVectors.push([x, y1, y2, rnd(10, 80), h, chooseAltHue(h)])
}

function setSouthVector(col) {
  const x = col
  let y1 , y2

  for (let y = 0; y <= CELL_Y; y++) {
    if (!getCell(x, y) && !y1) y1 = y
    if (getCell(x, y) && y1) {
      y2 = y - 1
      break
    }
  }

  if (y1 === y2) return setCell(x, y1, 's')
  for (let y = y1; y <= y2; y++) setCell(x, y, 's')
  const h = chooseHue()
  southVectors.push([x, y1, y2, rnd(10, 80), h, chooseAltHue(h)])
}






function drawWestVector ([x1, x2, y, offsetRate, c1, c2]) {
  fill(c1)

  strokeWeight(0)
  rect(
    coord(x2) - CELL_SIZE/2,
    coord(y) - CELL_SIZE/2,
    coord(x1)-coord(x2) + CELL_SIZE,
    CELL_SIZE
  )

  strokeWeight(3)
  const offset = (frameCount % offsetRate) / offsetRate
  let xCursor = x1 + 1
  while (xCursor >= x2) {
    drawWestArrow(xCursor-offset, y, 1, c2)
    xCursor -= (1)
  }

}

function drawEastVector ([x1, x2, y, offsetRate, c1, c2]) {
  fill(c1)

  strokeWeight(0)
  rect(
    coord(x1) - CELL_SIZE/2,
    coord(y) - CELL_SIZE/2,
    coord(x2)-coord(x1) + CELL_SIZE,
    CELL_SIZE
  )

  strokeWeight(3)
  const offset = (frameCount % offsetRate) / offsetRate
  let xCursor = x1 - 1
  while (xCursor <= x2) {
    drawEastArrow(xCursor+offset, y, 1, c2)
    xCursor += 1
  }
}

function drawSouthVector ([x, y1, y2, offsetRate, c1, c2]) {
  fill(c1)

  strokeWeight(0)
  rect(
    coord(x) - CELL_SIZE/2,
    coord(y1) - CELL_SIZE/2,
    CELL_SIZE,
    coord(y2)-coord(y1) + CELL_SIZE,
  )

  strokeWeight(3)
  const offset = (frameCount % offsetRate) / offsetRate
  let yCursor = y1 - 1
  while (yCursor <= y2) {
    drawSouthArrow(x, yCursor + offset, 1, c2)
    yCursor += 1
  }
}

function drawNorthVector ([x, y1, y2, offsetRate, c1, c2]) {
  fill(c1)

  strokeWeight(0)
  rect(
    coord(x) - CELL_SIZE/2,
    coord(y2) - CELL_SIZE/2,
    CELL_SIZE,
    coord(y1)-coord(y2) + CELL_SIZE,
  )

  strokeWeight(3)
  const offset = (frameCount % offsetRate) / offsetRate

  let yCursor = y1 + 1
  while (yCursor >= y2) {
    drawNorthArrow(x, yCursor - offset, 1, c2)
    yCursor -= 1
  }
}





function drawVectorRange(v) {
  const v1Closed = __vectorRanges[v].start !== __vectorRanges[v].mid1
  const v2Closed = __vectorRanges[v].end !== __vectorRanges[v].mid2
  const edge = chance(
    [v1Closed, ['start', rndint(1, 2)]],
    [v1Closed, ['mid1', rndint(1, 2)]],
    [v2Closed, ['mid2', rndint(1, 2)]],
    [v2Closed, ['end', rndint(1, 2)]],
  )

  times(edge[1], t => {
    __vectorRanges[v][edge[0]] += 1
    __vectorRanges[v].fn(__vectorRanges[v][edge[0]])
  })
}


function fillOutVectorRanges() {
  let i=0
  while (!__vectorRanges.allComplete() && i < MAX_VECTOR_RANGES) {
    const r = !__vectorRanges.right.isComplete()
    const l = !__vectorRanges.left.isComplete()
    const t = !__vectorRanges.top.isComplete()
    const b = !__vectorRanges.bottom.isComplete()

    const direction = chance(
      [r, 'right'],
      [l, 'left'],
      [t, 'top'],
      [b, 'bottom'],
    )
    drawVectorRange(direction)
    i++
  }
}







function drawDot() {
  push()

  stroke(0)
    fill(frameCount % 360, 78, 95)
  rect(coord(CELL_X)-CELL_SIZE/2, coord(CELL_Y)-CELL_SIZE/2, CELL_SIZE, CELL_SIZE)
    // circle(coord(CELL_X), coord(CELL_Y), CELL_SIZE)


  pop()

}



function eachCell(fn) {
  for (let cx = 0; cx <= CELLS; cx++)
  for (let cy = 0; cy <= CELLS; cy++) {
    const x = cx * CELL_SIZE
    const y = cy * CELL_SIZE
    fn(x, y, cx, cy)
  }
}






const coord = c => c * CELL_SIZE - CELL_SIZE/2



let __cells = {}

function getCell(x, y) {
  return __cells[`${x||0},${y||0}`]
}

function setCell(x, y, v) {
  __cells[`${x||0},${y||0}`] = v
  return v
}






function arrow(x1, y1, x2, y2, c) {
  const { d, angle } = lineStats(x2, y2, x1, y1)
  const [x3, y3] = getXYRotation(angle-QUARTER_PI/2, 10, x2, y2)
  const [x4, y4] = getXYRotation(angle+QUARTER_PI/2, 10, x2, y2)

  stroke(0)
  line(x1+2, y1+2, x2+2, y2+2)
  line(x2+2, y2+2, x3+2, y3+2)
  line(x2+2, y2+2, x4+2, y4+2)

  stroke(c)
  line(x1, y1, x2, y2)
  line(x2, y2, x3, y3)
  line(x2, y2, x4, y4)


}











function debugView() {
  background('yellow')

  for (let x = 0; x <= W+1; x += CELL_SIZE) {
    line(x, 0, x, H)
  }

  for (let y = 0; y <= H+1; y += CELL_SIZE) {
    line(0, y, W, y)
  }
}



let __randomSeed = parseInt(tokenData.hash.slice(50, 58), 16)

const rndint = (mn, mx) => int(rnd(mn, mx))
function rnd(mn, mx) {
  __randomSeed ^= __randomSeed << 13
  __randomSeed ^= __randomSeed >> 17
  __randomSeed ^= __randomSeed << 5
  const out = (((__randomSeed < 0) ? ~__randomSeed + 1 : __randomSeed) % 1000) / 1000
  if (mx != null) return mn + out * (mx - mn)
  else if (mn != null) return out * mn
  else return out
}


function getXYRotation (deg, radius, cx=0, cy=0) {
  return [
    sin(deg) * radius + cx,
    cos(deg) * radius + cy,
  ]
}


function times(t, fn) {
  const out = []
  for (let i = 0; i < t; i++) out.push(fn(i))
  return out
}

function chance(...chances) {
  const total = chances.reduce((t, c) => t + c[0], 0)
  const seed = rnd()
  let sum = 0
  for (let i = 0; i < chances.length; i++) {
    const val =
      chances[i][0] === true ? 1
      : chances[i][0] === false ? 0
      : chances[i][0]
    sum += val / total
    if (seed <= sum && chances[i][0]) return chances[i][1]
  }
}

const lineStats = (x1, y1, x2, y2) => ({
  d: dist(x1, y1, x2, y2),
  angle: atan2(x2 - x1, y2 - y1)
})
const hfix = h => ((h%360) + 360) % 360
const prb = x => rnd() < x
const sample = (a) => a[int(rnd(a.length))]
const sampleCall = (a) => sample(a)()
const nsrnd = (x, y, mn, mx) => mn + noise(x/15, y/15) * (mx-mn) + rnd(-0.25, 0.25)
const posOrNeg = () => prb(0.5) ? 1 : -1


