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
    getFriendsPosts:(req, rex, next) => {

    }, 
    getPostsForUser:(req, rex, next) => {
        const dbInstance = req.qpp.get('db'); 
        const { userId } = req.body; 
        dbInstance.get_posts_for_user(userId)
        .then(posts => res.status(200).send(posts))
        .catch(error => {
           res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
           console.log(error)
        })
    },
    //TODO add to app.js
    getPostById: (req, res, next) => {

    }, 
    updateArchive: (req, res, next) => {

    }
}