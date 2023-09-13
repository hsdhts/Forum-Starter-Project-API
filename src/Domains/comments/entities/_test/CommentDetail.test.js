const CommentDetail = require('../CommentDetail');

describe('CommentDetail entities', () => {
  it('should throw an error when payload is missing needed properties', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      created_at: '2023-09-09T00:00:00.000Z',
      content: 'content',
    };

    // Action and Assert
    expect(() => new CommentDetail(payload)).toThrowError('COMMENT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload does not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 123,
      created_at: 123,
      content: [123],
      like_count: '123',
    };

    // Action and Assert
    expect(() => new CommentDetail(payload)).toThrowError('COMMENT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create a CommentDetail object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'username',
      created_at: new Date('2023-09-09T00:00:00.000Z'),
      content: 'content',
      like_count: 0,
    };

    // Action
    const commentDetail = new CommentDetail(payload);

    // Assert
    expect(commentDetail.id).toEqual(payload.id);
    expect(commentDetail.username).toEqual(payload.username);
    expect(commentDetail.date).toEqual(payload.created_at);
    expect(commentDetail.content).toEqual(payload.content);
  });

  it('should create a CommentDetail object correctly when deleted_at is not null', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'username',
      content: 'content',
      like_count: 0,
      created_at: new Date('2023-09-09T00:00:00.000Z'),
      deleted_at: new Date('2023-09-09T00:00:00.000Z'),
    };

    // Action
    const commentDetail = new CommentDetail(payload);

    // Assert
    expect(commentDetail.id).toEqual(payload.id);
    expect(commentDetail.username).toEqual(payload.username);
    expect(commentDetail.date).toEqual(payload.created_at);
    expect(commentDetail.content).toEqual('**komentar telah dihapus**');
  });
});
