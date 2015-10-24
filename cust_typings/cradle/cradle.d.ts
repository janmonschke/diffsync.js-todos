declare var cradle: cradle.cradle;

declare module cradle {
    export interface cradle {
        new(): cradle;
        host: string;
        port: number;
        auth: any;
        ca: any;
        options: CradleOptions;
        setup: (settings: CradleOptions) => cradle;
        connect: (...arguments: any[]) => void;
        rawRequest: (options: CradleOptions, callback: any) => any;
        close: () => void;
        request: (options: CradleOptions, callback: any) => any;
        Connection: CradleConnection;
        escape: (id: string) => string;
        merge: (target: {}, ...arguments: any[]) => {};
    }

    export interface CradleOptions {
        cache?: boolean;
        raw?: boolean;
        secure?: boolean;
        retries?: number;
        retryTimeout?: number;
        forceSave?: boolean;
        headers?: {};
        protocol?: string;
        host?: string;
        port?: number;
        auth?: {
            username?: string;
            password?: string;
        };
    }

    export interface CradleConnection {
        new(): CradleConnection;
        database: (name: string) => CradleDatabase;
        databases: (callback: any) => void;
        config: (callback: any) => void;
        info: (callback: any) => void;
        stats: (callback: any) => void;
        activeTasks: (callback: any) => void;
        uuids: (count: number, callback: any) => void;
        replicate: (options: CradleOptions, callback: any) => void;
        _url: (path: string) => string;
    }

    export interface CradleDatabase {
    }
}

declare module "cradle" {
    export = cradle;
}
