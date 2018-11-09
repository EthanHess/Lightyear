module.exports = {
    getAllUsers: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        dbInstance.get_all_users()
        .then( users => { 
            console.log('users from db', users)
            res.status(200).send(users)
        })
        .catch( error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(error)
        })
    }, 
    followUnfollowUser: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { currentUserId, toFollowId } = req.body; 

        //See if they're followed, then follow/unfollow accordingly 
        //Could just do by following object id
        dbInstance.find_friend_by_id([currentUserId, toFollowId])
        .then(friends => {
            if (friend.length) {
                const friend = friends[0]; 
                console.log('friend', friend)
                dbInstance.unfollow([currentUserId, toFollowId]).then(response => {
                    res.status(200).send(response)
                }).catch(error => {
                    res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                    console.log(error)
                })
            } else {
                dbInstance.follow([currentUserId, toFollowId]).then(response => {
                    res.status(200).send(response)
                }).catch(error => {
                    res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                    console.log(error)
                })
            }
        })
    }, 
    // unfollowUser: (req, res, next) => {
    //     const dbInstance = req.app.get('db'); 
    //     //TODO complete
    // }, 
    getFriends: (req, res, next) => { //friends = who I follow

    },
    getFollorwers: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { userId } = req.body; //Should do req.params.query instead? 
        dbInstance.get_followers([userId])
        .then( followers => {
            console.log('followers from db', followers)
            res.status(200).send(followers)
        })
        .catch(error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(error)
        })
    }
}