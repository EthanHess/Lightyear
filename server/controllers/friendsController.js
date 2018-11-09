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
        const { params } = req;
        //See if they're followed, then follow/unfollow accordingly 
        //Could just do by following object id
        console.log('follow params', params.currentUserId, params.toFollowId)
        console.log('db instance', dbInstance, dbInstance.find_friend_by_id())
        dbInstance.find_friend_by_id([params.currentUserId, params.toFollowId])
        .then(friends => {
            console.log('friends', friends)
            if (friends.length) {
                const friend = friends[0]; 
                console.log('friend', friend)
                dbInstance.unfollow([params.currentUserId, params.toFollowId]).then(response => {
                    res.status(200).send(response)
                }).catch(error => {
                    res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                    console.log('unfollow error', error)
                })
            } else {
                console.log('not following')
                dbInstance.follow([params.currentUserId, params.toFollowId]).then(response => {
                    res.status(200).send(response)
                }).catch(error => {
                    res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                    console.log('follow error', error)
                })
            }
        }).catch(error => {
            console.log('initial follow requrest error', error)
        })
    }, 
    getFriends: (req, res, next) => { //friends = who I follow
        const dbInstance = req.app.get('db'); 
        const id = req.params.id; 
        console.log('id to get friends', id)
        dbInstance.get_friends(id).then(friends => {
            console.log('friends from db', friends)
            res.status(200).send(friends)
        }).catch(error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log('error getting friends', error)
        })
    },
    getFollowers: (req, res, next) => {
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