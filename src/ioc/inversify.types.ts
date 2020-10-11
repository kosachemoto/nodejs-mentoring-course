export const TYPE = {
    APPLICATION: {
        MODE: Symbol(),
    },
    WINSTON: {
        LOGGER: Symbol(),
        STREAM: Symbol(),
    },
    ROUTE: {
        USER: Symbol('USER_ROUTE'),
    },
    CONTROLLER: {
        USER: Symbol('USER_CONTROLLER'),
        GROUP: Symbol('GROUP_CONTROLLER'),
    },
    VALIDATION: {
        RULES: {
            USER: Symbol('USER_VALIDATION_RULE'),
        },
        SCHEMA: {
            USER: Symbol('USER_VALIDATION_SCHEMA'),
        },
    },
    MODEL: {
        DAL: {
            GROUP: Symbol('GROUP_DAL_MODEL'),
            USER: Symbol('USER_DAL_MODEL'),
        },
        DOMAIN: {
            USER: Symbol('USER_DOMAIN_MODEL'),
        },
        DTO: {
            USER: Symbol('USER_DTO_MODEL'),
            GROUP: Symbol('GROUP_DTO_MODEL'),
        },
    },
    DATA_MAPPER: {
        USER: Symbol('USER_DATA_MAPPER'),
    },
    SERVICE: {
        USERS: Symbol('USERS_SERVICE'),
        GROUPS: Symbol('GROUPS_SERVICE'),
    },
    DAL: {
        USERS: Symbol('USERS_DAL'),
        GROUPS: Symbol('GROUPS_DAL'),
    },
    ORM: {
        DB_OPTIONS: Symbol('DB_OPTIONS'),
        SEQUELIZE: Symbol('SEQUELIZE'),
        DATA_TYPES: Symbol('DATA_TYPES'),
    },
};