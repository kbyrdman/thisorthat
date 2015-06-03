var api = require('../app/api.js');

module.exports = function(app) {

    /**************************
    *    Backend endpoints    *
    **************************/

    // POST
    app.post('/api/posts/public', api.createPublicPost);
    app.put('/api/posts/public', api.updatePublicPost);
    app.post('/api/posts/private', api.createPrivatePost);
    app.put('/api/posts/private', api.updatePrivatePost);
    app.put('/api/posts/private/circles', api.updateCircles);
    app.post('/api/user', api.createUser);
    app.put('/api/user', api.updateUser);

    // GET
    app.get('/api/posts/public', api.getPublicPosts);
    app.get('/api/posts/private', api.getPrivatePosts);
    app.get('/api/user', api.getUser);
};
