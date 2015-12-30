(function (window, document, undefined) {

    Object.prototype.toPosition = function () {
        return [this.x, this.y].join();
    };

    Element.prototype.closest = function (selector) {
        var func = ""
            ,el = this;

        // find vendor prefix
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector']
            .some(function (fn) {
                if ('function' === typeof document.body[fn]) {
                    func = fn;
                    return true;
                }
                return false;
            });

        // traverse parents
        while (el) {
            var parent = el.parentElement;
            if (parent && parent[func](selector)) {
                return parent;
            }
            el = parent;
        }

        return undefined;
    }

})(window, document);