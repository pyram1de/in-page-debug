import html from './in-page-debug.html';
import './in-page-debug.less';

declare var window: any;

export class InPageDebug {
    private minimizeBtn: any;
    private expandBtn: any;
    private content: any;
    private mainElement: any;
    private consoleLog: any;
    private consoleClear: any;
    private consoleError: any;
    private domReady = false;

    private _log: any[] = [];
    private _errorLog: any[] = [];
    set log(value: any) {
        this._log.push(value);
        if(this.domReady) {
            const loop = [...this._log];
            loop.forEach(value1 => {
                this.processLog(value1);
                this._log.splice(this._log.indexOf(value1), 1);
            });
        }
    }

    processLog(value: any) {
        let data = "";
        let elementType = "div";
        const t = typeof value;
        switch (t) {
            case "string":
                data = value;
                break;
            case "object":
                elementType = "pre";
                data = JSON.stringify(value, null, 1);
                break;
            default:
                try {
                    data = value.toString();
                } catch (e) {
                    data = value;
                }
                break;
        }
        let el = document.createElement(elementType);
        el.innerHTML = data;
        this.content.prepend(el);
    }

    set error(value: any) {
        this._errorLog.push(value);
        if(this.domReady) {
            const loop = [...this._log];
            loop.forEach(value1 => {
                this.processError(value1);
                this._log.splice(this._log.indexOf(value1), 1);
            });
        }
    }

    processError(value:any) {
        let data = "";
        let elementType = "div";
        const t = typeof value;
        switch (t) {
            case "string":
                data = value;
                break;
            case "object":
                elementType = "pre";
                data = JSON.stringify(value, null, 1);
                break;
            default:
                try {
                    data = value.toString();
                } catch (e) {
                    data = value;
                }
                break;
        }
        let el = document.createElement(elementType);
        el.setAttribute("class", "error");
        el.innerHTML = data;
        this.content.prepend(el);
    }

    constructor() {
        console.log('hello');
        window["debug"] = this;
        this.overrideLog();
    }

    applyToDOM() {
        const d = document.createElement('div');
        d.innerHTML = html;
        document.body.appendChild(d);
        this.mainElement = document.getElementById("debug-window") as HTMLElement;
        this.minimizeBtn = document.getElementById("debug-window-pane-minimise") as HTMLButtonElement;
        this.expandBtn = document.getElementById("debug-window-pane-expand") as HTMLButtonElement;
        this.content = document.getElementById("debug-window-content") as HTMLElement;
        this.minimizeBtn.addEventListener("click", () => {
            this.content.setAttribute("class", "hidden");
            this.expandBtn.setAttribute("class", "");
            this.minimizeBtn.setAttribute("class", "hidden");
        });
        this.expandBtn.addEventListener("click", () => {
            this.content.setAttribute("class", "");
            this.expandBtn.setAttribute("class", "hidden");
            this.minimizeBtn.setAttribute("class", "");
        });
        this.domReady = true;
    }

    private hideConsole() {
        this.mainElement.setAttribute("class", "hidden");
    }

    private showConsole() {
        this.mainElement.setAttribute("class", "");
    }

    private clearConsole() {

    }

    private overrideLog() {
        this.consoleLog = window['console'].log;
        this.consoleClear = window['console'].clear;
        this.consoleError = window['console'].error;
        const self = this;
        window['console'].log = function() {
            const args = Array.from(arguments);
            args.reverse().forEach(arg => self.log = arg);
            self.consoleLog.apply(console, args);
        }
        window['console'].error = function () {
            const args = Array.from(arguments);
            args.reverse().forEach(arg => self.error = arg);
            self.consoleError.apply(console, args);
        }
        window['console'].show = () => {
            this.showConsole();
        }
        window['console'].hide = () => {
            this.hideConsole();
        }
        window['console'].clear = function() {
            self._log = [];
            self.content.innerHTML =  "";
            self.consoleClear.apply(console);
        }
    }
}
