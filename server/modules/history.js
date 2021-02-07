let storedHistory = [];

// add data to history
function addToHistory(data) {
  storedHistory.push(data);
}

function stored() {
  return storedHistory;
}

module.exports = {
  addToHistory,
  stored,
  // returning the variable isn't working as it always resets.
};
