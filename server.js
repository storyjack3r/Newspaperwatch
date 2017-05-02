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
  
  
  
  
/* The example below tweets out "Hello world!". */
  
  
  
  

  
  
});

var listener = app.listen(process.env.PORT, function () {
    console.log('Your bot is running on port ' + listener.address().port);
});


//---------------------------

var trumpCounter = {search:'Trump', counter: 0};
var brexitCounter = {search:'Brexit', counter: 0};
var terrorismCounter = {search:'terror', counter: 0};
var electionCounter = {search:'election', counter:0};
var sportCounter = {search:/sport/i, counter:0};
var mayCounter = {search:'May', counter:0};
var corbynCounter = {search:'Corbyn', counter:0};
var statsList = [];
var statusComposer;
function orderFacts(){
  
  statsList[0]= trumpCounter.counter;
   statsList[1]=brexitCounter.counter;
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

          case brexitCounter.counter:
              term = brexitCounter.search;
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
    	//random selection method
      //var x=Math.floor((Math.random() * countN)+1);
      //guardianRtTxt = data[x].text;
      
      searchForSubject(data, trumpCounter);
      searchForSubject(data, brexitCounter);
          searchForSubject(data, electionCounter);
          searchForSubject(data, terrorismCounter);
      searchForSubject(data, sportCounter);
                searchForSubject(data, corbynCounter);
          searchForSubject(data, mayCounter);
      
      Tw.get('statuses/user_timeline', options2 , function (err, dat, resp) {
        
	      if (!err) {
        
          // var y=Math.floor((Math.random() * 10)+1);
          // torygraphRtTxt = dat[y].text;
          
          searchForSubject(dat, trumpCounter);
      searchForSubject(dat, brexitCounter);
          searchForSubject(dat, electionCounter);
          searchForSubject(dat, terrorismCounter);
      searchForSubject(dat, sportCounter);
          searchForSubject(dat, corbynCounter);
          searchForSubject(dat, mayCounter);
          
          
          
          
  var retweetTxt = "📰 May mentions: " + mayCounter.counter + "% - Corbyn mentions: " + corbynCounter.counter + "% - 🍦 Trump mentions: " + trumpCounter.counter +"% - Brexit 🚪 mentions: " + brexitCounter.counter +"% - Sport 🏆 mentions: " + sportCounter.counter +"%";
      
  statusComposer = retweetTxt;
  
		
	T.post('statuses/update', { status: statusComposer}, function(error, data, response) {
			if (response) {
        response.sendStatus(200);
          
          
        }
        resp.sendStatus(200);
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
