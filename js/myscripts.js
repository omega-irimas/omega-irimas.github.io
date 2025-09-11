// Function to load profil from json
$(document).ready(function() {
	$.getJSON("jsons/profil.json", function(data){
		$("#myname").append(data.name);
		$("#mytitle").append(data.title);
		$("#img-profil").attr("src", data.image);
		$("#abstract").append(data.abstract);
		for (var i=0; i<data.keywords.length; i++){
			if (i<data.keywords.length-1){
				$("#keywords").append(data.keywords[i] + ', ');
			}else{
				$("#keywords").append(data.keywords[i] + '.');
			}
		}
	});
});

/*
// Function to load news from json
$(document).ready(function() {
    $.getJSON("jsons/news.json", function(data){
    	var numToshow=5;
    	var newsdict = data.news;
    	for (var i=0; i< newsdict.length; i++){
    		if (i<numToshow){
    			$("#list-news").append( "<li style=\"display: list-item;\"><B>" + newsdict[i].date + ":</B> " + newsdict[i].content + "</li>" );
    		}else{
    			$("#list-news").append( "<li style=\"display: none;\"><B>" + newsdict[i].date + ":</B> " + newsdict[i].content + "</li>" );
    		}
    		
    	}

    	// + or -
    	size_li = $("#list-news li").length;
    	x = numToshow;
    	$('#see-more').click(function () {
	        x= (x+1 <= size_li) ? x+5 : size_li;
	        $('#list-news li:lt('+x+')').show();
	    });
	    $('#see-less').click(function () {
	        x=(x-5<0) ? 5 : x-5;
	        x= (x<= 5) ? 5 : x;
	        $('#list-news li').not(':lt('+x+')').hide();
	    });
    });
});
*/

// Function to load projects from json
$(document).ready(function(){
	$.getJSON("jsons/projects.json", function(data){
		//current
		for (var i=0; i<data.current.length; i++){
			partner_string='';
			if (data.current[i].partners.length>0){
				partner_string = ' In collaboration with ';
				for (e=0; e<data.current[i].partners.length; e++){
					if (e>0){
						if (e==(data.current[i].partners.length-1)){
							partner_string = partner_string + ' and ';
						}else{
							partner_string = partner_string + ', ';
						}
					}
					partner_string = partner_string + '<a href="' + data.current[i].partners_links[e] + '" target="_blank">' + data.current[i].partners[e] + '</a>';
				}
				partner_string = partner_string + '.';
			}
			if (data.current[i].link != ''){
				projet_string='<B><a href="' + data.current[i].link + '" target="_blank">' + data.current[i].name + '</a> (' + data.current[i].date + '):</B> ' + data.current[i].topic + '. ';
			}else{
				projet_string='<B><a href="#research">' + data.current[i].name + '</a> (' + data.current[i].date + '):</B> ' + data.current[i].topic + '. ';
			}
			role_string='';
			if (data.current[i].role != ''){
				role_string = '<br><B>Role</B>: ' + data.current[i].role + '.'; 
			}
			funding_string='';
			if (data.current[i].fundings != ''){
				funding_string = ' <B>Fundings</B>: ' + data.current[i].fundings + '.'; 
			}
			$("#projects-current").append('<li>' + projet_string + role_string + partner_string + funding_string + '</li>');
		}

		// past
		for (var i=0; i<data.past.length; i++){
			if (data.past[i].link != ''){
				projet_string='<B><a href="' + data.past[i].link + '" target="_blank">' + data.past[i].name + '</a></B> (' + data.past[i].date + ').';
			}else{
				projet_string='<B><a href="#research">' + data.past[i].name + '</a></B> (' + data.past[i].date + ').';
			}
			role_string='';
			if (data.past[i].role != ''){
				role_string = ' <B>Role:</B> ' + data.past[i].role + '.';
			}
			funding_string='';
			if (data.past[i].fundings != ''){
				funding_string = ' <B>Fundings:</B> ' + data.past[i].fundings + '.'; 
			}
			$("#projects-past").append('<li>' + projet_string + role_string + funding_string + '</li>');
		}
	});
});

