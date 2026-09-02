migrate(
  (app) => {
    // Trigger indicator update from BCB during migration
    // Note: $http is only available in hooks. In migrations, we can check if table exists and leave data to be updated by hooks / seed or if we want we can do basic setup.
    console.log(
      '[Migration 0003] Migration to enable 12-month date interval sync for economic indicators',
    )
  },
  (app) => {},
)
