import * as VUE from 'vue';
/**
 *
 */
export declare enum E_layout {
    auto = "auto",
    horizontal = "horizontal",
    vertical = "vertical"
}
export interface I_binding extends VUE.DirectiveBinding {
    /**
     * vue传进来的值
     */
    value: Value;
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
    layout?: E_layout;
    /**
     * 拖动时的回调函数,回传一个对象,如果返回false时则使拖动失效
     *
     * {
     *      el, //当前被拖动元素
     *      preEl, //相邻的上一个元素
     *      nextEl, //相邻的下一个元素
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
    onResize?: Function;
    /**
     * 默认值 undefined，false 拖动元素计算下一个元素的宽度
     * true 时 拖动元素后不重新计算下一个元素的宽度
     *
     */
    disableNext?: boolean;
}
declare var _default: VUE.Plugin<any[]>;
declare global {
    interface Window {
        VUE_V_SPLITER: any;
    }
}
export default _default;
