module.exports = {
  default: {
    require: [
      "src/stepDefinitions/**/*.ts",
      "src/hooks/**/*.ts"
    ],
    paths: [
      "src/features/**/*.feature"
    ],
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "progress",
      "html:test-results/cucumber_report.html"
    ]
  }
};