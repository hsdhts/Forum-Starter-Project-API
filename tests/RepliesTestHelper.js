/* istanbul ignore file */

const RepliesTestHelper = {
  async getReplyId(server, accessToken, threadId, commentId, content = 'content') {
    try {
      const insertReplyRes = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/replies`,
        payload: {
          content,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (insertReplyRes.statusCode !== 201) {
        throw new Error('Failed to insert reply');
      }

      const { data: { addedReply: { id: replyId } } } = JSON.parse(insertReplyRes.payload);
      return replyId;
    } catch (error) {
      throw new Error(`Failed to get reply ID: ${error.message}`);
    }
  },
};

module.exports = RepliesTestHelper;
