//Store state of each radio button using "checked" field.
export const addRadioChecked = (hrData) => {
  return hrData.departments.map((data) => ({
    ...data,
    checked: false,
  }));
};
