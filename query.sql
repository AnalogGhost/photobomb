SELECT
  p.photo_url AS url,
  pu.name AS photographer,
  plu.name AS photo_liked_by,
  c.comment_text AS comment,
  cu.name AS commenter,
  clu.name AS comment_liked_by

FROM photo p
JOIN photobomb_user pu ON p.photobomb_user_id = pu.photobomb_user_id
JOIN photo_like pl ON p.photo_id = pl.photo_id
JOIN photobomb_user plu ON pl.photobomb_user_id = plu.photobomb_user_id
JOIN comment c ON p.photo_id = c.photo_id
JOIN photobomb_user cu ON c.photobomb_user_id = cu.photobomb_user_id
JOIN comment_like cl ON c.comment_id = cl.comment_id
JOIN photobomb_user clu ON cl.photobomb_user_id = clu.photobomb_user_id;
