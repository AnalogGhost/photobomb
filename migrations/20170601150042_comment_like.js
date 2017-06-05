"use strict";

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment_like', table => {
    table.integer('comment_id').notNullable().index().references('comment.comment_id');
    table.integer('photobomb_user_id').notNullable().index().references('photobomb_user.photobomb_user_id');
    table.primary(['photobomb_user_id','comment_id']);
    table.timestamps(true,true);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment_like');
};
