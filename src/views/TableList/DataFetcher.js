import axios from "axios";

export const employeeDataFetcher = async (selectedDepartment) => {
  try {
    //Gathering data from API via GET.
    var res = await axios.get(
      `https://randomuser.me/api/?seed=${selectedDepartment}&results=10`
    );

    //Returning data.
    return res.data.results;
  } catch (err) {
    console.log(err);
  }
};
