const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddCommentUseCase', () => {
  it('should correctly orchestrate the add comment action', async () => {
    // Arrange
    const useCasePayload = {
      content: 'content',
      owner_id: 'user-123',
      thread_id: 'thread-123',
    };

    const expectedAddedComment = {
      id: 'comment-123',
      content: useCasePayload.content,
      thread_id: useCasePayload.thread_id,
      owner_id: useCasePayload.owner_id,
      created_at: expect.any(String),
      deleted_at: null,
    };

    // Create a mock function for masukkanComment
    const mockCommentRepository = {
      masukkanComment: jest.fn(async () => expectedAddedComment),
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.mendapatkanThreadBerdasarkanId = async () => {
      return new AddedThread({
        id: 'thread-123',
        title: 'title',
        body: 'body',
        owner_id: 'user-123',
        created_at: expect.any(String),
      });
    };

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Act
    const addedComment = await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(addedComment).toStrictEqual(expectedAddedComment);
    expect(mockCommentRepository.masukkanComment).toBeCalledWith(
      new AddComment(useCasePayload)
    );
  });
});