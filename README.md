# No Hesi

## Background 

The no hesi game is made for players that are itching to speed down a highway 
weaving through traffic as if it isn't even there. The game is very simple and has a basic flow. You are the driver of a car and your goal is to speed along the highway for as long as possible, while collecting nitrous cannisters that are in the road on the way. Sounds easy enough right? The complication comes in when there are also other cars and obstacles on the road that might be looking to ruin your day as you try to get your daily dose of speed.

## Functionality & MVPs

In No Hesi, users will be able to: 
* Drive a car in order to avoid other cars/obstacles
* Keep track of their score as they have been driving 
* Pick up items that will add to the players score
* Use the items the player picks up

In addition, this project will include: 
* A production README 
* Instructions on how to play the game

## Wireframes
![Wireframe](https://cdn.discordapp.com/attachments/747021191067205682/895781707268104252/Screenshot_116.png)
* Nav links list that includes links to Github repo as well as LinkedIn
* Controls will include the instructions for how to steer your car 
* Score tracker will keep track of the score 
* A button in the middle of the splash screen to actually begin the game 
* Option to turn the sounds on and off(bonus feature)

## Technologies, Libraries, API
* Threejs in order to render the 3d view and models 
* Webpack and Babel in order to bundle source JavaScript code
* npm to manage project dependencies 

## Implementation Timeline 
### Friday Afternoon & Weekend
* Setup webpack properly to make sure everything will be testable
* Gather models and research how to be able to render models on screen
* Research 3-D text within jthree in order to have it appear on the splash screen
* Research how to acquire collision data when dealing with 3-D models
* Get a car, road and props to render on the screen
* Start working on car movement if time permits

### Monday 
* Implementing movement of the car 
* Implementing the movement of other cars that are not player cars 
* Get cars to appear both ahead of and behind the player when their speed drops below a certain point 

### Tuesday 
* Implement a scoring system
* Start working on splash screen if time permits

### Wednesday
* Finish creating splash screen
* Focus on styling and finishing touches

### Thursday Morning
* Deploy to GitHub pages 
* rewrite README if time permits

## Bonus Feautures
* Add sound to the game 
* Adding a color selection option to the car 
* Add a speedometer that allows for the tracking of the speed
* Add pickups that do different things
* Add a button to turn sound off from splash screen