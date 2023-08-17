type LOG_LEVEL = { value: number; name: LOGS_LEVELS };
export const LogsLevel: { [key in LOGS_LEVELS]: LOG_LEVEL } = {
    TRACE: { value: 1, name: 'TRACE' },
    DEBUG: { value: 2, name: 'DEBUG' },
    INFO: { value: 3, name: 'INFO' },
    TIME: { value: 4, name: 'TIME' },
    WARN: { value: 5, name: 'WARN' },
    ERROR: { value: 6, name: 'ERROR' },
    OFF: { value: 99, name: 'OFF' },
} as const;

export type LOG_OPTIONS = {
    style: { [key in LOGS_LEVELS]: string };
};
export type LOGS_LEVELS = 'TRACE' | 'DEBUG' | 'INFO' | 'TIME' | 'WARN' | 'ERROR' | 'OFF';

export default class Logger {
    public static readonly TRACE = LogsLevel.TRACE;
    public static readonly DEBUG = LogsLevel.DEBUG;
    public static readonly INFO = LogsLevel.INFO;
    public static readonly TIME = LogsLevel.TIME;
    public static readonly WARN = LogsLevel.WARN;
    public static readonly ERROR = LogsLevel.ERROR;
    public static readonly OFF = LogsLevel.ERROR;

    constructor(
        private readonly moduleName: string,
        private readonly logLevel: LOG_LEVEL,
        private readonly options: LOG_OPTIONS
    ) {}

    private enableFor(level: LOG_LEVEL) {
        return level.value >= (this.logLevel as LOG_LEVEL).value;
    }
    trace(...args: any) {
        this.invoke(Logger.TRACE, args);
    }
    debug(...args: any) {
        this.invoke(Logger.DEBUG, args);
    }
    info(...args: any) {
        this.invoke(Logger.INFO, args);
    }
    warn(...args: any) {
        this.invoke(Logger.WARN, args);
    }
    error(...args: any) {
        this.invoke(Logger.ERROR, args);
    }
    private invoke(level: LOG_LEVEL, args: any) {
        if (!this.enableFor(level)) return;
        this.log(args, level);
    }

    private log(message: any[], logLevel: LOG_LEVEL) {
        switch (logLevel.value) {
            case LogsLevel.WARN.value:
                console.warn(`%c${this.moduleName}`, this.options.style[logLevel.name], message.join(' '));
                break;
            case LogsLevel.ERROR.value:
                console.error(`%c${this.moduleName}`, this.options.style[logLevel.name], message.join(' '));
                break;
            case LogsLevel.INFO.value:
                console.info(`%c${this.moduleName}`, this.options.style[logLevel.name], message.join(' '));
                break;
            case LogsLevel.DEBUG.value:
                console.debug(`%c${this.moduleName}`, this.options.style[logLevel.name], message.join(' '));
                break;
            case LogsLevel.TRACE.value:
                console.trace(`%c${this.moduleName}`, this.options.style[logLevel.name], message.join(' '));
                break;
            default:
                console.log(`%c${this.moduleName}`, this.options.style[logLevel.name], message.join(' '));
        }
    }
}
