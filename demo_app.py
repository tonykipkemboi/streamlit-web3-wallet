import streamlit as st
from web3 import Web3
from src.streamlit_web3_wallet import streamlit_web3_wallet

st.set_page_config("wide")

alchemy_api_key = st.secrets['ALCHEMY-API-KEY']
alchemy_url = f"https://eth-mainnet.g.alchemy.com/v2/{alchemy_api_key}"
w3 = Web3(Web3.HTTPProvider(alchemy_url))


def get_wallet_balance(wallet_address):
    checksum_address = Web3.to_checksum_address(wallet_address)
    balance = w3.eth.get_balance(checksum_address)
    balance_eth = w3.from_wei(balance, 'ether')
    return balance_eth


def main():
    st.title('💰 Eth Wallet Balance Demo App!')

    if wallet_address := streamlit_web3_wallet():
        Web3.is_checksum_address(wallet_address)
        balance = get_wallet_balance(wallet_address)
        st.success(f'Your wallet balance is: {balance} Ether')

        # Get the latest block number
        latest_block = w3.eth.block_number
        st.write(f'Latest block #: {latest_block}')


if __name__ == '__main__':
    main()
