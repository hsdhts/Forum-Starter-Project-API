const AddedComment = require('../AddedComment');

describe('AddedComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      owner_id: 'husada-123',
      thread_id: 'thread-123',
      content: 'content',
      created_at: '2023-09-09T00:00:00.000Z',
      deleted_at: '2023-09-09T00:00:00.000Z',
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      owner_id: 123,
      thread_id: 123,
      content: 123,
      created_at: 123,
      deleted_at: 123,
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      owner_id: 'user-123',
      thread_id: 'thread-123',
      content: 'content',
      created_at: new Date('2023-09-09T00:00:00.000Z'),
      deleted_at: new Date('2023-09-09T00:00:00.000Z'),
    };

    // Action
    const addedComment = new AddedComment(payload);

    // Assert
    expect(addedComment.id).toEqual(payload.id);
    expect(addedComment.owner_id).toEqual(payload.owner_id);
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.created_at).toEqual(payload.created_at);

    // Assert
  expect(addedComment.id).toEqual(payload.id);
  expect(addedComment.owner_id).toEqual(payload.owner_id);
  expect(addedComment.content).toEqual(payload.content);
  expect(addedComment.thread_id).toEqual(payload.thread_id); 
  expect(addedComment.created_at).toEqual(payload.created_at);
  expect(addedComment.deleted_at).toEqual(payload.deleted_at); 

  });
});
