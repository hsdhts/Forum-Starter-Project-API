const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddComment = require('../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addComment = new AddComment(useCasePayload);
    await this.verifyThreadAvailability(addComment.thread_id);
    return this._commentRepository.masukkanComment(addComment);
  }

  async verifyThreadAvailability(threadId) {
    const threadExists = await this.threadExists(threadId);

    // Jika thread tidak ditemukan, lempar NotFoundError
    if (!threadExists) {
      throw new NotFoundError('thread not found');
    }
  }

  async threadExists(threadId) {
    // Implementasikan logika untuk memeriksa apakah thread dengan threadId ada di database
    const thread = await this._threadRepository.mendapatkanThreadBerdasarkanId(threadId);
    return !!thread; // Mengembalikan true jika thread ada, false jika tidak ada
  }
}

module.exports = AddCommentUseCase;
