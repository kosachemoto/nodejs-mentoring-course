export const TYPE = {
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
        APPLICATION: Symbol(),
        USER: Symbol(),
        GROUP: Symbol(),
    },
    VALIDATION: {
        RULES: {
            APPLICATION: Symbol(),
            USER: Symbol(),
        },
        SCHEMA: {
            APPLICATION: Symbol(),
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
        APPLICATION: Symbol(),
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