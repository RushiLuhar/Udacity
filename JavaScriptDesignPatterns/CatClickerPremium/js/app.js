/**
 * Created by rushi on 28/02/2016.
 */
// Model
var model = {
    data: [{name: 'Chewie', count: 0, img: 'resources/CHEWIE.jpg'},
        {name: 'Cutie', count: 0, img: 'resources/CUTIE.jpg'},
        {name: 'Evil', count: 0, img: 'resources/EVIL.jpg'},
        {name: 'Grumpy', count: 0, img: 'resources/GRUMPY.jpg'},
        {name: 'Snotra', count: 0, img: 'resources/Snotra.jpg'}],

    getCat: function (catName) {
        for (cat in data) {
            if (catName == cat.name) {
                return cat;
            }
        }
    },

    setSelectedCat: function (cat) {
        this.selectedCat = cat;
    },

    init: function () {
        this.selectedCat = this.data[0];
    }
};

var sideBarView = {
    init: function (sideBar, model, clickListener, resetListener) {
        // Iterate through the data and create a span for each
        sideBar.innerHTML = '';
        var data = model.data;
        for (var idx = 0; idx < data.length; idx++) {
            var cat = data[idx];
            var catButton = document.createElement('button');
            catButton.textContent = cat.name;

            catButton.addEventListener('click', (function (catData) {
                return function () {
                    clickListener(catData)
                }
            })(cat));

            sideBar.appendChild(catButton);
            sideBar.appendChild(document.createElement('hr'));
        }
        var resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Count';
        resetButton.addEventListener('click', resetListener);
        sideBar.appendChild(resetButton);
    }
};

var mainBarView = {
    init: function (main, countListener, model) {
        this.content = main;
        this.content.innerHTML = '';
        this.model = model;
        this.countListener = countListener;
    },

    render: function () {
        this.content.innerHTML = '';
        var cat = this.model.selectedCat;
        var header = document.createElement('h3');
        header.textContent = 'This is ' + cat.name;
        this.content.appendChild(header);

        var img = document.createElement('img');
        img.src = cat.img;
        img.addEventListener('click', this.countListener);
        
        this.content.appendChild(img);

        var counter = document.createElement('h3');
        counter.textContent = 'She has been clicked ' + cat.count + ' times';
        this.content.appendChild(counter);
    },

    reset: function () {
        this.content.innerHTML = '';
        var msg = document.createElement('h3');
        msg.textContent = 'Please select a cat';
        this.content.appendChild(msg);
    }
};

var adminView = {
    init: function (updateCatDetails) {

        document.getElementById('adminForm').style.display = 'none';
        document.getElementById('adminButton').addEventListener('click', function () {
            document.getElementById('adminForm').style.display = 'block';
        });

        document.getElementById('formResetButton').addEventListener('click', function () {
            document.getElementById('adminForm').style.display = 'none';
        });

        document.getElementById('formSubmitButton').addEventListener('click', function () {
            var newCatName = document.getElementById('catName').value;
            var newCatUrl = document.getElementById('catURL').value;
            var newCatCount = document.getElementById('catClickCount').value;
            updateCatDetails(newCatName, newCatUrl, newCatCount);
        });
    },
}

var controller = {

    init: function () {
        this.sideBar = document.getElementById('sidebar');
        this.main = document.getElementById('main');
        model.init();
        sideBarView.init(this.sideBar, model, this.clickListener, this.resetListener);
        mainBarView.init(this.main, this.addCountListener, model);
        mainBarView.render();

        adminView.init(this.updateCatDetails);
    },

    clickListener: function (catData) {
        model.setSelectedCat(catData);
        mainBarView.render();
    },

    addCountListener: function () {
        model.selectedCat.count = +model.selectedCat.count + 1;
        mainBarView.render();
    },

    resetListener: function () {
        for (var idx = 0; idx < model.data.length; idx++) {
            var cat = model.data[idx];
            cat.count = 0;
        }
        mainBarView.reset();
    },

    updateCatDetails: function (catName, catUrl, catCount) {
        model.selectedCat.count = catCount;
        model.selectedCat.img = catUrl;
        model.selectedCat.name = catName;
        mainBarView.render();
    }
};

window.onload = function () {
    controller.init();
};