// Function to load collabs from json
$(document).ready(function(){
	$.getJSON("jsons/collabs.json", function(data){
		//academic
		for (var i=0; i<data.academic.length; i++){
			if (data.academic[i].link != ''){
				collab_string='<B><a href="' + data.academic[i].link + '" target="_blank">' + data.academic[i].name + '</a></B>, ' + data.academic[i].institution + ', ' + data.academic[i].country + '.';
			}else{
				collab_string='<B><a href="#">' + data.academic[i].name + '</a></B>, ' + data.academic[i].institution + ', ' + data.academic[i].country + '.';
			}
			$("#collabs-academic").append('<li>' + collab_string + '</li>');
		}

		// companies
		for (var i=0; i<data.companies.length; i++){
			if (data.companies[i].link != ''){
				collab_string='<B><a href="' + data.companies[i].link + '" target="_blank">' + data.companies[i].name + '</a></B>, ' + data.companies[i].country + '.';
			}else{
				collab_string='<B><a href="#">' + data.companies[i].name + '</a></B>, ' + data.companies[i].country + '.';
			}
			$("#collabs-company").append('<li>' + collab_string + '</li>');
		}
	});
});

// Function to load people from json
$(document).ready(function(){
	$.getJSON("jsons/people.json", function(data){
		//sort people by last name
		data.permanent.sort(function(a, b) {
		    var nameA = a.lastname.toUpperCase(); // ignore upper and lowercase
		    var nameB = b.lastname.toUpperCase(); // ignore upper and lowercase
		    if (nameA < nameB) {
		        return -1;
		    }
		    if (nameA > nameB) {
		        return 1;
		    }
		    return 0;
		});
		//permanent
		var max_cols=6;
		content_permanent = '<div class="row">';
		for (var i=0; i<data.permanent.length; i++){
			row_pic = '<div class="col-md-2" align="center"><img src="' + data.permanent[i].pic_links + '" width="200px" class="img-thumbnail img-responsive img-fluid center-block"><br>';
			row_name = '<a href="' + data.permanent[i].link + '" target="_blank">' + data.permanent[i].firstname + '<br>' + data.permanent[i].lastname + '</a>';
            row_position = '<br>' + data.permanent[i].position + '</div>';
			content_permanent = content_permanent + row_pic + row_name + row_position;
			if (((i+1)%max_cols)==0){// create a new row
				content_permanent = content_permanent + '</div><div class="row">';
			}
		}
		if ((data.permanent.length%max_cols)==0){
			content_permanent = content_permanent + '</div>';
		}
		
		$("#permanent").append(content_permanent);
		/*
		//phd
		content_phd = '<div class="row">';
		for (var i=0; i<data.student.length; i++){
			row_pic_front = '<div class="flip-card-front"><img src="' + data.student[i].pic_links + '" width="200px" class="img-thumbnail img-responsive img-fluid center-block"></div>';
			row_pic_back = '<div class="flip-card-back img-thumbnail"><br><br><p>' + data.student[i].position + '</p><p>' + data.student[i].dates + '</p></div>'
			row_pic = '<div class="col-md-2" align="center"><div class="flip-card"><div class="flip-card-inner">' + row_pic_front + row_pic_back + '</div></div>'
			row_name = '<a href="' + data.student[i].link + '" target="_blank">' + data.student[i].firstname + '<br>' + data.student[i].lastname + '</a></div>';
			content_phd = content_phd + row_pic + row_name;
			if (((i+1)%max_cols)==0){// create a new row
				content_phd = content_phd + '</div><div class="row">';
			}
		}
		if ((data.student.length%max_cols)==0){
			content_phd = content_phd + '</div>';
		}
		$("#students").append(content_phd);
		*/
	});
});

