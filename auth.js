var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var user=require('./models/user');
passport.use(new LocalStrategy(

	function(username, password, done) {
		// code for register user
		// var u=new user();
		// u.username="mihirism1995@gmail.com";
		// u.password=u.generateHash("123456");
		// u.save(function(err,res){
		// 	if(err){
		// 		console.log(err);
		// 	}
		// 	else{

		// 	}
		// })
		// console.log("in function");
		user.findOne({username:username},function(err,user){
			console.log(user);
			if(err){
				return done(null, false);
			}
			else{
				if(!user){
					return done(null, false);
				}
				if(!user.validPassword(password)){
					return done(null, false);
				}
				else{
					return done(null,user);
				}
				
			}
		})
		
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

module.exports = passport;