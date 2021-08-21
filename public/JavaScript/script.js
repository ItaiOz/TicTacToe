var socket = io();
var mark;
var currTurn;
const TIC = 'X'
const cellElements = document.querySelectorAll('.board > button')
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

$(function () {
        $("#restart").on("click", restartGame)
        $(".board > button").on("click", playerMove)

        //Socket listener reached when 2 players are online and set to play
        socket.on('get starting position', function (data){
               mark = data.mark;
               if(data.mark === TIC) {
                       currTurn = true;
                       $("#messages").text("Your turn!")
                       $(".board button").attr("disabled", false);
               }
               else
                       $("#messages").text("opponent's turn now")
        })

        //Socket listener for placing the X or O after a player chose a cell
        socket.on("place mark", function(data) {
                $("#" + data.location).text(data.mark)

                //when board is full of marks
                if(gameTied())
                {
                        $("#messages").text("Game is tied");
                        $(".board button").attr("disabled", true);
                        $("#restart").css('visibility', "visible");
                        return;
                }

                //Both players will receive the relevant message, and restart button will apear
                if (checkWin()) {
                        if(currTurn)
                                $("#messages").text("You won!");
                        else $("#messages").text("You lost...")

                        $(".board button").attr("disabled", true);
                        $("#restart").css('visibility', "visible");
                        return;
                   }

                switchTurns()

        })

        //A listener which will activate when one of the users has left the game
        socket.on("player left", function(){
                $("#messages").text("Opponent left the game")
                $(".board button").attr("disabled", true);
                $("#restart").css('visibility', "visible");
        })

})

//Switching turns after a move was played, board will be enabled to click
function switchTurns(){
        if(currTurn) {
                $(".board button").attr("disabled", true);
                $("#messages").text("Opponent's turn")
        }
        else{
                $(".board button").attr("disabled", false);
                $("#messages").text("Your turn!")
        }
        currTurn = !currTurn
}


//Modifying the elements into array, then checking whether each cell isn't empty
function gameTied() {
        let elements = Array.from(cellElements)
        return elements.every(index => index.textContent !== "")
}

//Winning check function, iterating on all possible combinations then checking for a possible win
function checkWin() {
        let elements = Array.from(cellElements)

        for(let i in winningCombinations){
                let winningRow = winningCombinations[i]

                let p1 = winningRow[0]
                let p2 = winningRow[1]
                let p3 = winningRow[2]

                if(elements[p1].textContent !== "" && elements[p2].textContent !== "" &&
                    elements[p3].textContent !== "")
                   if(elements[p1].textContent === elements[p2].textContent
                   && elements[p2].textContent === elements[p3].textContent
                   && elements[p1].textContent === elements[p3].textContent)
                           return true;
        }
        return false;
}

//When button is clicked, sending data to server with location and mark type
function playerMove() {
        if($(this).text().length > 0)
                return;
        socket.emit("mark checked", {
                location: $(this).attr("id"),
                mark: mark
        })
}

//When player has left, or either game has ended
function restartGame(){
        location.reload();
}