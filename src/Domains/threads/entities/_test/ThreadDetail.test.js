const ThreadDetail = require('../ThreadDetail');

describe('ThreadDetail Entity', () => {
  it('should throw an error when payload does not contain needed properties', () => {
    // Arrange
    const payload = {
      title: 'title',
      body: 'body',
      comments: [],
    };

    // Action and Assert
    expect(() => new ThreadDetail(payload)).toThrowError('THREAD_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload does not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 123,
      body: 123,
      username: [123],
      created_at: 123,
      comments: [],
    };

    // Action and Assert
    expect(() => new ThreadDetail(payload)).toThrowError('THREAD_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create a ThreadDetail object with the correct properties', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'title',
      body: 'body',
      created_at: new Date('2020-01-01T00:00:00.000Z'),
      username: 'username',
      comments: [], 
    };

    // Action
    const threadDetail = new ThreadDetail(payload);

    // Assert
    expect(threadDetail.id).toEqual(payload.id);
    expect(threadDetail.username).toEqual(payload.username);
    expect(threadDetail.title).toEqual(payload.title);
    expect(threadDetail.body).toEqual(payload.body);
    expect(threadDetail.date).toEqual(payload.created_at);
    expect(threadDetail.comments).toEqual(payload.comments); 
  });
});
