let balance = 200;
let currentBet = 1; // Initial bet amount
let patternIndex = 0;
const bettingPattern = ['Player', 'Banker', 'Player', 'Player', 'Banker', 'Banker'];
let playerScore, bankerScore; // Declare the variables outside the deal function
let originalBetBeforeTie;
let patternIndexBeforeTie;

function updateDisplay(balanceBeforeBet, betAmount, playerScore, bankerScore, winner) {
  console.log('=================================================================================');
  console.log(`Balance Before Bet: $${balanceBeforeBet}`);
  console.log(`Current Bet: $${betAmount}`);
  console.log(`Player Score: ${playerScore}, Banker Score: ${bankerScore}. ||||||||| ${winner} Wins!`);
  console.log(`Balance After Bet: $${balance}`);
}

function placeBet(winner) {
    const originalBet = currentBet; // Store the original bet before updating
    const balanceBeforeBet = balance; // Store the balance before the bet
  
    const selectedBet = bettingPattern[patternIndex];
  
    if ((selectedBet === 'Player' || selectedBet === 'Banker') && (selectedBet === winner)) {
      currentBet = 1;
      patternIndex = 0;
      balance += originalBet;
    } else if (selectedBet !== winner) {
      balance -= originalBet;
      patternIndex = (patternIndex + 1) % bettingPattern.length;
      currentBet = originalBet * 2;
    } else if (selectedBet === 'Tie') {
      // On a tie, keep the original bet and pattern index before the tie
      balance = balance;
      currentBet = originalBetBeforeTie;
      patternIndex = patternIndexBeforeTie;
    }

  // Call the modified updateDisplay function
  updateDisplay(balanceBeforeBet, originalBet, playerScore, bankerScore, winner);

  return { originalBet, selectedBet };
}

function deal() {
  // Simulate the game (using a random number for simplicity)
  playerScore = Math.floor(Math.random() * 9) + 1;
  bankerScore = Math.floor(Math.random() * 9) + 1;

  let winner;
  if (playerScore > bankerScore) {
    winner = 'Player';
  } else if (bankerScore > playerScore) {
    winner = 'Banker';
  } else {
    winner = 'Tie';
  }

  if (winner !== 'Tie') {
    // Update originalBetBeforeTie and patternIndexBeforeTie only when it's not a tie
    originalBetBeforeTie = currentBet;
    patternIndexBeforeTie = patternIndex;
  }

  const { betAmount, selectedBet } = placeBet(winner);
}

// Example usage:
// Uncomment the following lines to run the simulation for a certain number of rounds (e.g., 10 rounds):
for (let i = 0; i < 10; i++) {
  deal();
}
