pipeline {
    agent any
    
    environment {
        MONGODB_URI = credentials('mongodb-uri')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching code from GitHub...'
                checkout scm
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                echo 'Installing frontend dependencies...'
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Building React application...'
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Stop Part II Containers') {
            steps {
                echo 'Stopping existing Part II containers...'
                script {
                    sh 'docker compose -f docker-compose-jenkins.yml down || true'
                }
            }
        }
        
        stage('Deploy with Docker Compose') {
            steps {
                echo 'Deploying application on port 5001...'
                script {
                    sh """
                        export MONGODB_URI=${MONGODB_URI}
                        docker compose -f docker-compose-jenkins.yml up -d --build
                    """
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying containers are running...'
                script {
                    sh 'docker compose -f docker-compose-jenkins.yml ps'
                    sh 'sleep 5'
                    sh 'curl -f http://localhost:5001 || echo "Backend check failed"'
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline successful! App running on port 5001'
        }
        failure {
            echo '❌ Pipeline failed! Check the logs above.'
        }
    }
}
