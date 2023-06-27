// Initialize web3
let web3;

// Initialize account
let account = null;

function sendValue(value) {
  Streamlit.setComponentValue(value);
}

// Function to connect to the wallet
async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
      document.getElementById('wallet-address').innerText = account;
      sendValue(account);
    } catch (error) {
      // User denied account access...
      console.error("User denied account access");
    }
  } 
  // Legacy dapp browsers...
  else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
  } 
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

// Function to disconnect the wallet
function disconnectWallet() {
  web3 = null;
  account = null;
  document.getElementById('wallet-address').innerText = 'Not connected';
  sendValue(null);
}

function onRender(event) {
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {
    // Check if browser has Ethereum capabilities
    if (typeof window.ethereum === 'undefined') {
      // Send 'false' to Python
      sendValue(false);
    } else {
      // Attach functions to buttons
      document.getElementById('connect-button').addEventListener('click', connectWallet);
      document.getElementById('disconnect-button').addEventListener('click', disconnectWallet);

      // Send 'true' to Python
      sendValue(true);
    }
    window.rendered = true;
  }
}

// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()
// Render with the correct height, if this is a fixed-height component
Streamlit.setFrameHeight(100)
