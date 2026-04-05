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

        var sellerName = document.getElementById('SellerName').value;
        var sellerBrand = document.getElementById('SellerBrand').value;
        var sellerCode = document.getElementById('SellerCode').value;
        var sellerPhoneNumber = document.getElementById('SellerPhoneNumber').value;
        var sellerManager = document.getElementById('SellerManager').value;
        var sellerAddress = document.getElementById('SellerAddress').value;
        var ManufacturerId = document.getElementById('ManufacturerId').value;

        if (!sellerName || !sellerBrand || !sellerCode || !sellerPhoneNumber || !sellerManager || !sellerAddress || !ManufacturerId) {
            alert('Please fill in all fields');
            return;
        }

        // Call backend API instead of smart contract directly
        fetch('http://localhost:5000/api/seller/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'manufacturer'
            },
            body: JSON.stringify({
                _manufacturerId: ManufacturerId,
                _sellerName: sellerName,
                _sellerBrand: sellerBrand,
                _sellerCode: sellerCode,
                _sellerNum: parseInt(sellerPhoneNumber),
                _sellerManager: sellerManager,
                _sellerAddress: sellerAddress
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Seller added successfully!');
                document.getElementById('SellerName').value='';
                document.getElementById('SellerBrand').value='';
                document.getElementById('SellerCode').value='';
                document.getElementById('SellerPhoneNumber').value='';
                document.getElementById('SellerManager').value='';
                document.getElementById('SellerAddress').value='';
                document.getElementById('ManufacturerId').value='';
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