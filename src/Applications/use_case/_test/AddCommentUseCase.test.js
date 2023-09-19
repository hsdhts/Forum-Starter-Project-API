const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddCommentUseCase', () => {
  let mockCommentRepository;
  let mockThreadRepository;
  let addCommentUseCase;

  beforeEach(() => {
    mockCommentRepository = {
      masukkanComment: jest.fn(),
    };

    mockThreadRepository = {
      mendapatkanThreadBerdasarkanId: jest.fn(() => {
        return new AddedThread({
          id: 'thread-123',
          title: 'title',
          body: 'body',
          owner_id: 'user-123',
          created_at: expect.any(Date),
        });
      }),
    };

    addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });
  });

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
      created_at: expect.any(Date),
      deleted_at: null,
    };
  
    // Mock the masukkanComment function to return the expectedAddedComment
    mockCommentRepository.masukkanComment.mockResolvedValue(expectedAddedComment);
  
    // Act
    const addedComment = await addCommentUseCase.execute(useCasePayload);
  
    // Assert
    expect(addedComment).toEqual(expect.objectContaining(expectedAddedComment));
    expect(mockCommentRepository.masukkanComment).toBeCalledWith(
      new AddComment(useCasePayload)
    );
    expect(mockCommentRepository.masukkanComment).toHaveBeenCalled();
  });
  
});
