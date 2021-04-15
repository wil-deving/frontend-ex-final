import { API_SERVICES, REPORT_SERVICES } from "../../services/ConfigServices";

export async function getSalesList(city = "all") {
  try {
    const response = await fetch(`${API_SERVICES}/v1/inquiry/report/${city}`, {
      method: "GET",
    });
    const body = await response.json();
    const responseView = formatDataReceived(body);
    return { status: response.status, responseView };
  } catch (error) {
    console.log("Error: ", error);
  }
}

const formatDataReceived = (data = []) =>
  data.map((item) => {
    item.inquiryDate = item.inquiryDate.substring(0, 10);
    return item;
  });

export async function loadReportService(city = "all", interestedToSearch = "") {
  city = city.replace(/\s+/g, "|");
  interestedToSearch = interestedToSearch.replace(/\s+/g, "|");
  try {
    const response = await fetch(
      `${REPORT_SERVICES}Reports/ReportServices/CreatorInquiriesReport.php?city=${city}&intName=${interestedToSearch}`,
      {
        method: "GET",
      }
    );
    window.location.href = `${REPORT_SERVICES}Reports/ReportServices/CreatorInquiriesReport.php?city=${city}&intName=${interestedToSearch}`;
    return { status: response.status };
  } catch (error) {
    console.log("Error: ", error);
  }
}
