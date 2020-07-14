interface ShareConfig {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
}
interface WxConfig {
    debug: boolean;
    appId: string;
    timestamp: string | number;
    nonceStr: string;
    signature: string;
    jsApiList: string[];
}
declare const _default: (userShareData: ShareConfig, wxConfig: WxConfig) => Promise<void>;
/**
 * 分享内容，分享配置
 * @param {Object} userShareData 文件对象
 * @param {Object} wxConfig 分享配置
 */
export default _default;
