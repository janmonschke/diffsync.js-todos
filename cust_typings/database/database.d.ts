declare var database: database.database;

declare module database {
    export interface database {
        createDatabase(databaseName: string): cradle.CradleDatabase;
    }
}

declare module "database" {
    export = database;
}
