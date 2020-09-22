enum Environments {
    local_environment = 'local',
    staging_environment = 'staging'
}

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getPort(): Number {
        if (this.environment === Environments.staging_environment) {
            return 8081;
        } else {
            return 3000;
        }
    }

    getDBName(): String {
        if (this.environment === Environments.staging_environment) {
            return 'db_user_management_staging';
        } else {
            return 'db_user_management_local';
        }
    }

    getHost(): String {
        if (this.environment === Environments.staging_environment) {
            return 'staging_location/';
        } else {
            return 'localhost/';
        }
    }
}

export default new Environment(Environments.local_environment);
