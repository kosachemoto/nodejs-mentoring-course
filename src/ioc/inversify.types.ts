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
        USER: Symbol(),
        GROUP: Symbol(),
    },
    VALIDATION: {
        RULES: {
            USER: Symbol(),
        },
        SCHEMA: {
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