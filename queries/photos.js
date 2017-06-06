const knex = require('../knex');

function getAllPhotos(id) {
  let query = knex('photo')
    .select(
      'photo.photo_id AS id',
      'photo.photo_url AS url',
      'photo.photobomb_user_id AS photographer_id',
      'photobomb_user.name AS photographer_name'
    )
    .innerJoin('photobomb_user', 'photo.photobomb_user_id', 'photobomb_user.photobomb_user_id');

    if (id) {
      query.where({photo_id:id});
    }

    return query;
}

function getPhotoLikes(id) {
  return knex('photo_like')
    .select(
      'photo_like.photobomb_user_id AS id',
      'photobomb_user.name AS name'
    )
    .innerJoin('photobomb_user', 'photo_like.photobomb_user_id', 'photobomb_user.photobomb_user_id')
    .where({photo_id:id});
}

function getPhotoComments(id) {
  return knex('comment')
  .select(
    'comment.comment_id AS id',
    'comment.comment_text AS text',
    'photobomb_user.name AS commenter'
  )
  .innerJoin('photobomb_user', 'comment.photobomb_user_id', 'photobomb_user.photobomb_user_id')
  .where({photo_id:id})
  .orderBy('comment.created_at', 'asc')
  .orderBy('comment.comment_id','asc')
  .then(getPhotoCommentLikes);
}

function getPhotoCommentLikes(comments) {
  return Promise.all(comments.map(comment =>
      knex('comment_like')
      .select(
        'photobomb_user.photobomb_user_id AS id',
        'photobomb_user.name AS name'
      )
      .innerJoin('photobomb_user', 'comment_like.photobomb_user_id', 'photobomb_user.photobomb_user_id')
      .where({comment_id:comment.id})
    .then(liked_by => {
      comment.liked_by = liked_by;
      return comment;
    })
  ));
}

function get(id) {
  return getAllPhotos(id)
  .then(photos =>
    Promise.all(photos.map(photo =>
      Promise.all([getPhotoComments(photo.id),getPhotoLikes(photo.id)])
      .then(social_data => {
        photo.comment = social_data[0];
        photo.likes = social_data[1];
        return photo;
      })
    ))
    .then(complete => id ? complete[0] : complete)
  );
}

module.exports = {
  get
};
