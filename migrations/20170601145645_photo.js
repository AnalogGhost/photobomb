"use strict";

exports.up = function(knex, Promise) {
  return knex.schema.createTable('photo', table => {
    table.increments('photo_id');
    table.string("photo_url").notNullable();
    table.integer('photobomb_user_id').notNullable().index().references('photobomb_user.photobomb_user_id');
    table.timestamps(true,true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photo');
};
