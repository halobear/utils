export default class LoadMore {
    loadMoreFn: (() => void) | null;
    constructor(toLoadMore?: () => void);
    destroy(): void;
}
