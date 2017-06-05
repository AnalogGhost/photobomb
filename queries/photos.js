const knex = require('../knex');

function getPhotos() {
  return knex.queryBuilder()
    .select(
      'P.photo_id AS id',
      'P.photo_url AS url',
      'P.photobomb_user_id AS photographer_id',
      'PU.name AS photographer_name'
    )
    .from('photo as P')
    .innerJoin('photobomb_user as PU', 'P.photobomb_user_id', 'PU.photobomb_user_id');
}

function getPhotoLikes(id) {

  return knex.queryBuilder()
    .select(
      'PL.photobomb_user_id AS id',
      'PU.name AS name'
    )
    .from('photo_like AS PL')
    .innerJoin('photobomb_user as PU', 'PL.photobomb_user_id', 'PU.photobomb_user_id')

    .where({photo_id:id});

}

function getPhotoComments(id) {
  return knex.queryBuilder()
    .select(
      'PC.comment_id as id',
      'PC.comment_text as text',
      'PU.name as commenter'
    )
    .from('comment AS PC')
    .innerJoin('photobomb_user as PU', 'PC.photobomb_user_id', 'PU.photobomb_user_id')

    .where({photo_id:id});
}

function list() {
  return getPhotos()
  .then(photos =>
    Promise.all(photos.map(photo =>
      Promise.all([getPhotoComments(photo.id),getPhotoLikes(photo.id)])
      .then(social_data => {
        photo.comment = social_data[0];
        photo.likes = social_data[1];
        return photo;
      })
    ))
  )
}

module.exports = {
  list
};
