# TicTacToe

### The program implements an online Tic Tac Toe game between two users intercating through io socket framework.
Mini-game was developed in JavaScript using NodeJs environment in order to take adavntage of express and scoket io frameworks to cummunicate between server and client side.

Website has one screen which is the playing board. Game is starting once two players are connecting to the game.

We'll take an overview at four different game situations

## 1. Waiting for opponent <br/>
![1](https://user-images.githubusercontent.com/72853162/130331596-aac222d5-c657-49b2-8e6c-749b322960c4.JPG)


As the first player logs in, scoket listener is activated, player object in initialize, and program is on hold untill secong player joins the game.
When this happens, game socket is activated and start cumminucating with client side, where first player to start is chosen.

## 2. Gameplay <br/>
![2](https://user-images.githubusercontent.com/72853162/130331600-f5917f44-66cf-45af-8ac7-058d19ddcfb0.JPG)
![5](https://user-images.githubusercontent.com/72853162/130331605-6fd2e222-1a37-4cbc-beb4-35823a6e5bf2.JPG)


On the left - active player's screen, right - player's pending screen.
Client side holds a listener on every cell, which is actiavting the function to place the mark on the board. 
Client side sends position and mark type to server, server sends details back to client in order to change text and deactivate screen for non-playing player.
 
## 3. Player won <br/>
![3](https://user-images.githubusercontent.com/72853162/130331613-5a2294a0-e533-4de4-b28d-fd6617c82b80.JPG)


In every move, client side is going through all winning combinations to check for a possible win.
Once happened, board will deactivate and a winning message will appear for the winning side, and losing message for the losing side.
parralel messages for each side are shown seperately by checking whether it is player one turn or player two.
Notice that a restart button will appear if the player wishes to play again.
 
## 4. Tie game <br/>
![4](https://user-images.githubusercontent.com/72853162/130331615-44d1b407-86e7-4141-a0dc-5c4f751b3ade.JPG)


When board is full, a message will be shown. A restart button will appear if the player wishes to play again.


