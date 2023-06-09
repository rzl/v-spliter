var E_layout;
(function (E_layout) {
    E_layout["auto"] = "auto";
    E_layout["horizontal"] = "horizontal";
    E_layout["vertical"] = "vertical"; //竖向
})(E_layout || (E_layout = {}));
var defaultDisableNext = false;
var install = function install(Vue, opt) {
    if (opt === void 0) { opt = {
        /**
         * 指令的名称 到时在vue 里面使用 v-spliter
         */
        name: 'spliter',
        defaultDisableNext: false
    }; }
    defaultDisableNext = opt.defaultDisableNext;
    if (Number(Vue.version.charAt(0)) >= 3) {
        Vue.directive(opt.name, directive);
    }
    else {
        Vue.directive(opt.name, { inserted: directive });
    }
};
var directive = function (el, binding) {
    var nextEl = el.nextElementSibling;
    if (!nextEl)
        return;
    var preEl = el.previousElementSibling;
    if (!preEl)
        return;
    var parentEl = el.parentElement;
    if (!parent)
        return;
    var active = false;
    var buttonDown = false;
    var offset = 0;
    var offsetStyle = 0;
    var attr = 'auto';
    var elOffset = 0;
    // el.style.background = 'red'
    var _value = { layout: E_layout.auto };
    var value = binding.value ? Object.assign(_value, binding.value) : _value;
    var disableNext = value.disableNext === undefined ? defaultDisableNext : value.disableNext;
    var layout = value.layout;
    function testLayout() {
        var elNextRect = nextEl.getClientRects()[0];
        var elRect = el.getClientRects()[0];
        if (value.layout == E_layout.auto) {
            if (elRect.right > elNextRect.x) {
                layout = E_layout.vertical;
            }
            else {
                layout = E_layout.horizontal;
                attr = 'width';
            }
        }
        if (layout == E_layout.vertical) {
            attr = 'height';
            el.style.cursor = 'row-resize';
            elOffset = el.getClientRects()[0].height;
        }
        else {
            attr = 'width';
            el.style.cursor = 'col-resize';
            elOffset = el.getClientRects()[0].width;
        }
    }
    testLayout();
    var onstart = function (event) {
        testLayout();
        active = true;
        buttonDown = true;
        offsetStyle = layout == E_layout.vertical ? preEl.getClientRects()[0].height : preEl.getClientRects()[0].width;
        offset = layout == E_layout.vertical ? event.clientY : event.clientX;
    };
    var onmove = function (event) {
        if (active && buttonDown) {
            var preStyle = ((layout == E_layout.vertical ? event.clientY : event.clientX) - offset + offsetStyle);
            var parentStyle = parentEl.getClientRects()[0][attr];
            var nextStyle = parentStyle - preStyle - elOffset;
            if (value.onResize) {
                var res = value.onResize({
                    el: el,
                    preEl: preEl,
                    nextEl: nextEl,
                    offset: offset,
                    layout: layout,
                    parentEl: parentEl,
                    perElRect: preEl.getClientRects()[0],
                    nextElRect: nextEl.getClientRects()[0],
                    parentElRect: parentEl.getClientRects()[0],
                    parentStyle: parentStyle,
                    preStyle: preStyle,
                    nextStyle: nextStyle
                });
                if (res === false) {
                    return;
                }
            }
            preEl.style[attr] = preStyle + 'px';
            if (!disableNext) {
                nextEl.style[attr] = nextStyle + 'px';
            }
        }
    };
    var onend = function (event) {
        active = false;
        buttonDown = false;
        offsetStyle = layout == E_layout.vertical ? preEl.getClientRects()[0].height : preEl.getClientRects()[0].width;
        offset = layout == E_layout.vertical ? event.clientY : event.clientX;
    };
    el.onmousedown = function (event) {
        onstart(event);
    };
    el.onmousemove = function () {
        testLayout();
    };
    parentEl.onmousemove = function (event) {
        event.preventDefault();
        if (event.buttons === 0 || event.which === 0) {
            active = false;
        }
        onmove(event);
    };
    parentEl.onmouseup = function (event) {
        onend(event);
    };
    el.ontouchstart = function (_event) {
        var event = _event.targetTouches[0];
        onstart(event);
    };
    parentEl.ontouchmove = function (_event) {
        _event.preventDefault();
        var event = _event.targetTouches[0];
        onmove(event);
    };
    parentEl.ontouchend = function (_event) {
        var event = _event.targetTouches[0];
        onend(event);
    };
    el.onpointerdown = function (event) {
        onstart(event);
    };
    parentEl.onpointermove = function (event) {
        event.preventDefault();
        onmove(event);
    };
    parentEl.onpointerup = function (event) {
        onend(event);
    };
};
var _default = {
    version: '1.0.0',
    install: install,
    directive: directive
};
if (window) {
    window.VUE_V_SPLITER = _default;
}

export { E_layout, _default as default };
