import { InPageDebug } from './in-page-debug-component/in-page-debug';

const ipd = new InPageDebug();
function main() {
    ipd.applyToDOM();
}
window.addEventListener('load', ev => {
    main();
});
