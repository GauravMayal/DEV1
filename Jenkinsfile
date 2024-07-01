#!groovy
import groovy.json.JsonSlurperClassic

node {
    def BUILD_NUMBER = env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR = "tests/${BUILD_NUMBER}"
    def SFDC_USERNAME

    def HUB_ORG = env.HUB_ORG_DH
    def SFDC_HOST = env.SFDC_HOST_DH
    def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
    def CONNECTED_APP_CONSUMER_KEY = env.CONNECTED_APP_CONSUMER_KEY_DH

    println 'KEY IS' 
    println JWT_KEY_CRED_ID
    println HUB_ORG
    println SFDC_HOST
    println CONNECTED_APP_CONSUMER_KEY
    
    def toolbelt = tool 'toolbelt'

    stage('checkout source') {
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Deploy Code') {
            def authCmd
            if (isUnix()) {
                authCmd = "${toolbelt} auth:jwt:grant --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwt-key-file ${jwt_key_file} --set-default-dev-hub --instance-url ${SFDC_HOST}"
                rc = sh returnStatus: true, script: authCmd
            } else {
                bat "${toolbelt} update"
                authCmd = "${toolbelt} auth:jwt:grant --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwt-key-file ${jwt_key_file} --set-default-dev-hub --instance-url ${SFDC_HOST}"
                rc = bat returnStatus: true, script: authCmd
            }

            if (rc != 0) {
                error 'Hub org authorization failed'
            } else {
                println 'Successfully authorized'
            }

            println rc
            
            def deployCmd
            if (isUnix()) {
                deployCmd = "${toolbelt} force:source:deploy -x manifest/package.xml -u ${HUB_ORG}"
                rmsg = sh returnStdout: true, script: deployCmd
            } else {
                deployCmd = "${toolbelt} force:source:deploy -x manifest/package.xml -u ${HUB_ORG}"
                rmsg = bat returnStdout: true, script: deployCmd
            }

            println('Hello from a Job DSL script!')
            println(rmsg)
        }
    }
}
