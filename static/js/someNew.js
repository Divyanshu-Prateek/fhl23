  // displays isl text 
  function display_isl_text(words)
  {
      let p = document.getElementById("isl_text");
      p.textContent="";
      Object.keys(words).forEach(function(key) 
      {
        p.textContent+= words[key]+" ";
      });
  }
// displays currently playing word/letter
  function display_curr_word(word)
  {
      let p = document.querySelector(".curr_word_playing");
      p.textContent=word;
      p.style="color:Red; font-size:24px;font-decoration:bold;";
  }

  // displays error message if some error is there
  function display_err_message()
  {
   
    let p = document.querySelector(".curr_word_playing");
    p.textContent="Some error occurred (Probably Sigml file of the word/letter is not proper)";
    p.style="color:Red; font-size:24px;font-decoration:bold;";
  }

// converts the returned  json to array
function convert_json_to_arr(words)
{
    wordArray=[];
    console.log("wordArray",words);
    Object.keys(words).forEach(function(key) {
        wordArray.push(words[key]);
    });
    console.log("wordArray",wordArray);
}


// plays each word
function play_each_word(){
  totalWords = wordArray.length;
  i = 0;
  var int = setInterval(function () {
      if(i == totalWords) {
          if(playerAvailableToPlay) {
              clearInterval(int);
              finalHint = $("#inputText").val();
              $("#textHint").html(finalHint);
              document.querySelector("#submit").disabled=false;
          }
          else{
            display_err_message();
            document.querySelector("#submit").disabled=false;
          }
      } else if(playerAvailableToPlay) {
              playerAvailableToPlay = false;
              startPlayer("SignFiles/" + wordArray[i]+".sigml");
              display_curr_word(wordArray[i]);
              console.log("CURRENTLY PLAYING",wordArray[i]);
              document.querySelector("#submit").disabled=true;
              i++;
            //   playerAvailableToPlay=true;
          }
         else {
            let errtext = $(".statusExtra").val(); 
            console.log("ERROR:- ", "Some error occurred (Probably Sigml file of the word/letter is not proper)");
            display_err_message();
            if(errtext.indexOf("invalid") != -1) {
                playerAvailableToPlay=true;
                document.querySelector("#submit").disabled=false;
            }
         }
  }, 1000);
};


// sets the avatarLoaded to true 
var loadingTout = setInterval(function() {
    if(tuavatarLoaded) {
        // $("#loading").hide();
        clearInterval(loadingTout);
        console.log("Avatar loaded successfully !");
    }
}, 1500);


function playRequest(){
  console.log('running the playRequest js file')
  console.log("data in playrequest --- " + mData)

  convert_json_to_arr(mData);
  play_each_word();
  display_isl_text(mData);
}

playRequest()