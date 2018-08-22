$(function(){
	let key = 'dl1fmuP6zpGdf80JMVWNPZMNhM8uOsxu';

	let urlProjects = 'https://api.behance.net/v2/users/bezantee/projects?client_id=' +key;

	if($('#index').length > 0){
		
		$.ajax({
			url:urlProjects,
			dataType:'jsonp',
				success:function(res){

					_(res.projects).each(function(project){
						// console.log(project);
						$('<li>'+project.name+' <img src="'+project.covers.original+'" alt=""> <a href="project.html?id='+project.id+'">See More</a></li>').appendTo('ul.projects');
					});

				}
		});
	}

	if($('#project').length > 0){
		//show a specific project
		let pageURL = new URL(document.location);
		let params = pageURL.searchParams;
		let id = params.get('id');

		let urlProject = 'http://www.behance.net/v2/projects/'+id+'?api_key=' +key;

		$.ajax({
			url: urlProject,
			dataType: 'jsonp',
			success: function(res){
				// console.log(res);
				let project = res.project;

				$('<h1>'+project.name+'</h1>').appendTo('.container')
				$('<p>'+project.description+'</p>').appendTo('.container')
				$('<h3>'+moment.unix(project.published_on).fromNow()+'</h3>').appendTo('.container')
				$('<img src="'+project.covers.original+'" alt="">').appendTo('.container')
			}
		});


		let urlProjectComments = 'http://www.behance.net/v2/projects/'+id+'/comments?api_key=' +key;
		$.ajax({
			url: urlProjectComments,
			dataType: 'jsonp',
			success: function(res){
				console.log(res);
				let comments = res.comments;

				_(comments).each(function(item,i){

					if(i<1000){
						$('<div><div class="author"><img src="'+item.user.images['138']+'"></div><div class="bla">'+item.comment+'</div></div>').appendTo('.comments-container');
					}
					
				});

				// $('<h1>'+project.name+'</h1>').appendTo('.container')
				// $('<p>'+project.description+'</p>').appendTo('.container')
				// $('<h3>'+moment.unix(project.published_on).fromNow()+'</h3>').appendTo('.container')
				// $('<img src="'+project.covers.original+'" alt="">').appendTo('.container')
			}
		});




	}

	// var menuOffset = $('.pure-menu-horizontal').offset();
	//     $(document).on('scroll',function(){

	//         var iScrollTop = $(document).scrollTop();

	//         if(iScrollTop > menuOffset.top){
	//             //fix it
	//             $('.pure-menu-horizontal').addClass('fixed');
	//         }else{
	//             //unfix it
	//             $('.pure-menu-horizontal').removeClass('fixed');

	//         }
	// });
	
});