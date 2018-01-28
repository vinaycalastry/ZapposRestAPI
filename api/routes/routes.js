var apiController = require('../controller/apiController.js');

module.exports = function(app){
    //Main Route for API
    app.route('/').get(apiController.root);

    /*Routes for Restaurant*/
    
    app.route('/restaurant/:Name')
    .get()
    .post()
    .delete();

    
    app.route('/menu/:Name')
    .get()
    .post()
    .delete();


    app.route('/menuitem/:Name')
    .get()
    .post()
    .delete();

}