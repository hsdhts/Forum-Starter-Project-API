const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddThreadUseCase', () => {
  it('should correctly orchestrate the add thread action', async () => {
    // Arrange
    const useCasePayload = {
      title: 'title',
      body: 'body',
      owner_id: 'user-123',
    };

    const expectedAddedThread = {
      id: 'user-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner_id: useCasePayload.owner_id,
      created_at: expect.any(String),
    };

    // Create a mock function for masukkanThread
    const mockThreadRepository = {
      masukkanThread: jest.fn().mockImplementation(() => Promise.resolve(expectedAddedThread)),
    };

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Act
    const addedThread = await addThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.masukkanThread).toBeCalledWith(new AddThread(useCasePayload));
  });
});