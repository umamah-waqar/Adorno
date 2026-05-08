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
                    sh """
                        export MONGODB_URI=${MONGODB_URI}
                        docker compose up -d --build
                    """
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying containers are running...'
                script {
                    sh 'docker compose ps'
                    sh 'sleep 10'
                    sh 'curl -f http://localhost:5001 || echo "Backend check failed"'
                    sh 'curl -f http://localhost:8081 || echo "Frontend check failed"'
                }
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                echo 'Running 15 Selenium test cases...'
                script {
                    // CHANGE THIS TO YOUR ACTUAL GITHUB USERNAME
                    def TEST_REPO = "https://github.com/YOUR_USERNAME/adorno-tests.git"
                    
                    sh """
                        rm -rf /tmp/adorno-tests
                        git clone ${TEST_REPO} /tmp/adorno-tests
                        cd /tmp/adorno-tests
                        
                        # CHANGE THIS TO YOUR ACTUAL EC2 PUBLIC IP
                        export APP_URL="http://YOUR_EC2_PUBLIC_IP:8081"
                        
                        docker run --rm \
                            -v \$PWD:/tests \
                            -e APP_URL=\${APP_URL} \
                            --network host \
                            python:3.9-slim \
                            bash -c "
                                pip install selenium && \\
                                apt-get update && \\
                                apt-get install -y wget gnupg unzip && \\
                                wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \\
                                echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google.list && \\
                                apt-get update && \\
                                apt-get install -y google-chrome-stable && \\
                                wget -N https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/linux64/chromedriver-linux64.zip && \\
                                unzip -o chromedriver-linux64.zip && \\
                                mv chromedriver-linux64/chromedriver /usr/local/bin/ && \\
                                chmod +x /usr/local/bin/chromedriver && \\
                                cd /tests && \\
                                python test_adorno.py
                            "
                    """
                }
            }
            post {
                always {
                    script {
                        def email = sh(script: "git --no-pager show -s --format='%ae' HEAD", returnStdout: true).trim()
                        
                        emailext (
                            subject: "Selenium Test Results: ${env.JOB_NAME} - Build ${env.BUILD_NUMBER}",
                            body: """
                                Build URL: ${env.BUILD_URL}
                                Application URL: http://YOUR_EC2_PUBLIC_IP:8081
                                
                                Selenium tests have completed.
                                Check console output for detailed results.
                                
                                15 test cases were executed on your Adorno website.
                            """,
                            to: email
                        )
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline successful! App running on port 8081 (frontend) and 5001 (backend)'
        }
        failure {
            echo '❌ Pipeline failed! Check the logs above.'
        }
    }
}