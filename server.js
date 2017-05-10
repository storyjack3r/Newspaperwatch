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

var successVar=0;

app.all("/" + process.env.BOT_ENDPOINT, function (request, response) {
  
    retweetLatest();
  if (successVar=0) {
    response
  }
  
});

var listener = app.listen(process.env.PORT, function () {
    console.log('Your bot is running on port ' + listener.address().port);
});


//---------------------------

var trumpCounter = {search:'Trump', counter: 0};
var farronCounter = {search:'Farron', counter: 0};
var terrorismCounter = {search:'terror', counter: 0};
var electionCounter = {search:'election', counter:0};
var sportCounter = {search:/sport/i, counter:0};
var mayCounter = {search:'May', counter:0};
var corbynCounter = {search:'Corbyn', counter:0};
var statsList = [];
var statusComposer;
function orderFacts(){
  
  statsList[0]= trumpCounter.counter;
   statsList[1]=farronCounter.counter;
   statsList[2]=terrorismCounter.counter;
   statsList[3]=electionCounter.counter;
   statsList[4]=sportCounter.counter;
   statsList[5]=mayCounter.counter;
   statsList[6]=corbynCounter.counter;
  
    statsList.sort(function(a, b){return a-b});
    var nextStat;
  	for (var i = 0; i <= statsList.length - 1; i++) {
      var term;
        switch (statsList[i]){
              case corbynCounter.counter:
              term = corbynCounter.search;
              nextStat = term + "mentions: " + i + "%";
              break;

          case farronCounter.counter:
              term = farronCounter.search;
              nextStat = term + "mentions: " + i + "%";
              break;

          case terrorismCounter.counter:
              term = terrorismCounter.search;
              nextStat = term + "mentions: " + i + "%";
              break;

          case electionCounter.counter:
              term = electionCounter.search;
              nextStat = term + "mentions: " + i + "%";
              break;

          case sportCounter.counter:
              term = sportCounter.search;
              nextStat = term + "mentions: " + i + "%";
              break;

          case mayCounter.counter:
              term = mayCounter.search;
              nextStat = term + "mentions: " + i + "%";
              break;

          case trumpCounter.counter:
              term = trumpCounter.search;
              nextStat = "Trump mentions: " + i + "%";
              break;
          }
      statusComposer+= nextStat;
    }
	
  }




function searchForSubject(arr, subject){
  var search = subject.search;
  
	for (var i = 0; i <= arr.length - 1; i++) {
	var str=arr[i].text;
	var n = str.search(search);
  
	//search() returns a -1 if the search term doesn't exist in string
	if(n!=-1){
    // subject.counter="debug";
		subject.counter++;
    //return str;
	}

};
}


// This function finds the latest tweet with the word 'advice', and retweets it.
function retweetLatest() {
  var guardianRtTxt;
  var torygraphRtTxt;

  var countN = 50;
  var options1 = { screen_name: 'guardian',
                count: countN };
  var options2 = { screen_name: 'telegraph',
                count: countN };

T.get('statuses/user_timeline', options1 , function (error, data, response) {
  
	  if (!error) {      
      searchForSubject(data, trumpCounter);
      searchForSubject(data, farronCounter);
          searchForSubject(data, electionCounter);
          searchForSubject(data, terrorismCounter);
      searchForSubject(data, sportCounter);
                searchForSubject(data, corbynCounter);
          searchForSubject(data, mayCounter);
      
      Tw.get('statuses/user_timeline', options2 , function (err, dat, resp) {
        
	      if (!err) {
          
          searchForSubject(dat, trumpCounter);
      searchForSubject(dat, farronCounter);
          searchForSubject(dat, electionCounter);
          searchForSubject(dat, terrorismCounter);
      searchForSubject(dat, sportCounter);
          searchForSubject(dat, corbynCounter);
          searchForSubject(dat, mayCounter);
          
          
          
          
          
  var retweetTxt = "May mentions: " + mayCounter.counter + "% | Corbyn mentions: " + corbynCounter.counter + "% | Farron mentions: " + farronCounter.counter +"% | Trump 🍦 mentions: " + trumpCounter.counter +"% | Sport 🏆 mentions: " + sportCounter.counter +"%";
      
  statusComposer = retweetTxt;
  
		
	T.post('statuses/update', { status: statusComposer}, function(error, data, response) {
		
    if (response) {
        response.sendStatus(200);
          
          
        }
        
        });
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				
        response.sendStatus(500);
    
			}
		})
	  }
	
	  else {
	  	
      response.sendStatus(200);
      
	  }

	});
}
