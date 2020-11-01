export const TYPE = {
    AUTHENTICATION: {
        OPTIONS: Symbol(),
    },
    APPLICATION: {
        MODE: Symbol(),
    },
    MORGAN: {
        LOGGER: Symbol(),
    },
    WINSTON: {
        LOGGER: Symbol(),
        STREAM: Symbol(),
    },
    ROUTE: {
        USER: Symbol(),
    },
    CONTROLLER: {
        AUTHENTICATION: Symbol(),
        USER: Symbol(),
        GROUP: Symbol(),
    },
    VALIDATION: {
        RULES: {
            AUTHENTICATION: Symbol(),
            USER: Symbol(),
        },
        SCHEMA: {
            AUTHENTICATION: Symbol(),
            USER: Symbol(),
        },
    },
    MODEL: {
        DAL: {
            GROUP: Symbol(),
            USER: Symbol(),
        },
        DOMAIN: {
            USER: Symbol(),
        },
        DTO: {
            USER: Symbol(),
            GROUP: Symbol(),
        },
    },
    DATA_MAPPER: {
        USER: Symbol(),
    },
    SERVICE: {
        AUTHENTICATION: Symbol(),
        USERS: Symbol(),
        GROUPS: Symbol(),
    },
    DAL: {
        USERS: Symbol(),
        GROUPS: Symbol(),
    },
    ORM: {
        DB_OPTIONS: Symbol(),
        SEQUELIZE: Symbol(),
        DATA_TYPES: Symbol(),
    },
};