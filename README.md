# No Hesi

## Background 
Welcome, to the world of no hesitation. A game specifically targeted at those who have the need for speed and are itching to speed down a highway weaving through traffic as if it isn't even there. The game is very simple and has a basic flow. You are the driver of a car and your goal is to speed along the highway for as long as possible. Sounds easy enough right? The complication comes in when there are also other cars and obstacles on the road that might be looking to ruin your day as you try to get your daily dose of speed.

## Functionality & MVPs
In No Hesi, users will be able to: 
* Drive a car in order to avoid other cars
* Gather jerry cans for extra points
* Keep track of their score as they have been driving 
* Have an interactive world in which the game starts, and ends.
* Have a mutable soundtrack that fits theme of the game

In addition, this project will include: 
* A production README 
* Instructions on how to play the game
* Optimization of assets in order to load more models on the screen at a time

# Screenshots
## Splash Screen
![Splash-Screen](https://nohesitation.s3.amazonaws.com/SPLASH.png)
## Instructional Modal
![Modal](https://nohesitation.s3.amazonaws.com/CONTROLS.png)
## Interactable Link List
![Links](https://nohesitation.s3.amazonaws.com/LINKS.png)
## Dynamic Score
![Score](https://nohesitation.s3.amazonaws.com/SCORE.png)

# Wireframes
## Splash Screen Wireframe
![Wireframe](https://nohesitation.s3.amazonaws.com/WIREFRAME1.png)
* Nav links list 
* Score tracker will keep track of the score 
* A button in the middle of the splash screen to actually begin the game 
## Modal Wireframe
![Wireframe-2](https://nohesitation.s3.amazonaws.com/WIREFRAME2.png)
* Controls will include the instructions for how to steer your car 
* Controls will also include how to mute sound
* Instructions will show how to start the game
* Objectives will show how to win the game

## Technologies, Libraries, API
* Threejs in order to render the 3d view and models 
* Pointer Lock API
* Webpack and Babel in order to bundle source JavaScript code
* NPM to manage project dependencies

## Implementation Timeline 
### Friday Afternoon & Weekend
* Setup webpack properly to make sure everything will be testable
* Gather models and research how to be able to render models on screen
* Research how to make a splash screen cover the canvas utilizing different css properties
* Research how to acquire collision data when dealing with 3-D models
* Research how ray casting works in order to make an interactable invironment
* Get a car, road and skybox to render on the screen
* Start working on car movement if time permits

### Monday 
* Implementing movement of the car 
* Implementing the movement of other cars that are not player cars 
* Get cars to reappear in a random location once the car hits a certain coordinate/plane
* Add sound to the game 

### Tuesday 
* Implement a scoring system
* Use time, to implement the scoring system, make sure the time pauses as you pause the game
* Get score to appear on screen
* Start working on splash screen if time permits

### Wednesday
* Finish creating splash screen
* Make sure splash screen is reactive and updates based on game state
* Focus on styling and finishing touches

### Thursday Morning
* Deploy to GitHub pages 
* rewrite README if time permits

## Bonus Feautures
* Interactivity between game world on start 
* Car animations on movement 
* Sound, with a working mute button
* Lighting correctly set up to mimic scene
* Custom made sound track 

## Credits
* Models provided by turbosquid.com
* Skybox images provided by gamebanana.com
* Font provided by 1001fonts.com
* All the people who gave me words of encouragement and great ideas

