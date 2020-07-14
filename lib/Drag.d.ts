interface D {
    el: HTMLElement;
    change: Function;
    parentNode: HTMLElement;
}
export default class Drag {
    el: D["el"];
    parentNode: D["parentNode"];
    onchange: D["change"];
    constructor(el: D["el"], onchange?: D["change"], parentNode?: D["parentNode"]);
    init(el: D["el"], onchange: D["change"]): void;
    destroy(): void;
}
export {};
