"use strict";

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', table => {
    table.increments('comment_id');
    table.string("comment_text").notNullable();
    table.integer('photo_id').notNullable().index().references('photo.photo_id');
    table.integer('photobomb_user_id').notNullable().index().references('photobomb_user.photobomb_user_id');
    table.timestamps(true,true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};
