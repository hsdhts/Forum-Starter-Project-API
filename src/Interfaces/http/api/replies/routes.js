const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.postReplyHandler,
    options: {
      auth: 'forum_sub_v1',
      tags: ['api', 'replies'],
      description: 'Create a new reply',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.deleteReplyHandler,
    options: {
      auth: 'forum_sub_v1',
      tags: ['api', 'replies'],
      description: 'Delete a reply',
    },
  }
]);

module.exports = routes;
