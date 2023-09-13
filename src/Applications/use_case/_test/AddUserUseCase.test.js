const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const AddUserUseCase = require('../AddUserUseCase');

describe('AddUserUseCase', () => {
  it('should correctly orchestrate the add user action', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };

    const expectedRegisteredUser = {
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    };

    // Create mock functions for repositories and PasswordHash
    const mockUserRepository = {
      verifyAvailableUsername: jest.fn().mockImplementation(() => Promise.resolve()),
      addUser: jest.fn().mockImplementation(() => Promise.resolve(expectedRegisteredUser)),
    };

    const mockPasswordHash = {
      hash: jest.fn().mockImplementation(() => Promise.resolve('encrypted_password')),
    };

    const addUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // Action
    const registeredUser = await addUserUseCase.execute(useCasePayload);

    // Assert
    expect(registeredUser).toStrictEqual(expectedRegisteredUser);
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(
      new RegisterUser({
        username: useCasePayload.username,
        password: 'encrypted_password',
        fullname: useCasePayload.fullname,
      })
    );
  });
});