// Function to load Non permanent members and Alumnis from people_other.json
$(document).ready(function(){
	$.getJSON("jsons/people_other.json", function(data){
		//Non permanent members
		for (var i=0; i<data.NonPermanentMembers.length; i++){
			var member = data.NonPermanentMembers[i];
			var member_string = '<strong>' + member.name + '</strong> - <em>' + member.topic + '</em>. ';
			member_string += '<strong>Period:</strong> ' + member.period;
			if (member.collaboration) {
				member_string += '. <strong>Collaboration:</strong> ' + member.collaboration;
			}
			member_string += '.';
			$("#students").append('<div class="card mb-2 ml-3 shadow-sm"><div class="card-body"><p class="card-text">' + member_string + '</p></div></div>');
		}

		//Alumnis
		for (var i=0; i<data.Alumnis.length; i++){
			var alumni = data.Alumnis[i];
			var alumni_string = '<strong>' + alumni.name + '</strong>';
			if (alumni.topic) {
				alumni_string += ' - <em>' + alumni.topic + '</em>';
			}
			alumni_string += '. ';
			if (alumni.defense) {
				alumni_string += '<strong>Defense:</strong> ' + alumni.defense + '. ';
			}
			if (alumni.visitPeriod) {
				alumni_string += '<strong>Visit Period:</strong> ' + alumni.visitPeriod + '. ';
			}
			if (alumni.collaboration) {
				alumni_string += '<strong>Collaboration:</strong> ' + alumni.collaboration + '.';
			}
			$("#alumnis").append('<div class="card mb-2 ml-3 shadow-sm"><div class="card-body"><p class="card-text">' + alumni_string + '</p></div></div>');
		}

	});
});

