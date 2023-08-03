import {Member, Position} from "@/app/_types/MemberTypes";

export function convertDateToReadable(date: string): string {
    const date2 = new Date(date);
    const readableDate = date2.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return readableDate;
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
    const lc = member.home_lc.full_name;
    const mc = member.home_mc.full_name;

    return `${lc},  ${removeAiesecInPrefix(mc)}`;
}
