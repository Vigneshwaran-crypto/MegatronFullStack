module.exports = {
  assets: ['./assets/fonts'],
  project: {
    android: {
      unstable_reactLegacyComponentNames: ['CameraView'],
      unstable_reactLegacyComponentNames: ['Video'], //mention here handles "RCTVideo fabric not yet compatible"
    },
    ios: {
      unstable_reactLegacyComponentNames: ['CameraView'],
    },
  },
};