// Function to read bib and display publications
$(document).ready(function(){
	$.get('publis/omega.bib', function(data) {
   	res = bibtexParse.toJSON(data);
	
	cptIntArticle=0;
	cptIntNatArticle=0;
	cptIntConf=0;
	cptIntWork=0;
	cptChapter=0;
	cptNatConf=0;

	for (i=0; i<res.length; i++){
		// authors
		authors_string='';
		authors = res[i].entryTags.author.split(' and ');
		for (a=0; a<authors.length-1; a++){
			names = authors[a].split(', ');
			authors_string = authors_string + names[1] + ' ' + names[0] + ', ';
		}
		authors_string = authors_string.substring(0, authors_string.length - 2);
		names = authors[authors.length-1].split(', ');
		if (authors.length == 1){
			authors_string = authors_string + names[1] + ' ' + names[0];
		}else{
			if (names[1] == undefined){
				authors_string = authors_string + ' et. al';
			}
			else{
				authors_string = authors_string + ' and ' + names[1] + ' ' + names[0];
			}
		}
		link_string='<div class="bib">';
		if (res[i].entryTags.hasOwnProperty('pdf')){
			link_string = link_string + '<a href="' + res[i].entryTags.pdf + '" target="blank_"><i class="fas fa-file-pdf-o"></i></a> ';
		}
		if (res[i].entryTags.hasOwnProperty('URL')){
			link_string = link_string + '<a href="' + res[i].entryTags.URL + '" target="blank_"><i class="fas fa-link"></i></a> ';
		}

		link_string += '<a href="javascript: toggleInfos(\'' + res[i].citationKey + '\',\'bibtex\')">[BibTex]</a>';

		if (res[i].entryTags.hasOwnProperty('code')){
			link_string += ' <a href="' + res[i].entryTags.code + '" target="blank_"><i class="fab fa-github-square"></i></a>';
		}

		if (res[i].entryTags.hasOwnProperty('slides')){
			link_string += ' <a href="' + res[i].entryTags.slides + '" target="blank_"><i class="fab fa-slideshare"></i></a>';
		}

		if (res[i].entryTags.hasOwnProperty('webpage')){
			link_string += ' [<a href="' + res[i].entryTags.webpage + '" target="blank_"></i>webpage</a>]';
		}

		link_string += '</div>'

		if (res[i].entryType == "article"){
			if ((res[i].entryTags.hasOwnProperty('language')) && (res[i].entryTags.language == 'french')){
				// national article
				cptIntNatArticle++;
				num_string = '';
				if (res[i].entryTags.hasOwnProperty('number')){
					num_string = '(' + res[i].entryTags.number + ') ';
				}
				pages_string=""
				if (res[i].entryTags.hasOwnProperty('pages')){
					res[i].entryTags.pages = res[i].entryTags.pages.replace("--", "-");
					if (res[i].entryTags.pages.length > 0){
						pages_string = ', pp. ' + res[i].entryTags.pages;
					}
				}
				publi_string = authors_string + '.<br>' + res[i].entryTags.title + '.<br><i>' + res[i].entryTags.journal + ', Vol. ' + res[i].entryTags.volume + num_string + pages_string + ', ' + res[i].entryTags.year +'.</i><br>' + link_string;
				$("#nat_journals").append('<tr id="' + res[i].citationKey + '" class="entry"><td style="width:40px;padding-right:1em;">[' + cptIntNatArticle + ']</td><td>' + publi_string + '</td></tr>');
				if (res[i].entryTags.hasOwnProperty('number')){
					$("#nat_journals").append('<tr id="bib_' + res[i].citationKey + '" class="bibtex noshown"><td style="width:40px"></td><td class="bibtex-col"><pre>\n@article{' + res[i].citationKey + ',\n  author = {' + res[i].entryTags.author + '},\n  title = {' + res[i].entryTags.title + '},\n  journal = {' + res[i].entryTags.journal + '},\n  volume = {' + res[i].entryTags.volume + '},\n  number = {' + res[i].entryTags.number + '},\n  pages = {' + res[i].entryTags.pages + '},\n  url = {' + res[i].entryTags.URL + '},\n  year = {'+ res[i].entryTags.year + '}\n}' + '</td></tr>');
				}else{
					$("#nat_journals").append('<tr id="bib_' + res[i].citationKey + '" class="bibtex noshown"><td style="width:40px"></td><td class="bibtex-col"><pre>\n@article{' + res[i].citationKey + ',\n  author = {' + res[i].entryTags.author + '},\n  title = {' + res[i].entryTags.title + '},\n  journal = {' + res[i].entryTags.journal + '},\n  volume = {' + res[i].entryTags.volume + '},\n  pages = {' + res[i].entryTags.pages + '},\n  url = {' + res[i].entryTags.URL + '},\n  year = {'+ res[i].entryTags.year + '}\n}' + '</td></tr>');
				}
			}else{
				// article
				cptIntArticle++;
				num_string = '';
				if (res[i].entryTags.hasOwnProperty('number')){
					num_string = '(' + res[i].entryTags.number + ') ';
				}
				pages_string=""
				if (res[i].entryTags.hasOwnProperty('pages')){
					res[i].entryTags.pages = res[i].entryTags.pages.replace("--", "-");
					if (res[i].entryTags.pages.length > 0){
						pages_string = ', pp. ' + res[i].entryTags.pages;
					}
				}
				vol_string = "";
				if (res[i].entryTags.hasOwnProperty('volume')){
					if (res[i].entryTags.volume.length > 0){
						vol_string = ', Vol. ' + res[i].entryTags.volume;
					}
				}
				publi_string = authors_string + '.<br>' + res[i].entryTags.title + '.<br><i>' + res[i].entryTags.journal + vol_string + num_string + pages_string + ', ' + res[i].entryTags.year +'.</i><br>' + link_string;
				$("#int_journals").append('<tr id="' + res[i].citationKey + '" class="entry"><td style="width:40px;padding-right:1em;">[' + cptIntArticle + ']</td><td>' + publi_string + '</td></tr>');
				if (res[i].entryTags.hasOwnProperty('number')){
					$("#int_journals").append('<tr id="bib_' + res[i].citationKey + '" class="bibtex noshown"><td style="width:40px"></td><td class="bibtex-col"><pre>\n@article{' + res[i].citationKey + ',\n  author = {' + res[i].entryTags.author + '},\n  title = {' + res[i].entryTags.title + '},\n  journal = {' + res[i].entryTags.journal + '},\n  volume = {' + res[i].entryTags.volume + '},\n  number = {' + res[i].entryTags.number + '},\n  pages = {' + res[i].entryTags.pages + '},\n  url = {' + res[i].entryTags.URL + '},\n  year = {'+ res[i].entryTags.year + '}\n}' + '</td></tr>');
				}else{
					$("#int_journals").append('<tr id="bib_' + res[i].citationKey + '" class="bibtex noshown"><td style="width:40px"></td><td class="bibtex-col"><pre>\n@article{' + res[i].citationKey + ',\n  author = {' + res[i].entryTags.author + '},\n  title = {' + res[i].entryTags.title + '},\n  journal = {' + res[i].entryTags.journal + '},\n  volume = {' + res[i].entryTags.volume + '},\n  pages = {' + res[i].entryTags.pages + '},\n  url = {' + res[i].entryTags.URL + '},\n  year = {'+ res[i].entryTags.year + '}\n}' + '</td></tr>');
				}	
			}
		}else if (res[i].entryType == 'inproceedings'){
			if ((res[i].entryTags.hasOwnProperty('language')) && (res[i].entryTags.language == 'french')){
				// national conf
				cptNatConf++;
				publi_string = authors_string + '.<br>' + res[i].entryTags.title + '.<br><i>' + res[i].entryTags.booktitle + ', ' + res[i].entryTags.address + ', ' + res[i].entryTags.year +'.</i><br>' + link_string;
				$("#nat_confs").append('<tr id="' + res[i].citationKey + '" class="entry"><td style="width:40px;padding-right:1em;">[' + cptNatConf + ']</td><td>' + publi_string + '</td></tr>');
				$("#nat_confs").append('<tr id="bib_' + res[i].citationKey + '" class="bibtex noshown"><td style="width:40px"></td><td class="bibtex-col"><pre>\n@inproceedings{' + res[i].citationKey + ',\n  author = {' + res[i].entryTags.author + '},\n  title = {' + res[i].entryTags.title + '},\n  booktitle = {' + res[i].entryTags.booktitle + '},\n  address = {' + res[i].entryTags.address + '},\n  pages = {' + res[i].entryTags.pages + '},\n  url = {' + res[i].entryTags.URL + '},\n  year = {'+ res[i].entryTags.year + '}\n}' + '</td></tr>');
			}else if ((res[i].entryTags.hasOwnProperty('workshop')) && (res[i].entryTags.workshop == 'True')){
				// international workshop
				cptIntWork++;
				publi_string = authors_string + '.<br>' + res[i].entryTags.title + '.<br><i>' + res[i].entryTags.booktitle + ', ' + res[i].entryTags.address + ', ' + res[i].entryTags.year +'.</i><br>' + link_string;
				$("#int_workshops").append('<tr id="' + res[i].citationKey + '" class="entry"><td style="width:40px;padding-right:1em;">[' + cptIntWork + ']</td><td>' + publi_string + '</td></tr>');
				$("#int_workshops").append('<tr id="bib_' + res[i].citationKey + '" class="bibtex noshown"><td style="width:40px"></td><td class="bibtex-col"><pre>\n@inproceedings{' + res[i].citationKey + ',\n  author = {' + res[i].entryTags.author + '},\n  title = {' + res[i].entryTags.title + '},\n  booktitle = {' + res[i].entryTags.booktitle + '},\n  address = {' + res[i].entryTags.address + '},\n  pages = {' + res[i].entryTags.pages + '},\n  url = {' + res[i].entryTags.URL + '},\n  year = {'+ res[i].entryTags.year + '}\n}' + '</td></tr>');
			}else{
				// international conf
				cptIntConf++;
				publi_string = authors_string + '.<br>' + res[i].entryTags.title + '.<br><i>' + res[i].entryTags.booktitle + ', ' + res[i].entryTags.address + ', ' + res[i].entryTags.year +'.</i><br>' + link_string;
				$("#int_confs").append('<tr id="' + res[i].citationKey + '" class="entry"><td style="width:40px;padding-right:1em;">[' + cptIntConf + ']</td><td>' + publi_string + '</td></tr>');
				$("#int_confs").append('<tr id="bib_' + res[i].citationKey + '" class="bibtex noshown"><td style="width:40px"></td><td class="bibtex-col"><pre>\n@inproceedings{' + res[i].citationKey + ',\n  author = {' + res[i].entryTags.author + '},\n  title = {' + res[i].entryTags.title + '},\n  booktitle = {' + res[i].entryTags.booktitle + '},\n  address = {' + res[i].entryTags.address + '},\n  pages = {' + res[i].entryTags.pages + '},\n  url = {' + res[i].entryTags.URL + '},\n  year = {'+ res[i].entryTags.year + '}\n}' + '</td></tr>');
			}
		}else if (res[i].entryType == 'inbook'){
			// book chapter
			cptChapter++;
			res[i].entryTags.pages = res[i].entryTags.pages.replace("--", "-")
			publi_string = authors_string + '.<br>' + res[i].entryTags.title + '.<br><i>' + res[i].entryTags.booktitle + ', pp.' + res[i].entryTags.pages + ', ' + res[i].entryTags.year +'.</i><br>' + link_string;
			$("#chapters").append('<tr id="' + res[i].citationKey + '" class="entry"><td style="width:40px;padding-right:1em;">[' + cptChapter + ']</td><td>' + publi_string + '</td></tr>');
			$("#chapters").append('<tr id="bib_' + res[i].citationKey + '" class="bibtex noshown"><td style="width:40px"></td><td class="bibtex-col"><pre>\n@inbook{' + res[i].citationKey + ',\n  author = {' + res[i].entryTags.author + '},\n  title = {' + res[i].entryTags.title + '},\n  booktitle = {' + res[i].entryTags.booktitle + '},\n  pages = {' + res[i].entryTags.pages + '},\n  url = {' + res[i].entryTags.url + '},\n  year = {'+ res[i].entryTags.year + '},\n  editor = {' + res[i].entryTags.editor + '}\n}' + '</td></tr>');
		}
	}

}, 'text');
});



