module.exports = {
    createArchive: (req, res, next) => {
        console.log('create archive', req); 
        const dbInstance = req.app.get('db'); 
        const { userId, mediaUrl, description, mainURL } = req.body; 
        console.log('req.body', req.body)
        dbInstance.create_archive([userId, mediaUrl, description, mainURL])
        .then( ()=> res.sendStatus(200))
        .catch(error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log('create archive error', error)
        })
    }, 
    getArchiveById: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { params } = req; 
        //TODO finish when needed
    }, 
    getAllArchives: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { userId } = req.body; 
        dbInstance.get_archives_for_user(userId)
        .then(archives => res.status(200).send(archives))
        .catch(error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(error)
        })
    }, 
    updateArchive: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { params, query } = req; 
        //Be able to update archive?
    }, 
    deleteArchive: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { params } = req; 
        console.log('query desc', query.desc)
        dbInstance.delete_archive([params.author_id, params.id])
        .then( () => res.sendStatus(200))
        .catch( error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(error)
        })
    }
}
