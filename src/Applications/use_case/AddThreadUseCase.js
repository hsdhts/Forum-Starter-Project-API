const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addThread = new AddThread(useCasePayload);
    const addedThread = await this._threadRepository.masukkanThread(addThread);
  
    return {
      id: addedThread.id,
      owner_id: addedThread.owner_id, // Menggunakan properti "owner_id" sesuai dengan yang diterima
      title: addedThread.title,
      body: addedThread.body,
      created_at: addedThread.created_at,
    };
  }
}

module.exports = AddThreadUseCase;
