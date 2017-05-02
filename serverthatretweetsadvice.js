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
    stream = T.stream('statuses/sample');

app.use(express.static('public'));

/* You can use uptimerobot.com or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

app.all("/" + process.env.BOT_ENDPOINT, function (request, response) {
/* The example below tweets out "Hello world!". */
retweetLatest();
  
  //   var resp = response;
//   var boom = 'I just made this up too and sent it via a bot!';
  
//   T.post('statuses/update', { status: boom }, function(err, data, response) {
//     if (err){
//       resp.sendStatus(500);
//       console.log('Error! DEBUG');
//       console.log(err);
//     }
//     else{
//       resp.sendStatus(200);
//     }
//   });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your bot is running on port ' + listener.address().port);
});


//---------------------------



// This function finds the latest tweet with the word 'advice', and retweets it.
function retweetLatest() {
  var adviceSubjects = ["love", "life", "success", "money", "happiness", "bad", "careers", "astrology", "philosophy","truth"];
  var typeStatements = ["advice", "bad advice", "advice quote", "mum advice"]
  var yy=Math.floor((Math.random() * typeStatements.length));
  var xx=Math.floor((Math.random() * adviceSubjects.length));
  var adviceSubject= adviceSubjects[xx];
  var typeStatement= typeStatements[yy];
  var searchTerm = typeStatement + " " + adviceSubject;

var adviceSearch = {q: searchTerm, count: 10, result_type: "mixed"}; 
  
	T.get('search/tweets', adviceSearch, function (error, data, response) {
	  // log out any errors and responses
	  
	  // If our search request to the server had no errors...
	  if (!error) {
    
	  	// ...then we grab the ID of the tweet we want to retweet...
      var x=Math.floor((Math.random() * 10)+1);
		var retweetId = data.statuses[x].id_str;
      var retweetTxt = data.statuses[x].text;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
        response.sendStatus(200);
        
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				
        response.sendStatus(500);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your search:', error);
      response.sendStatus(200);
	  }
	});
}
  

// Try to retweet something as soon as we run the program...

