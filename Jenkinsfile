node {
  try {
    // notifyBuild('STARTED')

    def project = 'jenkins-cluster-ch'
    def appName = 'simple-api'
    def appVersion = '1.0.0'
    def branchName = env.BRANCH_NAME.replace("/", "-")
    def imageTag = "gcr.io/${project}/${appName}:${branchName}.${env.BUILD_NUMBER}"

    stage('Checkout') {
      checkout scm
    }

    stage('Build image') {
      sh("docker build -t ${imageTag} .")
    }

    stage('Test') {
      sh("docker run --rm ${imageTag} yarn test")
    }

    stage('Push image to registry') {
      switch (env.BRANCH_NAME) {
        case ['dev', 'master']:
          sh("gcloud docker -- push ${imageTag}")
          break
      }
    }

    // stage('Configure FI Cluster') {
    //   switch (env.BRANCH_NAME) {
    //     case ['dev', 'master']:
    //       sh("kubectl config set-credentials admin ${env.FI_CLUSTER_PASS}")
    //       sh("kubectl config set-cluster fi-cluster --server=${env.FI_CLUSTER_IP} --insecure-skip-tls-verify=true")
    //       sh("kubectl config set-context fi-cluster-context --cluster=fi-cluster --user=admin")
    //       sh("kubectl config use-context fi-cluster-context")
    //       break
    //   }
    // }

    stage('Deploy Application') {
      switch (env.BRANCH_NAME) {
        case ['dev', 'master']:
          if (env.BRANCH_NAME == 'dev') {
            namespace = 'staging'
          } else if (env.BRANCH_NAME == 'master') {
            namespace = 'production'
          }

          sh("sed -i.bak 's#gcr.io/${project}/${appName}:${appVersion}#${imageTag}#' deployment/deployments/deployment.yaml")
          sh("kubectl apply --namespace=${namespace} -f deployment/configmaps/${namespace}.yaml")
          sh("kubectl apply --namespace=${namespace} -f deployment/services")
          sh("kubectl apply --namespace=${namespace} -f deployment/deployments/deployment.yaml")
          sh("kubectl apply --namespace=${namespace} -f deployment/ingress/${namespace}.yaml")
          break
      }
    }
  } catch (e) {
    currentBuild.result = "FAILED"
    throw e
  } finally {
    // notifyBuild(currentBuild.result)
  }
}

// def notifyBuild(String buildStatus = 'STARTED') {
//   buildStatus =  buildStatus ?: 'SUCCESSFUL'

//   def color = 'RED'
//   def colorCode = '#FF0000'
//   def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
//   def summary = "${subject} (${env.BUILD_URL})"
//   def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
//     <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""

//   if (buildStatus == 'STARTED') {
//     color = 'YELLOW'
//     colorCode = '#FFCC00'
//   } else if (buildStatus == 'SUCCESSFUL') {
//     color = 'GREEN'
//     colorCode = '#228B22'
//   } else {
//     color = 'RED'
//     colorCode = '#FF0000'
//   }

//   slackSend (color: colorCode, message: summary)
// }
