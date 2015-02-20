var express = require('express');
var router = express.Router();
var user =  require('./../models/user');
var passport = require('./../auth');
var blog = require('./../models/blog');

router.get('/blog_home', function(req, res, next) {
  if(req.session.passport.user === undefined){
  	res.redirect("/");
  }
  else{
  		blog.find({user_id:req.user._id},function(err,blogs){
	  	if(err){
	  		console.log("error");
	  	}
	  	else{
	  		//console.log(req.user._id);
	  		res.render('blog_home', { title: 'Blog',blog:blogs,user:req.user });		
	  	}
	  })
  }
});
router.get('/blog_index', function(req, res, next) {
	blog.find(function(err,blogs){
	  	if(err){
	  		console.log("error");
	  	}
	  	else{
	  		//console.log(req.user._id);
	  		res.render('blog_index', { title: 'Blog',blog:blogs});		
	  	}		
	});
});
router.get('/add_blog',function(req,res,next){
	if(req.session.passport.user === undefined){
		res.redirect('/');
	}
	else{
		res.render('add_blog',{title:'Add post',user:req.user});
	}
});
router.post('/add_post',function(req,res,err){
	if(req.session.passport.user === undefined){
		res.redirect('/');
	}
	else{
		var c = new blog({
			title:req.body.blog_title,
			body:req.body.blog_body,
			user_id:req.body.user_id
		})
		c.save(function(err){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/blog/blog_home");
			}
		})
	}
});
router.get('/delete/:_id',function(req,res,err){
	if(req.session.passport.user === undefined){
		redirect("/");
	}
	else{
		console.log(req.params._id);
		blog.remove({_id:req.params._id},function(err,result){
			if(err){
				console.log(err);
			}
			else{
				res.redirect('/blog/blog_home');
			}
		})
	}
});

router.get('/edit_blog/:_id',function(req,res,err){
	if(req.session.passport.user === undefined){
		res.redirect('/');
	}
	else{
		blog.findOne({_id:req.params._id},function(err,blog){
			if(err){
				console.log(err);
			}
			else{
				res.render('edit_blog',{title:"Edit blog",blog:blog,user:req.user});
			}
		});
	}
});
router.post('/edit_post',function(req,res,err){
	if(req.session.passport.user === undefined){
		res.redirect("/");
	}
	else{
		blog.update({_id:req.body._id},{$set:{title:req.body.blog_title,body:req.body.blog_body}},function(err,result){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/blog/blog_home");
		}
	})
	}
})
module.exports = router;