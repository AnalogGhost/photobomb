"use strict";

exports.up = function(knex, Promise) {
  return knex.schema.createTable('photo_like', table => {
    table.integer('photobomb_user_id').notNullable().references('photobomb_user.photobomb_user_id');
    table.integer('photo_id').notNullable().references('photo.photo_id');
    table.primary(['photobomb_user_id','photo_id']);
    table.timestamps(true,true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment_like');
};
