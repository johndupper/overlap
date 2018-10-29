const overlap = (a, b) => {
  const [ promoA, promoB ] = convertDates({ ...a }, { ...b })
  const [ first, second ] = determineFirstPlayed(promoA, promoB)

  if (first.start < second.start) {
    if (first.end <= second.start) return false
    if (first.end <= second.end) return true
    if (first.end > second.end) return true
  }

  if (first.start === second.start) return true
  if (first.start > second.start) return true
  if (first.end >= second.end) return false

  return false
}

function convertDates (a, b) {
  // create Date instances
  let promoA = { start: new Date(a.start), end: new Date(a.end) }
  let promoB = { start: new Date(b.start), end: new Date(b.end) }

  // returns # of milliseconds since 1/1/1970
  promoA = { start: promoA.start.getTime(), end: promoA.end.getTime() }
  promoB = { start: promoB.start.getTime(), end: promoB.end.getTime() }

  return [ promoA, promoB ]
}

function determineFirstPlayed (a, b) {
  return a.start <= b.start ? [a, b] : [b, a]
}

module.exports = overlap
