/* globals describe, it */

const assert = require('assert')
const overlap = require('./overlap')

function setTime (t1, t2) {
  const p1 = {
    start: `2018-10-28 ${t1.start}:00`,
    end: `2018-10-28 ${t1.end}:00`
  }

  const p2 = {
    start: `2018-10-28 ${t2.start}:00`,
    end: `2018-10-28 ${t2.end}:00`
  }

  return [ p1, p2 ]
}

describe('p1 starts BEFORE p2 and', () => {
  it('ends BEFORE p2 starts', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:00', end: '12:30' },
      { start: '13:00', end: '13:30' }
    )
    assert(overlap(p1, p2) === false)
  })

  it('ends WHEN p2 starts', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:00', end: '12:30' },
      { start: '12:30', end: '13:00' }
    )
    assert(overlap(p1, p2) === false)
  })

  it('ends DURING p2', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:00', end: '12:30' },
      { start: '12:15', end: '12:45' }
    )
    assert(overlap(p1, p2) === true)
  })

  it('ends WHEN p2 ends', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:00', end: '12:30' },
      { start: '12:15', end: '12:30' }
    )
    assert(overlap(p1, p2) === true)
  })

  it('ends AFTER p2 ends', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:00', end: '13:00' },
      { start: '12:15', end: '12:30' }
    )
    assert(overlap(p1, p2) === true)
  })
})

describe('p1 starts WHEN p2 and', () => {
  it('ends DURING p2', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:00', end: '12:15' },
      { start: '12:00', end: '12:30' }
    )
    assert(overlap(p1, p2) === true)
  })

  it('ends WHEN p2 ends', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:00', end: '12:30' },
      { start: '12:00', end: '12:30' }
    )
    assert(overlap(p1, p2) === true)
  })

  it('ends AFTER p2', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:00', end: '12:45' },
      { start: '12:00', end: '12:30' }
    )
    assert(overlap(p1, p2) === true)
  })
})

describe('p1 starts DURING p2 and', () => {
  it('ends DURING p2', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:30', end: '12:45' },
      { start: '12:00', end: '13:00' }
    )
    assert(overlap(p1, p2) === true)
  })

  it('ends WHEN p2 ends', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:30', end: '13:00' },
      { start: '12:00', end: '13:00' }
    )
    assert(overlap(p1, p2) === true)
  })

  it('ends AFTER p2', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:30', end: '13:00' },
      { start: '12:30', end: '12:45' }
    )
    assert(overlap(p1, p2) === true)
  })
})

describe('p1 starts AFTER p2', () => {
  it('ends AFTER p2', () => {
    const [ p1, p2 ] = setTime(
      { start: '12:30', end: '13:00' },
      { start: '12:00', end: '12:15' }
    )
    assert(overlap(p1, p2) === false)
  })
})
