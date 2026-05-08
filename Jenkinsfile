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
        
        stage('Stop Existing Containers') {
            steps {
                echo 'Stopping existing containers...'
                script {
                    sh 'docker compose down || true'
                }
            }
        }
        
        stage('Deploy with Docker Compose') {
            steps {
                echo 'Deploying application...'
                script {
                    sh '''
                        docker compose up -d --build
                        sleep 15
                    '''
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying containers are running...'
                script {
                    sh 'docker compose ps'
                    sh 'curl -f http://localhost:8081 || echo "Frontend check failed"'
                }
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                echo 'Running 15 Selenium test cases...'
                script {
                    sh '''
                        rm -rf /tmp/adorno-tests
                        git clone https://github.com/umamah-waqar/adorno-tests.git /tmp/adorno-tests
                        cd /tmp/adorno-tests
                        
                        docker run --rm \
                            -v $PWD:/tests \
                            -e APP_URL=http://13.127.212.177:8081 \
                            --network host \
                            python:3.9-slim \
                            bash -c "
                                pip install selenium && \
                                apt-get update && \
                                apt-get install -y wget gnupg unzip && \
                                wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
                                echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google.list && \
                                apt-get update && \
                                apt-get install -y google-chrome-stable && \
                                wget -N https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/linux64/chromedriver-linux64.zip && \
                                unzip -o chromedriver-linux64.zip && \
                                mv chromedriver-linux64/chromedriver /usr/local/bin/ && \
                                chmod +x /usr/local/bin/chromedriver && \
                                cd /tests && \
                                python test_adorno.py
                            "
                    '''
                }
            }
            post {
                always {
                    script {
                        def email = sh(script: "git --no-pager show -s --format='%ae' HEAD", returnStdout: true).trim()
                        emailext (
                            subject: "Selenium Test Results: ${env.JOB_NAME} - Build ${env.BUILD_NUMBER}",
                            body: "Tests completed. Check ${env.BUILD_URL}",
                            to: email
                        )
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline successful! App running on port 8081'
        }
        failure {
            echo '❌ Pipeline failed! Check the logs above.'
        }
    }
}
