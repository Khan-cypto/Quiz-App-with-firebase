  const firebaseConfig = {
    apiKey: "AIzaSyBzpC0-1PsIyVO96Un8u5dMZhexFkNxhgM",
    authDomain: "quiz-app-firebase-f7f25.firebaseapp.com",
    projectId: "quiz-app-firebase-f7f25",
    storageBucket: "quiz-app-firebase-f7f25.appspot.com",
    messagingSenderId: "375043595127",
    appId: "1:375043595127:web:05805bfe5800b2ce81df72"
  };



// Concept: Array of objects

var questionArray = [				//Array 						
{															//set #1 (index 0)
	question: "Q1. Which one is Capital of Pakistan",			//key: value
	answer: "Islamabad",	//or 4								//separating by ,
	options: [
			 "Karachi",
			 "Dubai",
			 "Lahore",
			 "Islamabad",
			 // answer: a
			 ]

},

{
	question: "Q2. Who invented the world first computer",
	answer: "Charles Babbage",
	options: [ 
			 "Charles Babbage",
			 "Albert Einstein",
			 "Bill Gates",
			 "Jack Kilby"
			 ]

},

{
	question: "Q3. First HTML invented in the year ______",
	answer:  1993,
	options: [
			 "1991",
			 "2002",
			 "2013",
			 "1993"
			 ]

},

{
	question: "Q4. Javascript is a ______ language",
	answer: "Client-side scripting",
	options: [ 
			 "Database",
			 "Markup",
			 "Client-side scripting",
			 "Server-side scripting"
			 ]

},

{
	question: "Q5. Which of the following is your Teacher?",
	answer: "Sir Muhammad Umair",
	options: [
			 "Sir Ghous",
			 "Sir Jaffar",
			 "Sir Muhammad Umair",
			 "Sir Abdul Basit"
			 ],

},
];


  var app = firebase.initializeApp(firebaseConfig);	
  //get questions from questionArray
  var database = app.database().ref('/user-details').child('questions').update({questionArray: questionArray});
	var questionCount = 0;			// global scope declared
	var score = 0;



function displayQuestion(e){
	//show question
	var questionElement = document.getElementById("questionElement");
	try{
		questionElement.innerHTML = questionArray[e].question;
	}
	catch(displayMsg){
		// console.log("Press button again")
	}
	

	//show option
	var optionElement = document.getElementsByClassName("optionElement");
	
	try{
	for(var i = 0 ; i < optionElement.length; i++){
		optionElement[i].innerHTML = questionArray[e].options[i];  //options is key of array(arr.of obj)   //use [i] when multiple data in array(loops)  //[i]repl.with e(parameter-value)
	}
}
catch(submitQuiz){
	console.log("Tap to submit quiz")
}
}

var a = nextBtn.addEventListener('click', () => {

        if (questionCount < questionArray.length ) {		
            validate(questionCount);
            questionCount++;
            displayQuestion(questionCount);
            removeActiveClass();
        } 
        else
         {
            result();
       // firebase score get
      app.database().ref("user-details/score").update({ score: score });
    }
    });



//OR(2nd method)
// function nextQuestion(){

//  	cond = true;

// 	 if (cond) {
//     if (questionCount <= questionArray.length-1) {
// 	    validate(questionCount);		        //checks selected answer (compares with the right answer)
// 			questionCount++;
// 			displayQuestion(questionCount);			//displays questions data
// 			removeActiveClass();  					//to remove active on every new question
//     	}
//      else {
//       // alert("You have secured " + score + " marks");
//       result();

//       // firebase database key (get score updated)
// 			app.database().ref('/user-details').child('score').update({ score: score });

// 	  }
// }  
// }


function addActiveClass(e){
	removeActiveClass();
	e.classList.add("active");

	// console.log(e)
}

function removeActiveClass(){
	var active = document.getElementsByClassName("active");	//ELements of active(class) saved in var active as Arrays      
	for(var i = 0 ; i<active.length; i++){				    //run equal to elements present in active(total: 4 active)
		active[i].classList.remove("active"); 
		// console.log(active[i]);
	}
}

function validate(e) {
	try{
	var active = document.getElementsByClassName("active");
	console.log(active[0].innerHTML)                      	//innerHTML value is the selected-value  //active[0] is paragraph-selected
	if (active[0].innerHTML == questionArray[e].answer) {
		score += 10      //score = score + 10
		console.log(score)
	}

	else{
		// score -= 10
		score = score
		console.log(score);
	}
}
catch(msg){
	console.log("You have skipped this question");
}//try catch ends here
};


	
			// CHANGE BUTTON TEXT ON CONDITIONAL CLICK

	// {if (a condition is == met) {
    //btn.textContent = 'Button clicked';}
  
		nextBtn.addEventListener('click', function handleClick() {
				if(questionArray.length == questionCount)
					{
				  	nextBtn.innerHTML = 'Submit Answers';
					}})


					// TIMER 
var minutes;
var seconds;

const startingminutes = 15; 
let time = startingminutes * 60;

const countdownEl = document.getElementById('timer');

myInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    if (minutes == 0 && seconds == 0) {
        clearInterval(myInterval);
        result()
    } else {
        minutes = Math.floor(time / 60);
        seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds

        countdownEl.innerHTML = `${minutes}:${seconds}`;
        time--;
    }
}


					// RESULT
function result(){
		var modal = document.getElementById('modal').style.visibility="visible";
		var scoreValue = document.getElementById('scoreValue')//.value;
		// modal.setAttribute('display','block');
		scoreValue.innerHTML = "50 / " + score;
//		Visibility is not a attribute its a css style property 
			// console.log(modal)
			// console.log(score)
			// console.log(scoreValue)		

		// something.classList.add('hidden')
	       // modal.classList.remove('hidden');
  }


			//ASK THE USER    
function askUser(){
	  			var userConfirm = confirm("Are you sure?")
	  			if(userConfirm == true)
	  			{
	      	var win = window.open("index.html", "_self");
	  			}

	      else
	      {
	      	return document.write("You have rejected the request...");
	      	// close()
		  	 // window.close()
	      }
}
