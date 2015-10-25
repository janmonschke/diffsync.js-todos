declare var cradle: cradle.cradle;

declare module cradle {
    export interface cradle {
        new (): cradle;
        host: string;
        port: number;
        auth: any;
        ca: any;
        options: Options;
        setup: (settings: Options) => cradle;
        connect: (...arguments: any[]) => void;
        rawRequest: (options: Options, callback: any) => any;
        close: () => void;
        request: (options: Options, callback: any) => any;
        Connection: Connection;
        escape: (id: string) => string;
        merge: (target: {}, ...arguments: any[]) => {};
    }

    export interface Options {
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

    export interface Connection {
        new (): Connection;
        database(name: string): Database;
        databases: (callback: any) => void;
        config: (callback: any) => void;
        info: (callback: any) => void;
        stats: (callback: any) => void;
        activeTasks: (callback: any) => void;
        uuids: (count: number, callback: any) => void;
        replicate: (options: Options, callback: any) => void;
        _url: (path: string) => string;
        request: any;
    }

    export interface Database extends Documents {
        new (name: string, connection: any): Database;
        connection: any;
        name: string;
        cache: Cache;
        query(options: {}, callback: Function): any /*cradle.Connection.request*/;
        exists(callback: Function): void;
        replicate(target: any, options: Function | {}, callback: Function): void;
        info(callback: Function): void;
        create(callback: Function): void;
        destroy(callback: Function): void;
    }

    export interface Documents {
        head(id: string, callback: Function): void;
        get(id: any | any[], rev: any): void;
        put(id: string, doc: {}, callback: Function): void;
        post(doc: {}, callback: Function): void;
        save(id?: string, rev?: string|{}, ...doc: {}[]): void;
        _save(id: any, rev: any, doc: {} | {}[], callback: Function): void;
        merge(id?: any, ...doc: {}[]): void;
        _merge(id: any, doc: {} | {}[], callback: Function): void;
        update(path: string, id?: string, options?: {}, body?: string): any;
        remove(id: string, rev?: string): void;
    }

    export interface Cache {
        // TODO
    }
}

declare module "cradle" {
    export = cradle;
}
