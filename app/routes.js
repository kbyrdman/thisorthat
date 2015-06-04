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
    app.put('/api/posts/private/huddles', api.updateHuddles);
    app.post('/api/user', api.createUser);
    app.put('/api/user', api.updateUser);

    // GET
    app.get('/api/posts/public/categories', api.getPublicPostsWithCategories);
    app.get('/api/posts/public/all', api.getAllPublicPosts);
    app.get('/api/posts/public/:id', api.getPublicPost);
    app.get('/api/posts/public', api.getPublicPostsByQuery);
    app.get('/api/posts/private/categories', api.getPrivatePostsWithCategories);
    app.get('/api/posts/private/huddles', api.getPrivatePostsWithHuddleIds);
    app.get('/api/posts/private/:id', api.getPrivatePost);
    app.get('/api/posts/private', api.getPrivatePostsByQuery);
    //app.get('/api/user/:id', api.getUserById);
    //app.get('/api/user', api.getUserByQuery);

    // DELETE
    app.delete('/api/posts/private/huddles', api.deleteHuddles);

};
