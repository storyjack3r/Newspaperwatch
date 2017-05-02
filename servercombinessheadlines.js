/* Setting things up. */
var path = require('path'),
    express = require('express'),
    app = express(),   
    Twit = require('twit'),
    config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/make-an-image-posting-twitter-bot/#creating-a-twitter-app*/      
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter),
    stream = T.stream('statuses/sample'),
    Tw = new Twit(config.twitter);

app.use(express.static('public'));

/* You can use uptimerobot.com or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

app.all("/" + process.env.BOT_ENDPOINT, function (request, response) {
    /* The example below tweets out "Hello world!". */
    retweetLatest();
});

var listener = app.listen(process.env.PORT, function () {
    console.log('Your bot is running on port ' + listener.address().port);
});


//---------------------------

function removeURLs(str, identifier){
	
            var returnString = str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
            return returnString;
          }


function searchForSubject(arr, subject){

	for (var i = 0; i <= arr.length - 1; i++) {
	var str=arr[i].text;
	var n = str.search(subject);
    	   
	//search() returns a -1 if the search term doesn't exist in string
	if(n!=-1){
		return str;
	}

};
}

function cutTweetInHalf(str, endHalf) {
    
    var halfway = str.length*0.5;
    var halfway = Math.round(halfway);
    var startingPoint = halfway * endHalf;
    var endingPoint = startingPoint + halfway;
    var res = str.substring(startingPoint, endingPoint);
// var lastIndex = str.lastIndexOf(" ");

// var str = str.substring(0, lastIndex);
  
  return res;

}

// This function finds the latest tweet with the word 'advice', and retweets it.
function retweetLatest() {
  var guardianRtTxt;
  var torygraphRtTxt="debug0";
  // var adviceSubjects = ["love", "life", "success", "money", "happiness", "bad", "careers", "astrology", "philosophy","truth","lies"];
  // var typeStatements = ["advice", "bad advice", "advice quote"]
  // var yy=Math.floor((Math.random() * typeStatements.length));
  // var xx=Math.floor((Math.random() * adviceSubjects.length));
  // var adviceSubject= adviceSubjects[xx];
  // var typeStatement= typeStatements[yy];
  // var searchTerm = typeStatement + " " + adviceSubject;
//   function stripOutText(tweet){
//     var replaced = tweet.substring(tweet.indexOf("is"));
// }
  
var searchTerm = "Trump";

//var adviceSearch = {q: searchTerm, count: 10, result_type: "mixed" }; 
  //statuses/user_timeline
  // T.get('search/tweets', { q: 'trump', count: 10, screen_name: 'guardian' }, function (error, data, response) {
	
    //T.get('search/tweets', adviceSearch, function (error, data, response) {
    // T.get('search/tweets', adviceSearch, function (error, data, response) {  
	  // log out any errors and responses

  var countN = 100;
  var options1 = { screen_name: 'guardian',
                count: countN };
  var options2 = { screen_name: 'telegraph',
                count: countN };

T.get('statuses/user_timeline', options1 , function (error, data, response) {
  
	  if (!error) {
    	//random selection method
      //var x=Math.floor((Math.random() * countN)+1);
      //guardianRtTxt = data[x].text;
      
      guardianRtTxt = searchForSubject(data, searchTerm);
      
      guardianRtTxt = removeURLs(guardianRtTxt);
      guardianRtTxt = cutTweetInHalf(guardianRtTxt, 0);

      Tw.get('statuses/user_timeline', options2 , function (err, dat, resp) {
        
	      if (!err) {
        
          // var y=Math.floor((Math.random() * 10)+1);
          // torygraphRtTxt = dat[y].text;
          
          torygraphRtTxt = searchForSubject(dat, searchTerm);
          
          removeURLs(torygraphRtTxt);
          torygraphRtTxt = cutTweetInHalf(torygraphRtTxt, 1);
          
          
          
          var retweetTxt = guardianRtTxt + torygraphRtTxt;
      
  var statusComposer = retweetTxt;
      
		
	T.post('statuses/update', { status: statusComposer}, function(error, data, response) {
			if (response) {
        response.sendStatus(200);
          
          
        }
      });
      
// var retweetTxt = guardianRtTxt + torygraphRtTxt;
      
//       // //take out @mentions
//       // retweetTxt=retweetTxt.replace(/(@\S+)/gi,"");
//       // //remove hashtags
//       // retweetTxt=retweetTxt.replace("#","");
//       // //take out retweets
//       // retweetTxt=retweetTxt.replace("RT:","");
//       // retweetTxt=retweetTxt.replace("RT","");
//       // //take out additional spaces
//       // retweetTxt=retweetTxt.replace(/\s+/g,' ').trim();
//       // var rtTxtArray =retweetTxt.split(" ");
//       // // var retweetTxt = wordSwapsies(rtTxtArray);
//       // retweetTxt=retweetTxt.replace("undefined","");
//       // var tweeter = data.statuses[x].user.name;
      
//        // var statusComposer = "'" + retweetTxt + "' - " + tweeter;
//   var statusComposer = retweetTxt;
//       //var statusComposer = "Hello James!";
		
// 	T.post('statuses/update', { status: statusComposer}, function(error, data, response) {
// 			if (response) {
//         response.sendStatus(200);
         
        
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				
        response.sendStatus(500);
        var statusComposer = "500 error";
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your search:', error);
      response.sendStatus(200);
      var statusComposer = "200 error";
	  }
	});
}
//   function wordSwapsies(txtArray){
//   for (var i = 0; i < txtArray.length; i++) {
// 	var thisWord = txtArray[i];
// 	var changeWord;
//   var newAdvice;
// switch (thisWord) {
//     case "good":
//         changeWord = "bad";
//         break;
//     case "bad":
//         changeWord = "good";
//         break;
//     case "love":
//         changeWord = "hate";
//         break;
//     case "hate":
//         changeWord = "love";
//         break;
//     case "ignore":
//         changeWord = "listen to";
//         break;
//     case "best":
//         changeWord = "worst";
//         break;
//     case "worst":
//         changeWord = "best";
//         break;
//     case "friends":
//         changeWord = "enemies";
//         break;
//     case "family":
//         changeWord = "strangers";
//         break;
//     case "enemies":
//         changeWord = "friends";
//         break;
//     case "philosophy":
//         changeWord = "bullshit";
//         break;
//     case "right":
//         changeWord = "wrong";
//         break;
//     case "helpful":
//         changeWord = "useless";
//         break;
//     default:
//     changeWord = thisWord;
//     }

// newAdvice+= changeWord + " ";

// }

//     return newAdvice;
    
//   }
