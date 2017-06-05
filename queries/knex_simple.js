const knex = require('../knex');

function list() {
  return knex
    .select(
      'p.photo_id AS id',
      'p.photo_url AS url',
      'pu.name AS photographer',
      'plu.name AS photo_liked_by', 'c.comment_text AS comment',
      'cu.name AS commenter',
      'clu.name AS comment_liked_by')
    .from('photo AS p')
    .innerJoin('photobomb_user AS pu', 'p.photobomb_user_id', 'pu.photobomb_user_id')
    .innerJoin('photo_like AS pl','p.photo_id','pl.photo_id')
    .innerJoin('photobomb_user AS plu','pl.photobomb_user_id','plu.photobomb_user_id')
    .innerJoin('comment AS c','p.photo_id','c.photo_id')
    .innerJoin('photobomb_user AS cu','c.photobomb_user_id','cu.photobomb_user_id')
    .innerJoin('comment_like AS cl','c.comment_id','cl.comment_id')
    .innerJoin('photobomb_user AS clu','cl.photobomb_user_id','clu.photobomb_user_id');
}


module.exports = {list};
