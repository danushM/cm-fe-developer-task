//Resetting "checked" field to ensure that only one radio button is selected at a time.
export const resetRadioCheckedField = (hrData) => {
  return hrData.map((data) => ({
    ...data,
    checked: false,
  }));
};
