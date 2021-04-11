/**
 * Created by Williams on 31/03/2021
 */
const protocol = "http";
const host = "192.168.0.100";
const portApiServices = "8011";

const portReportServices = "80";
const reportServicesName = "PrograTres";

export const API_SERVICES =
  protocol + "://" + host + ":" + portApiServices + "/";

export const REPORT_SERVICES =
  protocol +
  "://" +
  host +
  ":" +
  portReportServices +
  "/" +
  reportServicesName +
  "/";
