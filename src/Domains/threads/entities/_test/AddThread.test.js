const AddThread = require('../AddThread');

describe('AddThread Entity', () => {
  describe('Constructor', () => {
    it('should throw an error when payload does not contain needed properties', () => {
      // Arrange
      const payload = {
        title: 'title',
        body: 'body',
      };

      // Action and Assert
      expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw an error when payload does not meet data type specifications', () => {
      // Arrange
      const payload = {
        owner_id: 'husada-123',
        title: 1234,
        body: 'body',
      };

      // Action and Assert
      expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create an AddThread object with the correct properties', () => {
      // Arrange
      const payload = {
        owner_id: 'husada-123',
        title: 'title',
        body: 'body',
      };

      // Action
      const thread = new AddThread(payload);

      // Assert
      expect(thread.owner_id).toBe(payload.owner_id);
      expect(thread.title).toBe(payload.title);
      expect(thread.body).toBe(payload.body);
    });
  });
});
