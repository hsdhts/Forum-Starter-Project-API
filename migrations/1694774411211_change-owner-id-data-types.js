/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.sql('ALTER TABLE comments ALTER COLUMN owner_id TYPE VARCHAR(55)');
  };
  
  exports.down = pgm => {
    pgm.sql('ALTER TABLE comments ALTER COLUMN owner_id TYPE VARCHAR(5)');
  };
  
