const AddedReply = require('../AddedReply');

describe('AddedReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      owner_id: 'husada-123',
      comment_id: 'comment-123',
      content: 'content',
      created_at: '2023-09-09T00:00:00.000Z',
      deleted_at: '2023-09-09T00:00:00.000ZZ',
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      owner_id: 123,
      comment_id: 123,
      content: 123,
      created_at: 123,
      deleted_at: 123,
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      owner_id: 'husada-123',
      comment_id: 'comment-123',
      content: 'content',
      created_at: new Date('2023-09-09T00:00:00.000Z'),
      deleted_at: new Date('2023-09-09T00:00:00.000Z'),
    };

    // Action
    const addedReply = new AddedReply(payload);

    // Assert
    expect(addedReply).toEqual(payload);
  });
});