function toggleInfos(articleid,info) {
    var entry = document.getElementById(articleid);
    var abs = document.getElementById('abs_'+articleid);
    var rev = document.getElementById('rev_'+articleid);
    var bib = document.getElementById("bib_"+articleid);

    if ($("#bib_"+articleid).is(":hidden")){
    	$("#bib_"+articleid).show();
    }else{
    	$("#bib_"+articleid).hide();
    }

    if (abs && info == 'abstract') {
      abs.className.indexOf('noshow') == -1?abs.className = 'abstract noshow':abs.className = 'abstract shown';
    } else if (rev && info == 'review') {
      rev.className.indexOf('noshow') == -1?rev.className = 'review noshow':rev.className = 'review shown';
    } else if (bib && info == 'bibtex') {
      bib.className.indexOf('noshow') == -1?bib.className = 'bibtex noshow':bib.className = 'bibtex shown';
    } else { 
      return;
    }

  // check if one or the other is available
  var revshow; var absshow; var bibshow;
  (abs && abs.className.indexOf('noshow') == -1)? absshow = true: absshow = false;
  (rev && rev.className.indexOf('noshow') == -1)? revshow = true: revshow = false;  
  (bib && bib.className.indexOf('noshow') == -1)? bibshow = true: bibshow = false;
  
  // highlight original entry
  if(entry) {
    if (revshow || absshow || bibshow) {
      entry.className = 'entry highlight shown';
    } else {
      entry.className = 'entry shown';
    }
  }
}


// Function for smooth scroll on links
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});