import axios from "axios";

export const employeeDataFetcher = async (selectedDepartment) => {
  try {
    //Gathering data from API using GET and Axios.
    var employeeData = await axios.get(
      `https://randomuser.me/api/?seed=${selectedDepartment}&results=10`
    );

    //Returning data.
    return employeeData.data.results;
  } catch (error) {
    console.log(error);
  }
};
