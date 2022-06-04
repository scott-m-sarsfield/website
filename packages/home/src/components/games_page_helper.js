export function uniq(arr) {
  let i,
    l = arr.length,
    o = {};
  for (i = 0; i < l; i++) {
    o[arr[i]] = true;
  }
  return Object.keys(o);
}

export function getUniqueTags(games) {
  let gameTags = [];

  for (let i = 0; i < games.length; i++) {
    gameTags = gameTags.concat(games[i].tags);
  }

  return uniq(gameTags).sort();
}
