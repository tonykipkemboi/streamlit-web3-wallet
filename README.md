# streamlit-web3-wallet

Streamlit component that allows you to connect your web3 wallet to a Streamlit dApp

## Installation instructions 

```sh
pip install streamlit-web3-wallet
```

## Usage instructions

```python
import streamlit as st

from streamlit_web3_wallet import streamlit_web3_wallet

value = streamlit_web3_wallet()

st.write(value)
