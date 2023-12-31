/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesTableTestHelper = {
  async insertLike({
    id = 'like-123',
    owner_id = 'user-123',
    comment_id = 'comment-123',
  }) {
    const query = {
      text: 'INSERT INTO likes (id, comment_id, owner_id) VALUES ($1, $2, $3)',
      values: [id, comment_id, owner_id],
    };

    await pool.query(query);
  },

  async findLikeById(id) {
    const query = {
      text: 'SELECT * FROM likes WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM likes');
  },
};

module.exports = LikesTableTestHelper;
