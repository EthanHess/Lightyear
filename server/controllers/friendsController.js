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
    }
}