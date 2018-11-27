module.exports = {
    createPost:(req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { user_id, title, author_name, author_image, post_media } = req.body; 
        dbInstance.create_post([user_id, title, author_name, author_image, post_media])
        .then( ()=> res.sendStatus(200)) //TODO send posts here? 
        .catch(error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log('create post error', error)
        })
    }, 
    deletePost:(req, res, next) => {

    }, 
    getAllPosts:(req, res, next) => {
        const dbInstance = req.app.get('db'); 
        dbInstance.get_all_posts()
        .then(posts => res.status(200).send(posts))
        .catch(error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log('post fetching error', error)
        })
    }, 
    getFriendsPosts:(req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { array } = req.body; 
        console.log('get friends post enpoint hit', array, req.body)
        dbInstance.get_friends_posts([array])
        .then(posts => {
            console.log('the posts from my friends', posts)
            res.status(200).send(posts)
        }).catch(error => {
           res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
           console.log('get friends post error catch handler', error)
        })
    }, 
    getPostsForUser:(req, rex, next) => {
        const dbInstance = req.app.get('db'); 
        const { params } = req; 
        dbInstance.get_posts_for_user(params.id)
        .then(posts => res.status(200).send(posts))
        .catch(error => {
           res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
           console.log(error)
        })
    },
    //TODO add to app.js
    getPostById: (req, res, next) => {

    }, 
    updatePost: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { params } = req; //May not need author ID
        const { updateText } = req.body; 
        console.log('req.body for update backend', updateText, req.body)
        dbInstance.update_post([updateText, params.id])
        .then(newPost => res.status(200).send(newPost))
        .catch(error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log('post update error', error)
        })
    }
}