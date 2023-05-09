pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Release') {
      steps {
        script {
          def branchName = env.BRANCH_NAME
          def commitMessages = sh(script: "git log --pretty=%s origin/${branchName}..HEAD", returnStdout: true).trim().split('\n')

          def majorVersionCommit = commitMessages.find { it.startsWith('feat:') }
          def minorVersionCommit = commitMessages.find { it.startsWith('fix:') }

          def currentMajorVersion = readMajorVersionFromGitHub() ?: 1
          def currentMinorVersion = readMinorVersionFromGitHub() ?: 0

          if (majorVersionCommit) {
            currentMajorVersion++
            currentMinorVersion = 0
            createGitHubRelease("v${currentMajorVersion}.${currentMinorVersion}-${getBranchSuffix(branchName)}", currentMajorVersion, currentMinorVersion)
          } else if (minorVersionCommit) {
            currentMinorVersion++
            createGitHubRelease("v${currentMajorVersion}.${currentMinorVersion}-${getBranchSuffix(branchName)}", currentMajorVersion, currentMinorVersion)
          }

          writeMajorVersionToGitHub(currentMajorVersion)
          writeMinorVersionToGitHub(currentMinorVersion)
        }
      }
    }
  }
}

def calculateMajorVersion(commitMessage) {
  def regex = /^feat:\s*(\d+)/
  def matcher = commitMessage =~ regex
  if (matcher) {
    return matcher[0][1] as Integer
  }
  return null
}

def calculateMinorVersion(commitMessage) {
  def regex = /^fix:\s*(\d+)/
  def matcher = commitMessage =~ regex
  if (matcher) {
    return matcher[0][1] as Integer
  }
  return null
}

def getBranchSuffix(branchName) {
  switch (branchName) {
    case 'dev':
      return 'dev'
    case 'preprod':
      return 'pp'
    case 'prod':
      return 'prod'
    default:
      return 'unknown'
  }
}

def createGitHubRelease(tagName, majorVersion, minorVersion) {
    //créer variable pour token
  sh "curl --request POST --url https://api.github.com/repos/salahgo/react-auth/releases --header 'Authorization: token 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' --header 'Content-Type: application/json' --data '{\"tag_name\": \"${tagName}\", \"name\": \"${tagName}\", \"body\": \"Release notes here\", \"target_commitish\": \"${env.GIT_COMMIT}\", \"draft\": false}'"
}

def readMajorVersionFromGitHub() {
  def response = sh script: "curl --request GET --url https://api.github.com/repos/salahgo/react-auth/releases/latest", returnStdout: true
  def json = readJSON(text: response)
  def tagName = json.tag_name
  def regex = /v(\d+)\.\d+-/
  def matcher = tagName =~ regex
  if (matcher) {
    return matcher[0][1] as Integer
  }
  return null
}

def readMinorVersionFromGitHub() {
  def response = sh script: "curl --request GET --url https://api.github.com/repos/salahgo/react-auth/releases/latest", returnStdout: true
  def json = readJSON(text: response)
  def tagName = json.tag_name
  def regex = /v\d+\.(\d+)-/
  def matcher = tagName =~ regex
  if (matcher) {
    return matcher[0][1] as Integer
  }
  return null
}

def writeMajorVersionToGitHub(majorVersion) {
sh "curl --request PATCH --url https://api.github.com/repos/salahgo/react-auth/releases/latest --header 'Authorization: token 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' --header 'Content-Type: application/json' --data '{\"tag_name\": \"v${majorVersion}\"."${readMinorVersionFromGitHub()}"-${getBranchSuffix(env.BRANCH_NAME)}\"}'"
}

def writeMinorVersionToGitHub(minorVersion) {
sh "curl --request PATCH --url https://api.github.com/repos/salahgo/react-auth/releases/latest --header \'Authorization: token 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\' --header \'Content-Type: application/json\' --data '{\"tag_name\": \"v${readMajorVersionFromGitHub()}.${minorVersion}-${getBranchSuffix(env.BRANCH_NAME)}\"}'"
}