const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'forum_sub_v1',
      tags: ['api', 'threads'],
      description: 'Create a new thread',
    },
  },
  {
    method: 'GET',
    path: '/threads/{id}',
    handler: handler.getThreadDetailHandler,
    options: {
      tags: ['api', 'threads'],
      description: 'Get thread detail',
    }
  },
]);

module.exports = routes;
