
const hitSound = new Audio("assets/sound/sfx_exp_various4.wav");

var exit = false;

var to = [0, 0];

var score = 0;

var playground = document.getElementById('playground');
var scoreDiv = document.createElement('div');
scoreDiv.id = 'score';
scoreDiv.innerHTML = 'Score: ' + score;
playground.appendChild(scoreDiv);
playground.addEventListener("click", function(e) {
	hitSound.play();
});


var counter = 0;

const classnames = ['bat1', 'bat2', 'bat3', 'bat4'];

var tls = [];

function makeATween() 
{
	if (exit) {
		return;
	}
	
	tls['box'+counter] = new TimelineLite();
	
	var box = document.createElement('div');
	box.className = classnames[counter % classnames.length];
	box.id = 'box'+counter;
	box.addEventListener("click", function(e){
		
				
		tls[this.getAttribute('id')].stop();
		tls[this.getAttribute('id')].clear();
		
		
		var cN = this.className;
		this.className = cN + ' '+cN+'explode';
		
		
		tls[this.getAttribute('id')] = new TimelineLite();
		
		tls[this.getAttribute('id')].stop();
		tls[this.getAttribute('id')].clear();
		
		this.style.backgroundPosition = '0 0';
		
		tls[this.getAttribute('id')].add(
			
			TweenMax.to('#'+this.getAttribute('id'), 0.5, 
				{ 
					backgroundPosition:"-1250px 0px", 
					ease:SteppedEase.config(5),
					onComplete:cleanUp
				})
			);
		
		tls[this.getAttribute('id')].play();
		
		updateScore();
	});
	
	playground.appendChild(box);
	
	tls['box'+counter].add(
		TweenMax.to("#box"+counter, 1, 
		{ 
			backgroundPosition:"-1250px 0px", 
			ease:SteppedEase.config(5), 
			repeat:-1
		})
	);
	tls['box'+counter].add(		
		TweenMax.to("#box"+counter, 3, 
		{
			left:to[0], 
			top:to[1],			
		}, 0)
	);
	tls['box'+counter].add(
		TweenMax.to("#box"+counter, 2, 
		{
			left:to[0], 
			top:2000, 
			onComplete:cleanUp
		}, 0)
	);
	tls['box'+counter].play();
	
	 
	++counter;
	
	function cleanUp() {
	    box.remove();
	}	
}

/**
 * Generate starting position
 * @returns
 */
function generatePosition() {
	
	var returnArray = [100, 100];
	
	if (screen.availWidth && screen.availHeight) {
	
		var xfrom 	= Math.round(.1 * screen.availWidth);
		var xto 	= Math.round(.9 * screen.availWidth);
		
		var yfrom 	= Math.round(.1 * screen.availHeight);
		var yto 	= Math.round(.5 * screen.availHeight);
		
		returnArray[0] = xfrom + Math.round( Math.random() * (xto - xfrom));
		returnArray[1] = yfrom + Math.round( Math.random() * (yto - yfrom));
	}
	
	return returnArray;
}

/**
 * Main loop
 * @returns
 */
function gameLoop() {
	
	to = generatePosition();

	makeATween();

	if (exit) return;
	setTimeout("gameLoop()", 5000);
}

/**
 * Update score
 * @returns
 */
function updateScore() {
	++score;
	scoreDiv.innerHTML = 'Score: ' + score;
	TweenMax.fromTo(scoreDiv, 0.1, {x:-10},
		{
			x:10,
			repeat:3,
			yoyo:true,
			ease:Sine.easeInOut,
			onComplete:function() {
				TweenMax.to(this.target, .5, {x:0, ease:Elastic.easeOut})
			}
		});
}

gameLoop();
