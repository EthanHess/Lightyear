module.exports = {
    getLikesForPost: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const postid = req.params.postid; 
        dbInstance.getLikesForPost(postid).
        then(likes => {
            if (likes) {
                console.log('likes for post', likes)
                res.status(200).send(likes)
            } else {
                console.log('no likes')
                res.status(200).send([])
            }
        }).catch(error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log('error getting likes for post', error)
        })
    }, 
    likeHandler: (req, res, next) => { //Query for like then add/remove accordingly. Like following
        const dbInstance = req.app.get('db'); 
        const { params } = req; 
        dbInstance.see_if_liked([params.postid, params.likerid])
        .then(likes => {
            if (likes.length) {
                dbInstance.unlike_post([param.postid, params.likerid])
                .then(response => {
                    res.status(200).send(response)
                }).catch(error => {
                    res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                    console.log('unlike error', error)
                })
            } else {
                dbInstance.like_post([param.postid, params.likerid])
                .then(response => {
                    res.status(200).send(response)
                }).catch(error => {
                    res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                    console.log('like error', error)
                })
            }
        }).catch(error => {
            console.log('initial like requrest error', error)
        })
    }
}