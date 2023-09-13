/* istanbul ignore file */

const ThreadsTestHelper = {
  async createThread(server, requestPayload, accessToken) {
    try {
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.statusCode !== 201) {
        throw new Error('Failed to create thread');
      }

      const responseJson = JSON.parse(response.payload);
      return responseJson.data.addedThread;
    } catch (error) {
      throw new Error(`Failed to create thread: ${error.message}`);
    }
  },

  async getThreadId(server, accessToken) {
    try {
      /** add thread */
      const insertThreadRes = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: {
          title: 'title',
          body: 'body',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (insertThreadRes.statusCode !== 201) {
        throw new Error('Failed to insert thread');
      }

      const { data: { addedThread: { id: threadId } } } = JSON.parse(insertThreadRes.payload);
      return threadId;
    } catch (error) {
      throw new Error(`Failed to get thread ID: ${error.message}`);
    }
  },
};

module.exports = ThreadsTestHelper;
