var baseUrl;
var intervalOne;
var intervalTwo;
var intervalThree;
jQuery(function()
{
	var gaperAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.onRequestAnimationFrame || window.msRequestAnimationFrame || null;
	var Gaper = function(el)
	{
		this.initialize = function()
		{
			this.element = jQuery(el);
			this.container = this.element.find('.gaper-inner-container');
			this.baseUrl = this.element.attr('data-plugin-dir-url');
			this.level = 1;
			this.speed = 1;
			this.laneOneArray = [];
			this.laneThreeArray = [];
			this.laneFiveArray = [];
			this.start = this.container.find('.start');
			this.keys = [];
			baseUrl = this.baseUrl;
			console.log(this.baseUrl);
			this.gaper = new TheGaper(this.baseUrl, (this.element.width()/2)-50, 0);
			this.container.append(this.gaper.sprite);
			this.runLoop();
			jQuery('.gaper-score').html(this.level);
			jQuery(document).keydown(this.keyDown.bind(this));
			jQuery(document).keyup(this.keyUp.bind(this));
			jQuery('.dpad-container').mousedown(this.mouseDown.bind(this));
			jQuery(document).mouseup(this.mouseUp.bind(this));
			this.laneOne = jQuery('#laneOne');
			this.laneThree = jQuery('#laneThree');
			this.laneThree = jQuery('#laneFive');
			var randomNumber = Math.random()*5000;
			console.log(randomNumber);
			jQuery('#play-again').click(function(){
				location.reload();
			});
			// * These variables are for setting the absolute y-value skier sprite's distance from the top of the staging area
			this.laneOneDist = 65;
			this.laneThreeDist = 185;
			this.laneFiveDist = 305;
			this.spawnSprite(LeftSkier, this.laneOne, this.laneOneArray, this.laneOneDist);
			this.spawnSprite(RightSkier, this.laneThree, this.laneThreeArray, this.laneThreeDist);
			this.spawnSprite(LeftSkier, this.laneFive, this.laneFiveArray, this.laneFiveDist);
			this.interval = function()
			{
				intervalOne = setInterval(this.spawnSprite.bind(this, LeftSkier, this.laneOne, this.laneOneArray, this.laneOneDist), 7000);
			}
			this.intervalTwo = function()
			{
				intervalTwo = setInterval(this.spawnSprite.bind(this, RightSkier, this.laneThree, this.laneThreeArray, this.laneThreeDist), 7000);
			}
			this.intervalThree = function()
			{
				intervalThree =	setInterval(this.spawnSprite.bind(this, LeftSkier, this.laneFive, this.laneFiveArray, this.laneFiveDist), 7000);
			}
			jQuery('#next').click(this.startLevel.bind(this));
		}
		this.startLevel = function()
		{
			console.log('start level running');
			document.getElementById('anchor').removeAttribute( 'style');
			this.gaper.y = 0;
			this.level++;
			if (this.level > 5)
			{
				clearInterval(intervalOne);
				clearInterval(intervalTwo);
				clearInterval(intervalThree);
				alert('you beat the game');
			}
			this.speed++;
			this.spawnSprite(LeftSkier, this.laneOne, this.laneOneArray, this.laneOneDist);
			this.spawnSprite(RightSkier, this.laneThree, this.laneThreeArray, this.laneThreeDist);
			this.spawnSprite(LeftSkier, this.laneFive, this.laneFiveArray, this.laneFiveDist);
			this.interval();
			this.intervalTwo();
			this.intervalThree();
			jQuery('.gaper-score').html(this.level);			
		}
		this.nextLevel = function()
		{
			clearInterval(intervalOne);
			clearInterval(intervalTwo);
			clearInterval(intervalThree);
			// This removes all sprites from the current level so you can start fresh
			for (i=0; i<this.laneOneArray.length; i++)
			{
				this.laneOneArray[i].remove();
				this.laneOneArray.splice(i,1);
			}
			for (i=0; i<this.laneThreeArray.length; i++)
			{
				this.laneThreeArray[i].remove();
				this.laneThreeArray.splice(i,1);
			}
			for (i=0; i<this.laneFiveArray.length; i++)
			{
				this.laneFiveArray[i].remove();
				this.laneFiveArray.splice(i,1);
			}
			this.gaper.y = 0;
			jQuery('#anchor').attr('style', 'display:block');
		}
		this.spawnSprite = function (direction, location, locationArray, y)
		{
			var location = location;
			var skier = new direction(y);
			locationArray.push(skier);
			this.container.append(skier.sprite);
		}
		this.checkWin = function()
		{
			if (this.gaper.y > 330)
			{
				return true;
			}
			else return false;
		}
		this.keyDown = function(e)
		{
			switch (e.keyCode)
			{
				case 65: //a
				case 37: //left
					if (this.keys.indexOf('left') < 0) this.keys.push('left');
					break;

				case 69: //e
				case 38: //up
					if (this.keys.indexOf('up') < 0) this.keys.push('up');
					break;

				case 88: //x
				case 40://down
					if (this.keys.indexOf('down') < 0) this.keys.push('down');
					break;

				case 68: //d
				case 39: //right
					if (this.keys.indexOf('right') < 0) this.keys.push('right');
					break;

				default:
				//
				break;
			}
			return false;
		}
		this.keyUp = function(e)
		{
			switch (e.keyCode){
				case 65: //a
				case 37: //left
					if (this.keys.indexOf('left') >= 0) this.keys.splice(this.keys.indexOf('left'), 1);
					break;

				case 69: //e
				case 38: //up
					if (this.keys.indexOf('up')>= 0) this.keys.splice(this.keys.indexOf('up'),1);
					break;

				case 88: //x
				case 40: //down
					if (this.keys.indexOf('down')>= 0) this.keys.splice(this.keys.indexOf('down'), 1);
					break;

				case 68: //d
				case 39: //right
					if (this.keys.indexOf('right') >= 0) this.keys.splice(this.keys.indexOf('right'), 1);
					break;

				default:
				//
				break;
			}
			return false;
		    
		}
		this.mouseDown = function(e)
		{
			e.preventDefault();
			console.log(e.target.id);
			switch (e.target.id)
			{
				case 'dpad-down':
				if (this.keys.indexOf('down') < 0) this.keys.push('down');
				break;
				case 'dpad-up':
				if (this.keys.indexOf('up') < 0) this.keys.push('up');
				break;
				case 'dpad-left':
				if (this.keys.indexOf('left') < 0) this.keys.push('left');
				break;
				case 'dpad-right':
				if (this.keys.indexOf('right') < 0) this.keys.push('right');
				break;
				default:
				break;
			}
		}
		this.mouseUp = function(e)
		{
			console.log('mouse up' + ' '+e.target.id);
			switch (e.target.id)
			{
				case 'dpad-down':
				if (this.keys.indexOf('down') >= 0) this.keys.splice(this.keys.indexOf('down'), 1);
				break;
				case 'dpad-up':
				if (this.keys.indexOf('up') >= 0) this.keys.splice(this.keys.indexOf('up'), 1);
				break;
				case 'dpad-left':
				if (this.keys.indexOf('left') >= 0) this.keys.splice(this.keys.indexOf('left'), 1);
				break;
				case 'dpad-right':
				if (this.keys.indexOf('right') >= 0) this.keys.splice(this.keys.indexOf('right'), 1);
				break;
				default:
				break;
			}
		}
		this.runLoop = function()
		{
			if (gaperAnimFrame)
			{
				this.mainLoop();
				gaperAnimFrame(this.runLoop.bind(this));
			} else {
				var fps = 1000 / 60; // 60 fps
				setInterval(this.mainLoop, fps);
			}
		};
		this.mainLoop = function()
		{
			this.update();
			this.draw();
		};
		this.update = function()
		{
			// Checks to see if you beat the level
			if (this.checkWin())
			{
				console.log('you win!');
				clearInterval(intervalOne);
				clearInterval(intervalTwo);
				clearInterval(intervalThree);
				this.nextLevel();
			}

			// Movement function
			if (this.gaper && !this.gaper.dead)
			{
				if ((this.keys.indexOf('left')>= 0) && this.gaper.x > -7) this.gaper.x -= this.gaper.speed;
				if ((this.keys.indexOf('right')>= 0) && this.gaper.x < 733) this.gaper.x += this.gaper.speed;
				if ((this.keys.indexOf('down')>=0) /*&& this.gaper.y < 450*/) this.gaper.y += this.gaper.speed;
				if ((this.keys.indexOf('up')>=0) && this.gaper.y > 0) this.gaper.y -= this.gaper.speed;
			};

			//LaneOneArray update loop
			if (this.laneOneArray && !this.gaper.dead)
			{
				// Removal loop
				for (i=0; i < this.laneOneArray.length; i++)
				{
					if (this.laneOneArray[i].x < 10)
					{
						this.laneOneArray[i].remove();
					}
				// This is the Collision Detection Function
					
					if ( this.gaper.colliding(this.laneOneArray[i]))
					{
					// The objects are touching
					clearInterval(intervalOne);
					clearInterval(intervalTwo);
					clearInterval(intervalThree);
					this.gaper.dead = true;
					jQuery('.dead').attr("style","display:block");
					jQuery('#play-again').attr('style', 'display:block');
				
					//jQuery('.final-score').html('Final Score:'+this.score + "<button type='button' onclick='window.location.reload()'>Play Again</button>");


					}
				// Lateral movement of this row
					this.laneOneArray[i].x -= this.speed;
				}
			};
			// LaneThreeArray update Loop
	    			if (this.laneThreeArray && !this.gaper.dead)
			{
				// Removal loop
				for (i=0; i < this.laneThreeArray.length; i++)
				{
					if (this.laneThreeArray[i].x > 970)
					{
						this.laneThreeArray[i].remove();
					}
				// This is the Collision Detection Function
					
					if ( this.gaper.colliding(this.laneThreeArray[i]))
					{
					// The objects are touching
					clearInterval(intervalOne);
					clearInterval(intervalTwo);
					clearInterval(intervalThree);
					this.gaper.dead = true;
					jQuery('.dead').attr("style","display:block");
				
					//jQuery('.final-score').html('Final Score:'+this.score + "<button type='button' onclick='window.location.reload()'>Play Again</button>");


					}
				//* Lateral movement of this row
					this.laneThreeArray[i].x += this.speed;
				}
				// LaneFiveArray update Loop
			};	    			if (this.laneFiveArray && !this.gaper.dead)
			{
				// Removal loop
				for (i=0; i < this.laneFiveArray.length; i++)
				{
					if (this.laneFiveArray[i].x < 10)
					{
						this.laneFiveArray[i].remove();
					}
				// This is the Collision Detection Function
					
					if ( this.gaper.colliding(this.laneFiveArray[i]))
					{
					// The objects are touching
					clearInterval(intervalOne);
					clearInterval(intervalTwo);
					clearInterval(intervalThree);
					this.gaper.dead = true;
					jQuery('.dead').attr("style","display:block");
				
					//jQuery('.final-score').html('Final Score:'+this.score + "<button type='button' onclick='window.location.reload()'>Play Again</button>");


					}
				//* Lateral movement of this row
					this.laneFiveArray[i].x -= this.speed;
				}
			};
	    };
		
		this.draw = function()
			{
				this.gaper.draw();
				for (var i = 0; i < this.laneOneArray.length; ++i) 
				{
			    this.laneOneArray[i].draw();
			    }		
			    for (var i = 0; i < this.laneThreeArray.length; ++i) 
				{
			    this.laneThreeArray[i].draw();
			    }					    
			    for (var i = 0; i < this.laneFiveArray.length; ++i) 
				{
			    this.laneFiveArray[i].draw();
			    }			
			};
		var TheGaper = function(baseUrl, x, y)
		{
			this.initialize =function()
			{
				this.speed = 1;
				this.sprite = jQuery("<img id='theGaper' src='" + baseUrl + "img/gaper.png'>");
				this.dead = false;
				this.x = x;
				this.y = y;
				this.left = this.x;
				this.right;
				this.top = this.y;
				this.bottom;
			};
			this.colliding = function(lane)
			{
				this.laneRight = lane.x + 50;
				this.gaperRight = this.x + 50;
				this.laneBottom = lane.y + 50;
				this.gaperBottom = this.y + 50;
				if (
					this.x < this.laneRight  
					&& this.gaperRight  > lane.x 
					&& this.y < this.laneBottom
					&& this.gaperBottom > lane.y
					//&& this.y > lane.y
					)
					{
						console.log(lane);
						console.log(this);
						return true;
					} 
			}
			
			this.draw = function()
			{
				this.sprite.css({
					'top': this.y,
					'left': this.x
				});
			};
			this.initialize();
		}
		var LeftSkier = function(y)
		{
		this.leftSprites = 
						[
						("<img class='sprite' src='"+baseUrl+"img/left/bear.png'/>"),
						("<img class='sprite' src='"+baseUrl+"img/left/board1.png'/>"),
						("<img class='sprite' src='"+baseUrl+"img/left/moose.png'/>"),
						("<img class='sprite' src='"+baseUrl+"img/left/skier1.png'/>"),
						("<img class='sprite' src='"+baseUrl+"img/left/skier2.png'/>"),
						("<img class='sprite' src='"+baseUrl+"img/left/snowmobile.png'/>")								
						];	
			this.initialize = function()
			{
				var rand = Math.floor((Math.random() * 5) + 1);
				this.speed = 4;
				this.sprite = jQuery(this.leftSprites[rand]);
				this.x = 1000;
				this.y = y;
				this.left = this.x;
				this.right;
				this.top = this.y;
				this.bottom;
			};
			this.initialize();
			this.draw = function()
			{
				this.sprite.css({
					'top': this.y,
					'left':this.x	
				});
			};
			this.remove = function()
			{
				jQuery(this.sprite.remove());
				
			};
		};
		var RightSkier = function(y)
		{
			this.rightSprites = 
				[
				"<img class='sprite' src='"+baseUrl+"img/right/bear.png'/>",
				"<img class='sprite' src='"+baseUrl+"img/right/board1.png'/>",
				"<img class='sprite' src='"+baseUrl+"img/right/moose.png'/>",
				"<img class='sprite' src='"+baseUrl+"img/right/skier1.png'/>",
				"<img class='sprite' src='"+baseUrl+"img/right/skier2.png'/>",
				"<img class='sprite' src='"+baseUrl+"img/right/snowmobile.png'/>"								
				];
			this.initialize = function()
			{
				var rand = Math.floor((Math.random() * 5) + 1);
				this.speed = 4;
				this.sprite = jQuery(this.rightSprites[rand]);
				this.x = 0;
				this.y = y;
				this.left = this.x;
				this.right;
				this.top = this.y;
				this.bottom;
			};
			this.initialize();
			this.draw = function()
			{
				this.sprite.css({
					'top': this.y,
					'left':this.x	
				});
			};
			this.remove = function()
			{
				jQuery(this.sprite.remove());
				
			};
		};
		this.initialize();
		this.interval();
		this.intervalTwo();
		this.intervalThree();
	}

		jQuery(document).ready(function($) {
			var els = jQuery('.gaper');
			for (var i=0; i < els.length; ++i) new Gaper(els[i]);
		});
});
