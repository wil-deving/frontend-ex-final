import { API_SERVICES, REPORT_SERVICES } from "../../services/ConfigServices";

export async function getSalesList(city = "all") {
  try {
    const response = await fetch(`${API_SERVICES}/v1/sale/report/${city}`, {
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
    item.offerDate = item.offerDate.substring(0, 10);
    item.saleDate = item.saleDate.substring(0, 10);
    return item;
  });

export async function loadReportService(city = "all", agentToSearch = "") {
  city = city.replace(/\s+/g, "|");
  agentToSearch = agentToSearch.replace(/\s+/g, "|");
  try {
    const response = await fetch(
      `${REPORT_SERVICES}Reports/ReportServices/CreatorSalesReport.php?city=${city}&agentName=${agentToSearch}`,
      {
        method: "GET",
      }
    );
    window.location.href = `${REPORT_SERVICES}Reports/ReportServices/CreatorSalesReport.php?city=${city}&agentName=${agentToSearch}`;
    return { status: response.status };
  } catch (error) {
    console.log("Error: ", error);
  }
}
