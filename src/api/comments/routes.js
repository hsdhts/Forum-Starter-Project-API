const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postCommentHandler,
    options: {
      auth: 'forum_sub_v1',
      tags: ['api', 'comments'],
      description: 'create a new comment',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentHandler,
    options: {
      auth: 'forum_sub_v1',
      tags: ['api', 'comments'],
      description: 'delete comment',
    },
  }
]);

module.exports = routes;
