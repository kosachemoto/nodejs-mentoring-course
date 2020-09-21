// TODO: Сделать нормальную структуру
export const TYPES = {
    ORM: {
        DB_OPTIONS: Symbol('DB_OPTIONS'),
        SEQUELIZE: Symbol('SEQUELIZE'),
        DATA_TYPES: Symbol('DATA_TYPES'),
    },
    DAL: {
        USERS: Symbol('USERS_DAL'),
    },
    MODELS: {
        DAL: {
            USER: Symbol('USER_DAL_MODEL'),
        },
        DOMAIN: {
            USER: Symbol('USER_DOMAIN_MODEL'),
        },
        ORM: {
            USER: Symbol('USER_ORM_MODEL'),
        },
    },
    DATA_MAPPER: {
        USER: Symbol('USER_DATA_MAPPER'),
    },
    REPOSITORIES: {
        USERS: Symbol('USERS_REPOSITORY'),
    },
    USERS: {
        SERVICE: Symbol('USERS_SERVICE'),
        VALIDATION: Symbol('USERS_VALIDATION'),
        SCHEMA: Symbol('USERS_SCHEMA'),
        CONTROLLER: Symbol('USERS_CONTROLLER'),
    },
};