// 在你的 HTML 页面底部添加
document.addEventListener('contextmenu', event => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});