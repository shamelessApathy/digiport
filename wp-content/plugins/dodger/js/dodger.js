
// This holds the baseUrl, couldn't figure out how to define it properly within scope
var baseUrl;

// This holds the container value
var container;

(function() {
	var dodgerAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.onRequestAnimationFrame || window.msRequestAnimationFrame || null;
	var Dodger = function(el)
	{
		this.initialize = function()
		{
			this.element = jQuery(el);
			this.scoreElement = this.element.find('.dodger-score');
			this.container = this.element.find('.dodger-inner-container');
			container = this.container;

			this.meteors = [];
			this.keys = [];
			this.time = Date.now();
			this.baseUrl = this.element.attr('data-plugin-dir-url');
			baseUrl = this.baseUrl;
			this.ship = new Ship(this.baseUrl, (this.element.width() / 2) - 60, (this.element.height() - 140));
			this.container.append(this.ship.sprite);
			for (i = 0; i < this.meteors.length; i++)
			{
			this.container.append(this.meteors[i].sprite);
		    }
			this.score = 0;
			this.scoreLastUpdated;
			this.runLoop();
			jQuery(document).keydown(this.keyDown.bind(this));
			jQuery(document).keyup(this.keyUp.bind(this));
			var randomNumber = Math.random()*5000;
			this.interval = setInterval(this.spawnMeteor.bind(this), randomNumber);
		};

		this.spawnMeteor = function()
		{	var randomNumber = Math.random()*800;
			var meteor = new Meteor(baseUrl, ((randomNumber > 35) ? randomNumber - 35 : randomNumber) ,0);
			this.meteors.push(meteor);
			container.append(meteor.sprite);
		}


		this.keyDown = function(e)
		{
			switch (e.keyCode)
			{
				case 65: //a
				case 37: //left
					if (this.keys.indexOf('left') < 0) this.keys.push('left');
					break;

				case 68: //d
				case 39: //right
					if (this.keys.indexOf('right') < 0) this.keys.push('right');
					break;

				default:
				//
				break;
			}
		}
		this.keyUp = function(e)
		{
			switch (e.keyCode){
				case 65: //a
				case 37: //left
					if (this.keys.indexOf('left') >= 0) this.keys.splice(this.keys.indexOf('left'), 1);
					break;

				case 68: //d
				case 39: //right
					if (this.keys.indexOf('right') >= 0) this.keys.splice(this.keys.indexOf('right'), 1);
					break;

				default:
				//
				break;
			}
		}

		this.runLoop = function()
		{
			if (dodgerAnimFrame)
			{
				this.mainLoop();
				dodgerAnimFrame(this.runLoop.bind(this));
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
		this.youAreDead = function()
		{
			alert('you are dead!!');
		}
		this.update = function()
		{
			if(!this.scoreLastUpdated) this.scoreLastUpdated = Math.floor(Date.now() / 1000);
			var now = Math.floor(Date.now()/1000);
			if (now > this.scoreLastUpdated)
			{
				++this.score;
				this.scoreLastUpdated = now;
			}
			if (this.ship && !this.ship.dead)
			{
				if ((this.keys.indexOf('left')>= 0) && this.ship.x > -7) this.ship.x -= this.ship.speed;
				if ((this.keys.indexOf('right')>= 0) && this.ship.x < 733) this.ship.x += this.ship.speed;
			}
			// For Loop to make meteors move on the y-axis
			if (this.meteors && !this.ship.dead)
			{
				for (i = 0; i < this.meteors.length; i++)
				{
					if (this.meteors[i].y > 450)
					{
						this.meteors[i].remove();
					};
					this.ship.width = this.ship.sprite.width();
					this.ship.height = this.ship.sprite.height();
					this.meteors[i].width = this.meteors[i].sprite.width();
					this.meteors[i].height = this.meteors[i].sprite.height();

					// This is the Collision Detection Function
					if (this.ship.x < this.meteors[i].x + this.meteors[i].width  && this.ship.x + this.ship.width  > this.meteors[i].x &&
					this.ship.y < this.meteors[i].y + this.meteors[i].height && this.ship.y + this.ship.height > this.meteors[i].y) 
					{
					// The objects are touching
					clearInterval(this.interval);
					this.ship.dead = true;
					jQuery('.final-score').html('Final Score:'+this.score + "<button type='button' onclick='window.location.reload()'>Play Again</button>");


					}
					// This moves the meteor along the Y-axis
					this.meteors[i].y += this.meteors[i].speed;					
				};
	        };
		};

		this.draw = function()
		{
			this.scoreElement.html(this.score);
			if (this.ship && !this.ship.dead)
			{
				this.ship.draw();
			};
			for (var i = 0; i < this.meteors.length; ++i) {
			    this.meteors[i].draw();
			}
			//this.meteors[0].draw();
			/*for (i=0; i <= this.meteors.length; i++)
			{
				this.meteors[i].draw();
			}*/
			
		};

		this.initialize();
	};

	var Ship = function(baseUrl, x, y)
	{
		this.initialize =function()
		{
			this.speed = 6;
			this.sprite = jQuery("<img src='" + baseUrl + "/img/space-ship.gif'>");
			this.img = new Image();
			this.img.src = baseUrl + "/img/space-ship.gif";
			this.dead = false;
			this.x = x;
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
				'left': this.x
			});
		};
	};



	var Meteor = function(baseUrl, x, y)
	{
		this.initialize = function()
		{
			this.speed = 4;
			this.sprite = jQuery("<img src='" + baseUrl + "/img/newmeteor.png'>");
			this.x = x;
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

		jQuery(document).ready(function($) {
			var els = jQuery('.dodger');
			for (var i=0; i < els.length; ++i) new Dodger(els[i]);
		});
})();