node {
  try {
    notifyBuild('STARTED')

    def project = 'field-insight'
    def appName = 'simple-api'
    def appVersion = '1.0.0'
    def imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

    stage('Checkout') {
      checkout scm
    }

    stage('Build image') {
      sh("docker build -t ${imageTag} .")
    }

    stage('Test') {
      sh("docker run --rm ${imageTag} npm test")
    }

    stage('Push image to registry') {
      sh("gcloud docker push ${imageTag}")
    }

    stage('Deploy Application') {
      switch (env.BRANCH_NAME) {
        case "dev":
            sh("sed -i.bak 's#gcr.io/${project}/${appName}:${appVersion}#${imageTag}#' deployment/deployments/deployment.yaml")
            sh("kubectl apply -f deployment/configmaps/staging.yaml")
            sh("kubectl apply --namespace=staging -f deployment/services")
            sh("kubectl apply --namespace=staging -f deployment/deployments/deployment.yaml")
            sh("kubectl apply -f deployment/ingress/staging.yaml")
            break
        // case "master":
        //     sh("sed -i.bak 's#gcr.io/${project}/${appName}:${appVersion}#${imageTag}#' deployment/deployments/deployment.yaml")
        //     sh("kubectl apply -f deployment/configmaps/production.yaml")
        //     sh("kubectl apply --namespace=production -f deployment/services")
        //     sh("kubectl apply --namespace=production -f deployment/deployments/deployment.yaml")
        //     sh("kubectl apply -f deployment/ingress/production.yaml")
            // break
      }
    }
  } catch (e) {
    currentBuild.result = "FAILED"
    throw e
  } finally {
    notifyBuild(currentBuild.result)
  }
}

def notifyBuild(String buildStatus = 'STARTED') {
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  def color = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"
  def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""

  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFCC00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#228B22'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  slackSend (color: colorCode, message: summary)
}
