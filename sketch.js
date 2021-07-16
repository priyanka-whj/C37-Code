var ball;
var db;
var position;

function setup()
{
    createCanvas(500,500);

    db = firebase.database(); //creating reference to the database. Variable db points to the database.

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPosition = db.ref('ball/position');//To refer root or the child node in the database.
    ballPosition.on("value", readPosition, showError); //Database is read using on() method that retrieve's data snapshot from the database
}                                                      //on() method is called each time when a database is updated.
                                                        //whenever there is a change in the database variable's value position, readPosition is called.
                                                        //If there is an error while reading the value from the database, then showError is called.
function draw()
{
    background("white");
    if(position !== undefined)
    {
        if(keyDown(LEFT_ARROW))
        {
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW))
        {
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW))
        {
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW))
        {
            writePosition(0, 1);
        }
    } 
    drawSprites();
}

function readPosition(data)
{
    position = data.val(); //extracts the data from the data snapshot using val() & save it in position variable
    ball.x = position.x; //assign x-position of the ball in the database to the ball sprite.
    ball.y = position.y; //assign y-position of the ball in the database to the ball sprite.
}

function writePosition(x,y)
{
    db.ref('ball/position').set({'x': position.x + x, 'y': position.y + y});
}

function showError()
{
    console.log("Error in reading data from the database");
}
