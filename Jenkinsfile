pipeline {
    agent any
    stages {
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
        stage('Test') {
            steps {
                bat 'jenkins\\scripts\\test.bat'
            }
        }
        stage('Deploy') {
            steps {
                // Add your deployment steps here
                // For example, copying build files to a server or deploying to a cloud service
                bat 'scp -r dist/* user@server:/path/to/deploy'
            }
        }
        stage('Deliver') { 
            steps {
                bat 'jenkins\\scripts\\deliver.bat' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                bat 'jenkins\\scripts\\kill.bat' 
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished'
        }
    }
}