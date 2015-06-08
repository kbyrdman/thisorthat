var api = require('../app/api.js');

module.exports = function(app) {

    /**************************
    *    Backend endpoints    *
    **************************/

    //PUT
    app.put('/api/posts/public', api.putPublicPost);
    app.put('/api/posts/private', api.putPrivatePost);
    app.put('/api/user', api.putUser);

    // POST
    app.post('/api/posts/public/imageURI', api.postPublicPostImageURI);
    app.post('/api/posts/private/imageURI', api.postPrivatePostImageURI);
    app.post('/api/posts/public/votes', api.postPublicPostVotes);
    app.post('/api/posts/private/votes', api.postPrivatePostVotes);
    app.post('/api/posts/public/categories', api.postPublicPostCategories);
    app.post('/api/posts/private/categories', api.postPrivatePostCategories);
    app.post('/api/posts/public/rank', api.postPublicPostRank);
    app.post('/api/posts/private/rank', api.postPrivatePostRank);
    app.post('/api/posts/private/huddles', api.postHuddles);
    app.post('/api/user/friends', api.postUserFriends);
    app.post('/api/user/huddles', api.postUserHuddles);
    app.post('/api/user/linkedHuddles', api.postUserLinkedHuddles);

    // GET
    app.get('/api/posts/public/categories', api.getPublicPostsWithCategories);
    app.get('/api/posts/public/all', api.getAllPublicPosts);
    app.get('/api/posts/public/:id', api.getPublicPost);
    app.get('/api/posts/public', api.getPublicPostsByQuery);
    app.get('/api/posts/private/categories', api.getPrivatePostsWithCategories);
    app.get('/api/posts/private/all', api.getAllPrivatePosts);
    app.get('/api/posts/private/huddles', api.getPrivatePostsWithHuddleIds);
    app.get('/api/posts/private/:id', api.getPrivatePost);
    app.get('/api/posts/private', api.getPrivatePostsByQuery);
    app.get('/api/users', api.getAllUsers);
    app.get('/api/user/:id', api.getUser);
    //app.get('/api/user', api.getUserByQuery);

    // DELETE
    app.delete('/api/posts/public', api.deletePublicPost);
    app.delete('/api/posts/private', api.deletePrivatePost);
    app.delete('/api/posts/private/huddles', api.deleteHuddles);
    app.delete('/api/posts/public/categories', api.deletePublicPostCategories);
    app.delete('/api/posts/private/categories', api.deletePrivatePostCategories);

};
