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
    }
};

var sideBarView = {
    init: function (sideBar, data, clickListener, resetListener) {
        // Iterate through the data and create a span for each
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
    init: function (main) {
        this.content = main;
    },

    render: function (cat) {
        this.content.innerHTML = '';

        var header = document.createElement('h3');
        header.textContent = 'This is ' + cat.name;
        this.content.appendChild(header);

        var img = document.createElement('img');
        img.src = cat.img;
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

var controller = {

    init: function () {
        this.sideBar = document.getElementById('sidebar');
        this.sideBar.innerHTML = '';
        this.main = document.getElementById('main');
        this.main.innerHTML = '';
        sideBarView.init(this.sideBar, model.data, this.clickListener, this.resetListener);
        mainBarView.init(this.main);
    },

    clickListener: function (catData) {
        catData.count = catData.count + 1;
        mainBarView.render(catData);
    },

    resetListener: function () {
        for (var idx = 0; idx < model.data.length; idx++) {
            var cat = model.data[idx];
            cat.count = 0;
        }
        mainBarView.reset();
    }
};

window.onload = function () {
    controller.init();
};
