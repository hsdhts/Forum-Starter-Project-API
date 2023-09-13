class CommentRepository {
  // Menyimpan komentar ke dalam repositori
  async masukkanComment(comment) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  // Mendapatkan komentar berdasarkan ID
  async mendapatkanCommentBerdasarkanId(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  // Menghapus komentar berdasarkan ID
  async hapusComment(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  // Mendapatkan daftar komentar berdasarkan ID utas
  async mendapatkanCommentsBerdasarkanThreadId(thread_id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentRepository;
