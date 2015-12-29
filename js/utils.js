(function (window, document, undefined) {

    Object.prototype.toPosition = function () {
        return [this.x, this.y].join();
    };

})(window, document);