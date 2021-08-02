module.exports.registration = async (req, res, next) => {

    try {


    } catch (error) {
        return next(error)
    }
}
module.exports.login = async (req, res, next) => {

    try {
        res.send('Login working')

    } catch (error) {
        return next(error)
    }
}
module.exports.getUsers = async (req, res, next) => {
    try {
        res.send('get all!')

    } catch (error) {
        console.log()
    }
}