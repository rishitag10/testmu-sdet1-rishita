module.exports = {
  default: {
    paths: ["src/features/*.feature"], // excludes generated/
    require: ["src/stepDefinitions/**/*.ts", "src/hooks/**/*.ts"],
    requireModule: ["ts-node/register"],
  },
  generated: {
    paths: ["src/features/generated/**/*.feature"],
    require: ["src/stepDefinitions/**/*.ts", "src/hooks/**/*.ts"],
    requireModule: ["ts-node/register"],
  },
};