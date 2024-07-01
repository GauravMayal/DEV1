pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    triggers {
        github {
            pullRequest {
                branches = '*'
            }
        }
    }

    environment {
        SFDC_USERNAME = credentials('SFDC_USERNAME')
        HUB_ORG = env.HUB_ORG_DH
        SFDC_HOST = env.SFDC_HOST_DH
        JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
        CONNECTED_APP_CONSUMER_KEY = env.CONNECTED_APP_CONSUMER_KEY_DH
        TOOLBELT = tool 'toolbelt'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                script {
                    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
                        sh """
                        \${TOOLBELT} auth:jwt:grant \
                            --client-id \${CONNECTED_APP_CONSUMER_KEY} \
                            --username \${HUB_ORG} \
                            --jwt-key-file \${jwt_key_file} \
                            --set-default-dev-hub \
                            --instance-url \${SFDC_HOST}
                        """
                        sh "\${TOOLBELT} force:source:deploy -x manifest/package.xml -u \${HUB_ORG}"
                    }
                }
            }
        }
    }
}
