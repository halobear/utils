/**
 * 动态加载script
 * @param src {string}
 * @returns {promise}
 */
declare function createScripts(src: string): Promise<string | Error>;
export default createScripts;
