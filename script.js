var default_content="";

$(document).ready(function(){

	checkURL();
	$('ul li a').click(function (e){
			checkURL(this.hash);
	});

	//filling in the default content
	default_content = $('#pageContent').html();


	setInterval("checkURL()",250);

});

var lasturl="";

function checkURL(hash)
{
	if(!hash) hash=window.location.hash;

	if(hash != lasturl)
	{
		lasturl=hash;
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content
		if(hash=="")
		$('#pageContent').html(default_content);

		else{
		 if(hash=="#products")
		 	loadProducts();
		 else
		   loadPage(hash);
		}
	}
}


function loadPage(url)
{
	url=url.replace('#','');

	$('#loading').css('visibility','visible');

	$.ajax({
		type: "POST",
		url: "load_page.jsp",
		data: 'page='+url,
		dataType: "html",
		success: function(msg){

			if(parseInt(msg)!=0)
			{
				$('#pageContent').html(msg);
				$('#loading').css('visibility','hidden');
			}
		}

	});

}

function loadProducts() {
  $('#loading').css('visibility','visible');
  var jsonURL = "products.json";
  $.getJSON(jsonURL, function (json)
  {
    var imgList= "<ul class=\"products\">";
    $.each(json.products, function () {
	  //imgList += '<li><a href="#products_mushroom"><img src= "' + this.imgPath + '"><h3>' + this.name + '</h3></a></li>';
	  imgList += '<li><a href="#' + this.detail +'"><img src= "' + this.imgPath + '"><h3>' + this.name + '</h3></li></a>';
    });
    imgList+='</ul>'
   $('#pageContent').html(imgList);
   $('#loading').css('visibility','hidden');
  });
}