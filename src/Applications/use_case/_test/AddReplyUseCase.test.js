const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddReplyUseCase = require('../AddReplyUseCase');
const AddReply = require('../../../Domains/replies/entities/AddReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddReplyUseCase', () => {
  it('should correctly orchestrate the add reply action', async () => {
    // Arrange
    const useCasePayload = {
      content: 'content',
      owner_id: 'user-123',
      comment_id: 'comment-123',
      thread_id: 'thread-123',
    };

    const expectedAddedReply = {
      id: 'reply-123',
      content: useCasePayload.content,
      comment_id: useCasePayload.comment_id,
      owner_id: useCasePayload.owner_id,
      created_at: expect.any(String),
      deleted_at: null,
    };

    // Create mock functions for repositories
    const mockReplyRepository = {
      masukkanReply: jest.fn(async () => expectedAddedReply),
    };

    const mockCommentRepository = {
      mendapatkanCommentBerdasarkanId: jest.fn(async () => {
        return new AddedComment({
          id: 'comment-123',
          content: 'content',
          thread_id: 'thread-123',
          owner_id: 'user-123',
          created_at: expect.any(String),
        });
      }),
    };

    const mockThreadRepository = {
      mendapatkanThreadBerdasarkanId: jest.fn(async () => {
        return new AddedThread({
          id: 'thread-123',
          title: 'title',
          body: 'body',
          owner_id: 'user-123',
          created_at: expect.any(String),
        });
      }),
    };

    const addReplyUseCase = new AddReplyUseCase({
      replyRepository: mockReplyRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Act
    const addedReply = await addReplyUseCase.execute(useCasePayload);

    // Assert
    expect(addedReply).toStrictEqual(expectedAddedReply);
    expect(mockReplyRepository.masukkanReply).toBeCalledWith(
      new AddReply(useCasePayload)
    );
  });
});
