/* istanbul ignore file */

const CommentsTestHelper = {
  async getCommentId(server, accessToken, threadId, content = 'content') {
    try {
      const insertCommentRes = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: {
          content,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (insertCommentRes.statusCode !== 201) {
        throw new Error('Failed to insert comment');
      }

      const { data: { addedComment: { id: commentId } } } = JSON.parse(insertCommentRes.payload);
      return commentId;
    } catch (error) {
      throw new Error(`Failed to get comment ID: ${error.message}`);
    }
  },
};

module.exports = CommentsTestHelper;
