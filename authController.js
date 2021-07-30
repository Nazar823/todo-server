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


// class authController {
//     async registration(req, res){
//         try {
//
//         } catch (e){
//
//         }
//
//     }
//     async login(req, res){
//         try {
//             res.json("Working")
//         } catch (e){
//
//         }
//
//     }
//     async getUsers (req, res){
//         try {
//             res.json("working")
//         } catch (e){
//
//         }
//     }
// }
//
// module.exports = new authController()