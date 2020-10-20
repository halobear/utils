declare function stop(): void;
declare function speak(text: string): void;
declare function onend(callback?: Function): void;
declare const _default: {
    speak: typeof speak;
    stop: typeof stop;
    onend: typeof onend;
};
export default _default;
