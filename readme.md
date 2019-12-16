## `tw-ci-web-staic-demo`

-   没有使用前端框架，原计划使用`react`,但因为新的版本对**ie11**兼容不太好，所以最后决定用`javascript`和`css`，`html`做个静态网站吧

*   `POPUP DIALOG`是纯手写的，同时也实现了文档中的其他三个需求

*   多个`resources tags`页面展示仍然正常

-   `Backend Data`
    与后台交互是利用`sessionStorage`模拟实现的，数据结构和附件中提供的一样。因为用到`sessionStorage`，因此**ie11**下查看时需要在`index.html`的目录起一个`server`才可以正常查看所有功能,我使用的`http-server`这个插件起服务的，其他浏览器可以直接打开静态资源访问该`demo`;
    如果要更改数据，可以在`index.html`中查找关键字`cachesData`，可以切换成其他测试数据，**注意数据结构的变化，没有外层`object`,我直接拿`agents`对应的数组作为`cachesData`的**

-   我只实现了`Desktop HD`这个必选项，其他分辨率下暂未做适配

-   `Chrome`,`Firefox`浏览器下布局，样式，还原度都 OK,`IE 11`下稍微有些瑕疵，自己这里确实能力有限

*   没有使用任何库和框架，甚至是`jQuery`和`normalize`

-   感谢阅读！
