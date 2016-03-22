export const TEST_VARIABLE = 5;

export default function styleProviderTestReducer() {
  return {
    configuration: {
      theme: {
        variables: {
          testVariable: TEST_VARIABLE,
        },
      },
    },
  };
}
