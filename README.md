# streamlit-web3-wallet

Streamlit component that allows you to connect your web3 wallet to a Streamlit dApp

## Installation instructions 

```sh
pip install streamlit-web3-wallet
```

## Usage instructions

```python
import streamlit as st
from src.streamlit_web3_wallet import streamlit_web3_wallet

st.set_page_config("wide")

def main():
    st.title("Web3 Wallet Integration Demo")
    value = streamlit_web3_wallet("Connect to Wallet")
    if value:
        st.write(f"Wallet address: {value}")
    else:
        pass

if __name__ == "__main__":
    main()
```
