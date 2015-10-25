declare var diffsyncCouchDb: diffsyncCouchDb.diffsyncCouchDb;

declare module diffsyncCouchDb {
    export interface diffsyncCouchDb {
        new(database: any): diffsyncCouchDb;
        getData(id: string, callback: any): void;
        storeData(id: string, data: {}, callback: any): void;
    }
}

declare module "diffsync-couchdb" {
    export = diffsyncCouchDb;
}
