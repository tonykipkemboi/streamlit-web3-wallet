// Initialize web3
let web3;

// Initialize account
let account = null;

function sendValue(value) {
  if (typeof value === 'string') {
    Streamlit.setComponentValue(value);
  }
}

// Function to connect to the wallet
async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);

    // Listen for disconnection:
    window.ethereum.on('disconnect', (error) => {
      console.log(`MetaMask Disconnected: ${error}`);
      // Handle disconnection...
      disconnectWallet();
    });

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = accounts[0];
      const truncatedAddress = `Connected: ${account.substring(0, 6) + '...' + account.substring(38)}`;
      document.getElementById('connect-button').innerText = truncatedAddress;
      sendValue(account);
    } catch (error) {
      // User denied account access...
      console.error("User denied account access");
      document.getElementById('connect-button').innerText = 'Connect Wallet';
    }

    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        account = accounts[0];
        const truncatedAddress = `Connected: ${account.substring(0, 6) + '...' + account.substring(38)}`;
        document.getElementById('connect-button').innerText = truncatedAddress;
        sendValue(account);
      } else {
        // No accounts available, handle as needed
        disconnectWallet();
      }
    });
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. Please install MetaMask!');
    document.getElementById('connect-button').innerText = 'Connect Wallet';
  }
}

// Function to connect to the wallet
async function getCurrentConnectedWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);

    // Listen for disconnection:
    window.ethereum.on('disconnect', (error) => {
      console.log(`MetaMask Disconnected: ${error}`);
      // Handle disconnection...
      disconnectWallet();
    });

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      account = accounts[0];
      const truncatedAddress = `Connected: ${account.substring(0, 6) + '...' + account.substring(38)}`;
      document.getElementById('connect-button').innerText = truncatedAddress;
      sendValue(account);
    } catch (error) {
      // User denied account access...
      console.error("User denied account access");
      document.getElementById('connect-button').innerText = 'Connect Wallet';
    }

    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        account = accounts[0];
        const truncatedAddress = `Connected: ${account.substring(0, 6) + '...' + account.substring(38)}`;
        document.getElementById('connect-button').innerText = truncatedAddress;
        sendValue(account);
      } else {
        // No accounts available, handle as needed
        disconnectWallet();
      }
    });
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. Please install MetaMask!');
    document.getElementById('connect-button').innerText = 'Connect Wallet';
  }
  return null; // Return null if wallet is not connected
}

function onRender(event) {
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {
    // Attach functions to buttons
    document.getElementById('connect-button').addEventListener('click', connectWallet);

    // Check if wallet is already connected
    const storedAddress = getCurrentConnectedWallet();
    if (storedAddress) {
      // Check if wallet is still connected
      web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then((accounts) => {
        if (accounts.length > 0 && accounts[0] === storedAddress) {
          account = storedAddress;
          const truncatedAddress = `Connected: ${account.substring(0, 6) + '...' + account.substring(38)}`;
          document.getElementById('connect-button').innerText = truncatedAddress;
          sendValue(account);
        } else {
          disconnectWallet();
        }
      });
    } else {
      document.getElementById('connect-button').innerText = 'Connect Wallet';
    }

    window.rendered = true;
  }
}

// Render the component whenever python sends a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady();
// Render with the correct height, if this is a fixed-height component
Streamlit.setFrameHeight(100);
