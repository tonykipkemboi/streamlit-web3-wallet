from pathlib import Path

import setuptools

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setuptools.setup(
    name="streamlit-web3-wallet",
    version="0.1.0",
    author="Tony Kipkemboi",
    author_email="iamtonykipkmboi@gmail.com",
    description="Streamlit component that allows you to connect your web3 wallet to a Streamlit dApp",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(where="src"),
    package_dir={"": "src"},
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.7",
    install_requires=["streamlit>=1.2", "jinja2"],
)
