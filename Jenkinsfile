pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Ensure this matches the name you set in Jenkins
        maven 'Maven' // Ensure this matches the name you set in Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/adwini/cafe-front.git'
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
            deploy adapters: [tomcat10(credentialsId: 'admin', path: '', url: 'http://localhost:9090/')], contextPath: '/', war: '**/target/*.war'
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished'
        }
    }
}