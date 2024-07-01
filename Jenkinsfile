pipeline {
    agent any
    
    environment {
        // Define environment variables for credentials
        HUB_ORG = credentials('HUB_ORG_DH') // Assuming this is a Username/Password credential
        SFDC_HOST = env.SFDC_HOST_DH
        JWT_KEY_CRED_ID = credentials('JWT_KEY_CRED_ID_DH') // Assuming this is a File credential
        CONNECTED_APP_CONSUMER_KEY = env.CONNECTED_APP_CONSUMER_KEY_DH
        
        // Toolbelt installation
        TOOLBELT = tool 'toolbelt'
    }
    
    stages {
        stage('Checkout Source') {
            steps {
                // Checkout the source code from SCM (Git, SVN, etc.)
                checkout scm
            }
        }
        
        stage('Deploy Code') {
            steps {
                script {
                    // Authenticate with Salesforce using JWT
                    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
                        def authCmd = "${TOOLBELT} auth:jwt:grant " +
                                      "--client-id ${CONNECTED_APP_CONSUMER_KEY} " +
                                      "--username ${HUB_ORG} " +
                                      "--jwt-key-file \${jwt_key_file} " +
                                      "--set-default-dev-hub " +
                                      "--instance-url ${SFDC_HOST}"
                        
                        // Execute authentication command
                        def rc
                        if (isUnix()) {
                            rc = sh returnStatus: true, script: authCmd
                        } else {
                            rc = bat returnStatus: true, script: authCmd
                        }
                        
                        if (rc != 0) {
                            error 'Hub org authorization failed'
                        } else {
                            echo 'Successfully authorized'
                        }
                    }
                    
                    // Deploy Salesforce source using Salesforce CLI
                    def deployCmd = "${TOOLBELT} force:source:deploy -x manifest/package.xml -u ${HUB_ORG}"
                    def rmsg
                    if (isUnix()) {
                        rmsg = sh returnStdout: true, script: deployCmd
                    } else {
                        rmsg = bat returnStdout: true, script: deployCmd
                    }
                    
                    // Print deployment message
                    echo 'Hello from a Job DSL script!'
                    echo rmsg
                }
            }
        }
    }
}
