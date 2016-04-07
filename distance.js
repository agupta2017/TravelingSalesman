/*$(document).ready( 
	function() 
	{
		$("#button1").click( function() 
			{ 
			$(this).css( "background-color", "red" );
			var x1 = $('#x1').val();
			var y1 = $('#y1').val();
			var x2 = $('#x2').val();
			var y2 = $('#y2').val();
			console.log(distance(x1,x2,y1,y2));
			});
		$("#button2").click( function() 
			{
			$(this).css( "background-color", "green");
			});
	});


//returns the distance between two points
function distance(x1, x2, y1, y2) {
	var n = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
	return n;
}*/

$(document).ready( function() {
	
	var dotX = [];
	var dotY = [];
	
	$("#canvas").click( function() {
		
		//get context of canvas
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		var canvas2 = $("#canvas2").get(0);
		var ctx2 = canvas2.getContext("2d");
		
		//add point to canvas (write this)
		ctx.fillRect(event.pageX-10,event.pageY-190,5,5);
		ctx2.fillRect(event.pageX-10,event.pageY-190,5,5);
		
		//add point to arrays
		dotX.push(event.pageX-10);
		dotY.push(event.pageY-190);
	
	});

	$("#Smallest").click( function() {
		//do algorithm
		var finalX= [];
		var finalY = [];
		
		//I need to take stuff off the dotX and Y arrays but I still want the array intact at the end
		//so I can also run nearest neighbor on the same points
		//so I am keeping a duplicate array called copyX and copyY so I can restore the dot arrays at the end of the code
		var copyX = $.extend(true, [], dotX);
		var copyY = $.extend(true, [], dotY);
		
		//I'm taking the first 2 points off immediately because that is the only place these first 2 points can go
		finalX.push(dotX.shift());
		finalY.push(dotY.shift());
		
		finalX.push(dotX.shift());
		finalY.push(dotY.shift());
		
		for(var j = 0; j<dotX.length; j++)
		{
			var holderX=dotX.shift();
			var holderY=dotY.shift();
			var increase = Number.MAX_SAFE_INTEGER;
			var increaseIndex = finalX.length;
			var hold = 0;
			for(var k =1; k<=finalX.length; k++)
			{
				if(k==finalX.length)
				{
					hold = Math.sqrt(Math.pow(holderX + finalX[k-1],2) + Math.pow(holderY + finalY[k-1],2));
					if(hold<increase)
					{
						increaseIndex = k;
						increase = hold;
					}
					else
					{
					
					}
				}
				else
				{
					hold = Math.sqrt(Math.pow(holderX + finalX[k-1],2) + Math.pow(holderY + finalY[k-1],2));
					hold += Math.sqrt(Math.pow(holderX + finalX[k],2) + Math.pow(holderY + finalY[k],2));
					hold -= Math.sqrt(Math.pow(finalX[k-1] + finalX[k],2) + Math.pow(finalY[k-1] + finalY[k],2));
					if(hold<increase)
					{
						increaseIndex = k;
						increase = hold;
					}
					else
					{
					
					}
				}
			}
			finalX.splice(increaseIndex,0,holderX);
			finalY.splice(increaseIndex,0,holderY);
			j--;
		}
		
		//draw lines between points
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");	
		ctx.strokeStyle = "#FF0000"; //change color of line
		ctx.lineWidth = 3; //change width of line
		
		
		//draw a line between every point
		var distance = 0;
		for(var k =0; k<finalX.length-1; k++)
		{
			ctx.moveTo(finalX[k],finalY[k]);
			ctx.lineTo(finalX[k+1],finalY[k+1]);
			ctx.stroke();
			distance += Math.sqrt(Math.pow(finalX[k]+finalX[k+1],2)+Math.pow(finalY[k]+finalY[k+1],2));
		}
		dotX = copyX;
		dotY = copyY;
		
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		ctx.font = "10px Arial";
		ctx.fillText("distance: " + distance,450,280);
	});
	
	$("#Nearest").click(function() {
		//do algorithm
		finalX= [];
		finalY = [];
		
		//I need to take stuff off the dotX and Y arrays but I still want the array intact at the end
		//so I can also run nearest neighbor on the same points
		//so I am keeping a duplicate array called copyX and copyY so I can restore the dot arrays at the end of the code
		var copyX = $.extend(true, [], dotX);
		var copyY = $.extend(true, [], dotY);
		
		finalX.push(dotX.shift());
		finalY.push(dotY.shift());
		
		finalX.push(dotX.shift());
		finalY.push(dotY.shift());
		
		for(var j = 0; j<dotX.length; j++)
		{
			holderX=dotX.shift();
			holderY=dotY.shift();
			var closest = Number.MAX_SAFE_INTEGER;
			var closestIndex = finalX.length;
			var hold = 0;
			for(var k =1; k<=finalX.length; k++)
			{
				hold = Math.sqrt(Math.pow(holderX + finalX[k-1],2) + Math.pow(holderY + finalY[k-1],2));
				if(hold<closest)
				{
					closestIndex = k;
					closest = hold;
				}
			}
			finalX.splice(closestIndex,0,holderX);
			finalY.splice(closestIndex,0,holderY);
			j--;
		}
		
		//draw lines between points
		var canvas = $("#canvas2").get(0);
		var ctx = canvas.getContext("2d");	
		ctx.strokeStyle = "#55C"; //change color of line
		ctx.lineWidth = 3; //change width of line
		
		
		//draw a line between every point
		var distance = 0;
		for(var k =0; k<finalX.length-1; k++)
		{
			ctx.moveTo(finalX[k],finalY[k]);
			ctx.lineTo(finalX[k+1],finalY[k+1]);
			ctx.stroke();
			distance += Math.sqrt(Math.pow(finalX[k]+finalX[k+1],2)+Math.pow(finalY[k]+finalY[k+1],2));
		}
		dotX = copyX;
		dotY = copyY;
		
		var c = document.getElementById("canvas2");
		var ctx = c.getContext("2d");
		ctx.font = "10px Arial";
		ctx.fillText("distance: " + distance,450,280);
	});
});
