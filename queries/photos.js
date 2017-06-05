const knex = require('../knex');

function getPhotos() {
  return knex()
    .select(
      'P.photo_id AS id',
      'P.photo_url AS url',
      'P.photobomb_user_id AS photographer_id'
    )
    .from('photo as P')
}

function list() {
  return getPhotos();
}

module.exports = {
  list
};
