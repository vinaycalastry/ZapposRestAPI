//Include Unit Testing dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

var dbConnection = require('../api/models/restaurantModel.js');
var _redis = require("redis");
var redis = _redis.createClient(process.env.REDISPORT, process.env.REDISIP);

chai.use(chaiHttp);

var rid;
var mid;
var miid;

//Test the Base Route
describe('/GET BaseRoute', function() {
    it('It should test if webservice is up', function(done){
      chai.request(app)
          .get('/')
          .end(function(err,res) {
              res.should.have.status(200);              
              done();
          });
    });
});

//Try to fetch the retaurant details from empty table in DB
describe('/GET Restaurant', function() {
    it('It should test if webservice sends No Rows found', function(done){
        var test_rid = 1;
        dbConnection.query("DELETE FROM `restaurants`");
        redis.flushall();
         chai.request(app)
                .get('/restaurant/'+test_rid)
                .end(function(err,res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');                    
                    res.body.should.have.property('Error').eql('No rows found.');
                    done();
          });
    });
});

//Add a restaurant to DB
describe('/POST Restaurant', function() {
    it('It should test if Restaurant details are added to DB', function(done){
        //Delete all rows from restaurants table before testing
        dbConnection.query("DELETE FROM `restaurants`");
        redis.flushall();
        var restaurant = {"RNAME":"Jack in the Box","ADDRESS":"San Fransisco","PHONE":"500-004-3003"};
         chai.request(app)
            .post('/restaurant')
            .send(restaurant)
            .end(function(err,res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                rid = res.body.RID;                
                done();
          });
    });
});

//Fetch the restaurant from DB
describe('/GET Restaurant from DB', function() {
    it('It should test if Restaurant details are retrieved from DB', function(done){
        chai.request(app)
                .get('/restaurant/'+rid)
                .end(function(err,res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');                    
                    res.body.should.have.property('RID');
                    res.body.should.have.property('RNAME');
                    res.body.should.have.property('ADDRESS');
                    res.body.should.have.property('PHONE');                    
                    done();
        });
    });
    
});



//Try to fetch the menu details from empty menus table in DB
describe('/GET Menu', function() {
    it('It should test if webservice sends No Rows found for Menus in DB', function(done){
        var test_mid = 1;
        dbConnection.query("DELETE FROM `menus`");
        redis.flushall();
         chai.request(app)
                .get('/menu/'+test_mid)
                .end(function(err,res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');                    
                    res.body.should.have.property('Error').eql('No rows found.');
                    done();
          });
    });
});

//Add a Menu to DB
describe('/POST Menu', function() {
    it('It should test if Menu is properly added to DB', function(done){
        //Delete all rows from restaurants table before testing
        dbConnection.query("DELETE FROM `menus`");
        redis.flushall();
        var menu = {"MNAME":"Dinner","MDETAILS":"All dishes relating to dinner before 9:00PM are stored here","RID":rid};
         chai.request(app)
            .post('/menu')
            .send(menu)
            .end(function(err,res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                mid = res.body.MID;                
                done();
          });
    });
});

//Fetch the Menu from DB
describe('/GET Menu', function() {
    it('It should get the previously added menu from menus table in DB', function(done){
        chai.request(app)
                .get('/menu/'+mid)
                .end(function(err,res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');                    
                    res.body.should.have.property('MID');
                    res.body.should.have.property('MNAME');
                    res.body.should.have.property('MDETAILS');
                    res.body.should.have.property('RID');                    
                    done();
        });
    });
});




//Try to fetch the menu item details from empty menu items table in DB
describe('/GET menuItem', function() {
    it('It should test if webservice sends No Rows found for MenuItems GET request', function(done){
        var test_miid = 1;
        dbConnection.query("DELETE FROM `menuitems`");
        redis.flushall();
         chai.request(app)
                .get('/menuItem/'+test_miid)
                .end(function(err,res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');                    
                    res.body.should.have.property('Error').eql('No rows found.');
                    done();
          });
    });
});

//Add a new MenuItem for a menu to menuitems table in DB
describe('/POST menuItem', function() {
    it('It should test if Menu is properly added to DB', function(done){
        //Delete all rows from restaurants table before testing
        dbConnection.query("DELETE FROM `menuitems`");
        redis.flushall();
        var menuItem = {"MITEMNAME":"PrimeRib","MITEMDETAILS":"Burger","MITEMPRICE":4.95,"MID":mid,"RID":rid};
         chai.request(app)
            .post('/menuItem')
            .send(menuItem)
            .end(function(err,res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                miid = res.body.MIID;                
                done();
          });
    });
});

//Fetch the MenuItem from DB
describe('/GET menuItem', function() {
    it('It should get the previously added menuitem from menuitems table in DB', function(done){
        chai.request(app)
                .get('/menuItem/'+miid)
                .end(function(err,res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');                    
                    res.body.should.have.property('MIID');
                    res.body.should.have.property('MITEMNAME');
                    res.body.should.have.property('MITEMDETAILS');
                    res.body.should.have.property('MITEMPRICE');
                    res.body.should.have.property('MID');
                    res.body.should.have.property('RID');                  
                    done();
        });
    });
});




//Delete the MenuItem details from DB
describe('/DELETE menuItem', function() {
    it('It should delete the previously added menuitem from menuitems table in DB', function(done){        
        chai.request(app)
                .delete('/menuItem/'+miid)
                .end(function(err,res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');                    
                    res.body.should.have.property('Message');
                    done();
        });
    });
});


//Delete the recently added menu details from DB
describe('/DELETE Menu', function() {
    it('It should delete the previously added menu from menus table in DB', function(done){        
        chai.request(app)
                .delete('/menu/'+mid)
                .end(function(err,res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');                    
                    res.body.should.have.property('Message');
                    done();
        });
    });
});


//Delete the restaurant details from DB
describe('/DELETE Restaurant', function() {
    it('It should test if Restaurant details are deleted from Restaurant Table in DB', function(done){        
        chai.request(app)
                .delete('/restaurant/'+rid)
                .end(function(err,res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');                    
                    res.body.should.have.property('Message');
                    done();
        });
    });
});