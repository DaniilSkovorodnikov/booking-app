pipeline {
    agent any
    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/DaniilSkovorodnikov/booking-app.git'
            }
        }
        stage('Deploy') {
            steps {
                    sh 'npm run build'
            }
        }
    }
}
