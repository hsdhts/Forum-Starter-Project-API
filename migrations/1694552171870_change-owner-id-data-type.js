exports.up = pgm => {
    // Mengubah tipe data kolom owner_id dari VARCHAR(5) menjadi VARCHAR(50)
    pgm.sql('ALTER TABLE comments ALTER COLUMN owner_id TYPE VARCHAR(50)');
  };
  
  exports.down = pgm => {
    // Untuk mengembalikan perubahan ini, Anda dapat mengubah tipe data kembali ke VARCHAR(5)
    pgm.sql('ALTER TABLE comments ALTER COLUMN owner_id TYPE VARCHAR(5)');
  };
  