module.exports = {
    //Description could be from title or NASA, mediaUrl could be video/pic
    createArchive: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { userId, mediaUrl, description } = req.body; 
        dbInstance.create_archive([userId, mediaUrl, description])
        .then( ()=> res.sendStatus(200))
        .catch(error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(error)
        })
    }, 
    getArchiveById: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        const { params } = req; 
        //TODO finish when needed
    }, 
    getAllArchives: (req, res, next) => {
        const dbInstance = req.app.get('db'); 
        dbInstance.get_archived_for_user()
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
        dbInstance.delete_archive([params.id, query.desc])
        .then( () => res.sendStatus(200))
        .catch( error => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        })
    }
}
