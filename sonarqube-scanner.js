const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://172.26.41.194:9000",
    token: "d6e11d6d8f6c7d6a3feb1521e0f9e72edc09198b",
    options: {
      "sonar.projectKey": "spectranet-portlet-ui",
      "sonar.projectName": "Spectranet Portlet UI",
      "sonar.projectVersion": "0.0",
      "sonar.sources": "./src",
      //"sonar.exclusions": "**/__tests__/**",
      //"sonar.tests": "./src/__tests__",
      ///"sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
      //"sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      //"sonar.testExecutionReportPaths": "reports/test-report.xml",
    },
  },
  () => {},
);