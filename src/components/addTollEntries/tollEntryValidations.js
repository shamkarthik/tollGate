export const tollEntryValidations = {
  tollName: {
    required: {
      value: true,
      message: 'tollName field is required.',
    },
  },
  vehicleType: {
    required: {
      value: true,
      message: 'vehicleType field is required.',
    },
  },
  vehicleNumber: {
    required: {
      value: true,
      message: 'vehicleNumber field is required.',
    },
  },
  tariff: {
    required: {
      value: true,
      message: 'tariff is not configured for the vehicle type',
    },
  },
}