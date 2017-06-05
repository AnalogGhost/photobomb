const knex = require('../knex');

function getPhotos() {
  return knex()
    .select(
      'P.photo_id AS id',
      'P.photo_url AS url',
      'P.photobomb_user_id AS photographer_id',
      'PU.name AS photographer_name'
    )
    .from('photo as P')
    .innerJoin('photobomb_user as PU', 'P.photobomb_user_id', 'PU.photobomb_user_id')
}

function getPhotoLikes(id) {

  return knex()
    .select(
      'PL.photobomb_user_id AS id',
      'PU.name AS name'
    )
    .from('photo_like AS PL')
    .innerJoin('photobomb_user as PU', 'PL.photobomb_user_id', 'PU.photobomb_user_id')

    .where({photo_id:id});

}

function getPhotoComments(id) {
  return knex()
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
  return getPhotos().then(photos => {
    return getPhotoLikes(photos[0].id).then(likes => {
      photos[0].photo_likes = likes;
      return getPhotoComments(photos[0].id).then(comments => {
        photos[0].comments = comments;
        return Promise.resolve(photos);
      });
    })
  });
}

module.exports = {
  list
};
