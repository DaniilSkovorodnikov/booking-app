pipeline {
    agent any
    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/SiMiZZZ/TableReservationService.git'
            }
        }
        stage('Deploy') {
            steps {
                    sh 'npm run build'
            }
        }
    }
}
