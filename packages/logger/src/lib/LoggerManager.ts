import Logger, { LOGS_LEVELS, LOG_OPTIONS, LogsLevel } from './Logger';

export default class LoggerManager {
    private loggerInstances: { [index: string]: Logger } = {};
    private static instance: LoggerManager;

    private register(
        name: string,
        level: LOGS_LEVELS,
        options: LOG_OPTIONS = {
            style: {
                TRACE: 'color: white; background-color: #073b4c; padding: 2px 4px; border-radius: 2px',
                DEBUG: 'color: #111; background-color: #ffd166; padding: 2px 4px; border-radius: 2px',
                INFO: 'color: white; background-color: #118ab2; padding: 2px 4px; border-radius: 2px',
                ERROR: 'color: #111; background-color: #ef476f; padding: 2px 4px; border-radius: 2px',
                WARN: 'color: #111; background-color: #f78c6b; padding: 2px 4px; border-radius: 2px',
                TIME: 'color: white; background-color: #06d6a0; padding: 2px 4px; border-radius: 2px',
                OFF: 'color: white; background-color: #4a81d4; padding: 2px 4px; border-radius: 2px',
            },
        }
    ) {
        this.loggerInstances[name] = new Logger(name, LogsLevel[level], options);
    }

    private get(name: string) {
        return this.loggerInstances[name];
    }

    static get(name: string) {
        return LoggerManager.getInstance().get(name);
    }

    static register(name: string, level: LOGS_LEVELS) {
        LoggerManager.getInstance().register(name, level);
    }

    private static getInstance() {
        if (!LoggerManager.instance) {
            LoggerManager.instance = new LoggerManager();
        }

        return LoggerManager.instance;
    }
}
