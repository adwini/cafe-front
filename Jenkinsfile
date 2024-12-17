pipeline {
    agent any
    tools {
        nodejs 'NodeJS 14' // Ensure this matches the name you set in Jenkins
        maven 'Maven 3.6.3' // Ensure this matches the name you set in Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/adwini/cafe-front.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Package') {
            steps {
                bat 'mvn clean package'
            }
        }
        stage('Deploy') {
            steps {
                deploy adapters: [tomcat9(credentialsId: 'admin', path: '', url: 'http://localhost:9090/')], contextPath: '/', war: '**/target/*.war'
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished'
        }
    }
}