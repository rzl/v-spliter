import * as VUE from 'vue'
import { Directive } from 'vue';

/**
 * 
 */
export enum E_layout {
    auto = 'auto', //自动判断
    horizontal = 'horizontal', //横向
    vertical = 'vertical'  //竖向
}


export interface I_binding extends VUE.DirectiveBinding {
    /**
     * vue传进来的值
     */
    value: Value
}

/**
 * vue传进来的值
 */
export interface Value {
    /**
     * 布局， 
     * auto 自动判断，根据允许拖动的元素右上角坐标与被拖动的元素下一个元素左上角进行判断
     * horizontal 横向布局
     * vertical 垂直布局
     */
    layout?: E_layout,
    /**
     * 拖动时的回调函数,回传一个对象,如果返回false时则使拖动失效
     * 
     * { 
     *      el, //当前被拖动元素
     *      preEl, //相邻的上一个元素
     *      nextEl, //相邻的下一个元素
     *      parentEl, //父元素
     *      offset, //拖动距离
     *      layout //布局方向 horizontal，vertical
     *      perElRect: preEl.getClientRects()[0],
     *      nextElRect: nextEl.getClientRects()[0],
     *      parentElRect: parentEl.getClientRects()[0],
     *      parentStyle, //垂直时为父元素的高度，否则为宽度
     *      preStyle,   //垂直时为上一个相邻元素的高度，否则为宽度
     *      nextStyle  //垂直时下一个相邻元素的高度，否则为宽度
     * }
     * 
     */
    onResize?: Function,
    /**
     * 默认值 undefined，false 拖动元素计算下一个元素的宽度
     * true 时 拖动元素后不重新计算下一个元素的宽度
     * 
     */
    disableNext?: boolean
}
var defaultDisableNext = false
var install = function install(Vue: VUE.App<Element>, opt = {
    /**
     * 指令的名称 到时在vue 里面使用 v-spliter
     */
    name: 'spliter',
    defaultDisableNext: false
}) {
    defaultDisableNext = opt.defaultDisableNext
    if (Number(Vue.version.charAt(0)) >= 3) {

        Vue.directive(opt.name, directive)
    } else {
        Vue.directive(opt.name, {inserted: directive} as any)
    }
}

var directive = <Directive>function (el: HTMLElement, binding: I_binding) {
    var nextEl = <HTMLElement>el.nextElementSibling
    if (!nextEl) return
    var preEl = <HTMLElement>el.previousElementSibling
    if (!preEl) return
    var parentEl = <HTMLElement>el.parentElement
    if (!parent) return

    var active = false
    var buttonDown = false
    var offset = 0
    var offsetStyle = 0
    var attr = 'auto'
    var elOffset = 0

    // el.style.background = 'red'

    var _value = <Value>{ layout: E_layout.auto }
    var value = binding.value ? Object.assign(_value, binding.value) : _value

    var disableNext = value.disableNext===undefined ? defaultDisableNext : value.disableNext
    var layout = value.layout

    function testLayout() {
        var elNextRect = nextEl.getClientRects()[0]
        var elRect = el.getClientRects()[0]
        if (value.layout == E_layout.auto) {
            if (elRect.right > elNextRect.x) {
                layout = E_layout.vertical
            } else {
                layout = E_layout.horizontal
                attr = 'width'
            }
        }
        if (layout == E_layout.vertical) {
            attr = 'height'
            el.style.cursor = 'row-resize'
            elOffset = el.getClientRects()[0].height

        } else {
            attr = 'width'
            el.style.cursor = 'col-resize'
            elOffset = el.getClientRects()[0].width
        }
    }

    testLayout()

    var onstart = (event : Touch | MouseEvent) => {
        testLayout()
        active = true
        buttonDown = true
        offsetStyle = layout == E_layout.vertical ? preEl.getClientRects()[0].height : preEl.getClientRects()[0].width
        offset = layout == E_layout.vertical ? event.clientY : event.clientX
    }

    var onmove = (event : Touch | MouseEvent) => {
        if (active && buttonDown) {
            var preStyle = ((layout == E_layout.vertical ? event.clientY : event.clientX) - offset + offsetStyle)
            var parentStyle = parentEl.getClientRects()[0][attr]
            var nextStyle =  parentStyle - preStyle - elOffset
            if (value.onResize) {
                var res = value.onResize({
                    el, preEl, nextEl, offset, layout, parentEl,
                    perElRect: preEl.getClientRects()[0],
                    nextElRect: nextEl.getClientRects()[0],
                    parentElRect: parentEl.getClientRects()[0],
                    parentStyle,
                    preStyle,
                    nextStyle
                })
                if (res === false) {
                    return
                }
            }
            preEl.style[attr] = preStyle + 'px'
            if (!disableNext) {
                nextEl.style[attr] = nextStyle + 'px'
            }
        }
    }

    var onend = (event : Touch | MouseEvent) => {
        active = false
        buttonDown = false
        offsetStyle = layout == E_layout.vertical ? preEl.getClientRects()[0].height : preEl.getClientRects()[0].width
        offset = layout == E_layout.vertical ? event.clientY : event.clientX
    }


    el.onmousedown = (event) => {
        onstart(event)
    }

    el.onmousemove = () => {
        testLayout()
    }

    parentEl.onmousemove = (event) => {
        event.preventDefault()
        if (event.buttons === 0 || event.which === 0) {
            active = false
        }
        onmove(event)
    }

    parentEl.onmouseup = (event) => {
        onend(event)
    }

    el.ontouchstart = (_event) => {
        var event = _event.targetTouches[0];
        onstart(event)
    }

    parentEl.ontouchmove = (_event) => {
        _event.preventDefault()
        var event = _event.targetTouches[0];
        onmove(event)
    }

    parentEl.ontouchend = (_event) => {
        var event = _event.targetTouches[0];
        onend(event)
    }

    el.onpointerdown = (event) => {
        onstart(event)
    }

    parentEl.onpointermove = (event) => {
        event.preventDefault()
        onmove(event)
    }

    parentEl.onpointerup = (event) => {
        onend(event)
    }
}
var _default = {
    version: '1.0.0',
    install,
    directive
} as VUE.Plugin

declare global {
    interface Window {
        VUE_V_SPLITER
    }
  }

if (window) {window.VUE_V_SPLITER = _default}
export default _default