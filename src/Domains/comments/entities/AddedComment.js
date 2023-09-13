class AddedComment {
  constructor({ id, owner_id, thread_id, content, created_at, deleted_at }) {
    this.id = id;
    this.owner_id = owner_id;
    this.thread_id = thread_id;
    this.content = content;
    this.created_at = created_at;
    this.deleted_at = deleted_at;
    this._verifyPayload();
  }

  _verifyPayload() {
    if (!this.id || !this.owner_id || !this.thread_id || !this.content || !this.created_at) {
      throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof this.id !== 'string' || typeof this.thread_id !== 'string' || typeof this.owner_id !== 'string' || typeof this.content !== 'string' || typeof this.created_at !== 'object') {
      throw new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedComment;
