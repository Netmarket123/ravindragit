export const TEST_PROPERTY = 1;

export default (INCLUDE, variables) => ({
  testStyle: {
    testProperty: TEST_PROPERTY,
    variableProperty: variables.testVariable,
  },
});
