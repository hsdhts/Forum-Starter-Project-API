const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTestHelper = require('../../../../tests/AuthenticationsTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadsTestHelper = require('../../../../tests/ThreadsTestHelper');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  beforeEach(async () => {
    jest.setTimeout(120000);
  });

  // Utility function to create a thread and return its ID
  async function createThreadAndReturnId(server, accessToken, payload) {
    const response = await server.inject({
      method: 'POST',
      url: '/threads',
      payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseJson = JSON.parse(response.payload);
    return responseJson.data.addedThread.id;
  }

  describe('when POST /threads', () => {
    it('should response 201 and persisted thread', async () => {
      // Arrange
      const requestPayload = {
        title: 'title',
        body: 'body',
      };
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);

      // Action
      const threadId = await createThreadAndReturnId(server, accessToken, requestPayload);

      // Assert
      expect(threadId).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        title: 'title',
      };
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena properti tidak lengkap sesuai yang dibutuhkan');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        title: 'title',
        body: ['body'],
      };
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena tipe data salah');
    });
  });

  describe('when GET /threads/:id', () => {
    it('should response 200 and thread detail', async () => {
      // Arrange
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);
      const requestPayload = {
        title: 'title',
        body: 'body',
      };
      const threadId = await createThreadAndReturnId(server, accessToken, requestPayload);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/threads/${threadId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.thread).toBeDefined();
    });

    it('should response 404 when thread not found', async () => {
      // Arrange
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/threads/1',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('thread tidak ditemukan');
    });
  });
});
