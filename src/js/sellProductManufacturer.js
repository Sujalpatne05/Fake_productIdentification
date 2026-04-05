App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: async function() {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                alert('User denied account access');
                return;
            }
        } else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
            web3 = new Web3(window.web3.currentProvider);
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },

    initContract: function() {
        $.getJSON('product.json', function(data) {
            var productArtifact = data;
            App.contracts.product = TruffleContract(productArtifact);
            App.contracts.product.setProvider(App.web3Provider);
            App.bindEvents();
        });
    },

    bindEvents: function() {
        $(document).on('click', '.btn-register', App.registerProduct);
        // QR code scanner callback integration
        if (window.onQRCodeScanned) {
            window.onQRCodeScanned = function(data) {
                let productSN = '';
                let sellerCode = '';
                if (typeof data === 'string' && data.includes(',')) {
                    [productSN, sellerCode] = data.split(',');
                } else if (typeof data === 'object') {
                    productSN = data.productSN || '';
                    sellerCode = data.sellerCode || '';
                } else {
                    productSN = data;
                }
                document.getElementById('productSN').value = productSN;
                document.getElementById('sellerCode').value = sellerCode;
                App.registerProduct();
            }
        }
    },

    registerProduct: function(event) {
        if (event) event.preventDefault();

        var productSN = document.getElementById('productSN').value;
        var sellerCode = document.getElementById('sellerCode').value;

        if (!productSN || !sellerCode) {
            alert('Product SN and Seller Code required!');
            return;
        }

        // Call backend API instead of smart contract directly
        fetch('http://localhost:5000/api/manufacturer/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'manufacturer'
            },
            body: JSON.stringify({
                _productSN: productSN,
                _sellerCode: sellerCode
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Product transferred to seller successfully!');
                document.getElementById('productSN').value='';
                document.getElementById('sellerCode').value='';
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(err => {
            alert('Error: ' + err.message);
            console.error(err);
        });
    }
};

$(function() {
    $(window).on('load', function() {
        App.init();
    });
});