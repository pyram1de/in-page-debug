import { InPageDebug } from './in-page-debug-component/in-page-debug';

function main() {
    new InPageDebug();
}

window.addEventListener('load', ev => {
    main();
});
