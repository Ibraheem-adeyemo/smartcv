const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://172.26.41.194:9000",
    token: "7417428d2c3f234d2a6e47fb43535398a90d6109",
    options: {
      "sonar.projectKey": "paas-ui",
      "sonar.projectName": "paas-ui",
      "sonar.projectVersion": "0.0",
      "sonar.sources": "./",
      //"sonar.exclusions": "**/__tests__/**",
      //"sonar.tests": "./src/__tests__",
      ///"sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
      //"sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      //"sonar.testExecutionReportPaths": "reports/test-report.xml",
    },
  },
  () => {},
);
