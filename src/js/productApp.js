App = {

    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: function() {
        if(window.web3) {
            App.web3Provider=window.web3.currentProvider;
        } else {
            App.web3Provider=new Web3.proviers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function() {

        $.getJSON('product.json',function(data){

            var productArtifact=data;
            App.contracts.product=TruffleContract(productArtifact);
            App.contracts.product.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function() {

        $(document).on('click','.btn-register',App.registerProduct);
    },

    registerProduct: function(event) {
        event.preventDefault();

        var manufacturerID = document.getElementById('manufacturerID').value;
        var productName = document.getElementById('productName').value;
        var productSN = document.getElementById('productSN').value;
        var productBrand = document.getElementById('productBrand').value;
        var productPrice = document.getElementById('productPrice').value;

        if (!manufacturerID || !productName || !productSN || !productBrand || !productPrice) {
            alert('Please fill in all fields');
            return;
        }

        // Call backend API instead of smart contract directly
        fetch('http://localhost:5000/api/product/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'manufacturer'
            },
            body: JSON.stringify({
                _manufacturerID: manufacturerID,
                _productName: productName,
                _productSN: productSN,
                _productBrand: productBrand,
                _productPrice: parseInt(productPrice)
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Product added successfully!');
                document.getElementById('manufacturerID').value='';
                document.getElementById('productName').value='';
                document.getElementById('productSN').value='';
                document.getElementById('productBrand').value='';
                document.getElementById('productPrice').value='';
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

    $(window).load(function() {
        App.init();
    })
})

