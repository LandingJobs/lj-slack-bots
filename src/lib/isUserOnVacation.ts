import type { Profile as ListProfile } from "@slack/web-api/dist/response/UsersListResponse";
import type { Profile as InfoProfile } from "@slack/web-api/dist/response/UsersInfoResponse";

export const avoidStatuses = ["Vacationing", "Vacations", "Out of office"];

const isUserOnVacation = (profile: ListProfile | InfoProfile | undefined) =>
  avoidStatuses.includes(profile?.status_text ?? "");

export default isUserOnVacation;
