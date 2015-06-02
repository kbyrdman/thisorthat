var api = require('../app/api.js');

module.exports = function(app) {

    /**************************
    *    Backend endpoints    *
    **************************/

    // POST
    app.post('/api/post/public', api.createPublicPost);
    app.put('/api/post/public', api.updatePublicPost);
    app.post('/api/post/private', api.createPrivatePost);
    app.put('/api/post/private', api.updatePrivatePost);
    app.put('/api/post/private/circles', api.updateCircles);
    app.post('/api/user', api.createUser);
    app.put('/api/user', api.updateUser);

    // GET
    app.get('/api/post/public', api.getPublicPosts);
    app.get('/api/post/private', api.getPrivatePosts);
    app.get('/api/user', api.getUser);
};
