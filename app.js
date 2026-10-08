const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-btn");
const resetScoreBtn = document.querySelector("#reset-score-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const turnText = document.querySelector("#turn-text");
const scoreO = document.querySelector("#score-o");
const scoreX = document.querySelector("#score-x");

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let turnO = true;
let count = 0;
let scores = { O: 0, X: 0 };

const updateTurn = () => {
    turnText.innerText = `Turn: ${turnO ? "O" : "X"}`;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        const player = turnO ? "O" : "X";
        box.innerText = player;
        box.classList.add(player.toLowerCase());
        box.disabled = true;

        turnO = !turnO;
        count++;
        updateTurn();

        // pehle winner check, warna 9 moves ke baad draw
        if (!checkWinner() && count === 9) {
            showDraw();
        }
    });
});

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const val1 = boxes[a].innerText;
        const val2 = boxes[b].innerText;
        const val3 = boxes[c].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            pattern.forEach((i) => boxes[i].classList.add("win"));
            showWinner(val1);
            return true;
        }
    }
    return false;
};

const showWinner = (winner) => {
    scores[winner]++;
    scoreO.innerText = scores.O;
    scoreX.innerText = scores.X;

    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
};

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const resetGame = () => {
    turnO = true;
    count = 0;
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o", "x", "win");
    });
    msgContainer.classList.add("hide");
    updateTurn();
};

const resetScore = () => {
    scores = { O: 0, X: 0 };
    scoreO.innerText = 0;
    scoreX.innerText = 0;
    resetGame();
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
resetScoreBtn.addEventListener("click", resetScore);
