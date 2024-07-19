module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'eA2r8wc7g2Yw0vavYWJdxg=='),
      expiresIn: '30d',
    },
  },
});
