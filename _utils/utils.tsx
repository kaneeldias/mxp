import {Member, Position} from "@/app/_types/MemberTypes";
import {SurveyType} from "@/app/_types/SurveyTypes";

export function convertDateToReadable(date: string): string {
    const date2 = new Date(date);
    return date2.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function sortMemberPositions(positions: Position[]): Position[] {
    function compareStartDatesDesc(position1: Position, position2: Position): number {
        const date1 = new Date(position1.start_date);
        const date2 = new Date(position2.start_date);
        return date2.getTime() - date1.getTime();
    }

    // Sort the array of positions using the custom comparison function
    positions.sort(compareStartDatesDesc);
    return positions;
}

export function convertTerm(input: string): string {
    const [startYear, endYear] = input.split('-').map(Number);

    // Convert the years to 2-digit format (e.g., 2021 -> 21, 2022 -> 22)
    const shortStartYear = startYear % 100;
    const shortEndYear = endYear % 100;

    return `${shortStartYear}.${shortEndYear}`;
}

export function removeAiesecInPrefix(input: string): string {
    const prefix = 'AIESEC in';
    return input.startsWith(prefix) ? input.slice(prefix.length).trim() : input;
}

export function getLCAndMC(member: Member): string {
    const lc = member.home_lc!.full_name;
    const mc = member.home_mc!.full_name;

    return `${lc},  ${removeAiesecInPrefix(mc)}`;
}

export async function checkAPIResponseForErrors(response: Response): Promise<void> {
    if (response.status != 200) {

        // if response is JSON
        if (response.headers.get("content-type")?.includes("application/json")) {
            const responseBody = await response.json();
            if (responseBody.message) {
                throw new Error(responseBody.message);
            }
            throw new Error(responseBody.toString());
        }

        // if response is text
        if (response.headers.get("content-type")?.includes("text/plain")) {
            throw new Error(await response.text());
        }

        throw new Error(response.statusText);
    }
}

export function canSurveyBeFilled(type: string, startDate: string, endDate: string): boolean {
    const today = getToday();
    console.debug(`Today: ${today}`);
    console.debug(`Start Date: ${startDate}`);
    console.debug(`End Date: ${endDate}`);
    console.debug(`Type: ${type}`);

    // Survey needs to be filled within 2 weeks of the start date (can be before or after)
    if (type === SurveyType.INITIAL) {
        return getNumberOfDaysBetweenDates(today, startDate) <= 14;
    }

    // Survey needs to filled one month after the start date or one month before the end date
    if (type === SurveyType.MID) {
        if (today < startDate) return false;
        if (today > endDate) return false;
        if (getNumberOfDaysBetweenDates(today, startDate) < 30) return false;
        if (getNumberOfDaysBetweenDates(today, endDate) < 30) return false;
        return true;
    }

    // Survey needs to be filled within 2 weeks after the end date
    if (type === SurveyType.FINAL) {
        if (today < endDate) return false;
        if (getNumberOfDaysBetweenDates(today, endDate) > 14) return false;
        return true;
    }

    return false;
}

function getNumberOfDaysBetweenDates(date1: string, date2: string): number {
    const date1Obj = new Date(date1);
    const date2Obj = new Date(date2);

    // Calculate the difference in milliseconds between the two dates
    const timeDiff = Math.abs(date2Obj.getTime() - date1Obj.getTime());

    // Calculate the number of days between the two dates
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
}

export function getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3).trimEnd() + '...';
    }
    return str;
}