const fs = require('fs')
const imdb = require('imdb-api')
const storage = require('./db/storage')

const keys = Object.keys(storage.MOVIES);

fs.readFile('./db/movies_prebuilt.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  for (const key of keys) {
    imdb.get({ id: storage.MOVIES[key] }, { apiKey: '', timeout: 30000 }).then((movie) => {
      data = data.toString().replace(key, movie.rating);
      fs.writeFile('./movies.md', data, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    }).catch();

  }

});