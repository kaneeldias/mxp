import {NextRequest, NextResponse} from "next/server";
import {db} from "@/app/init";
import {firestore} from "firebase-admin";
import {getPosition} from "@/app/api/position/route";
import {Position} from "@/app/_types/MemberTypes";
import {SurveyStatus, SurveyStatuses} from "@/app/_types/SurveyTypes";
import {getToday} from "@/_utils/utils";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export async function GET(request: NextRequest) {
    const expaId: string = request.nextUrl.searchParams.get("expaId") as string;
    const positionId: string = request.nextUrl.searchParams.get("positionId") as string;

    let statuses: SurveyStatuses = {
        initial: SurveyStatus.NOT_FILLED,
        mid: SurveyStatus.NOT_FILLED,
        final: SurveyStatus.NOT_FILLED,
    }

    let position: Position;
    try {
        position = await getPosition(positionId, request.headers.get("Authorization") as string);
    } catch (error) {
        return NextResponse.json({
            "message": "Unable to retrieve position.",
        }, {status: 500});
    }

    const startDate = position.start_date;
    const endDate = position.end_date;

    const surveysRef = db
        .collection("members").doc(`${expaId}`)
        .collection("positions").doc(`${positionId}`)
        .collection("surveys")
    const snapshot = await surveysRef.get();

    if (!snapshot.empty) {
        snapshot.forEach((doc: QueryDocumentSnapshot) => {
            statuses[doc.id as keyof SurveyStatuses] = SurveyStatus.FILLED;
        });
    }

    const today: string = getToday();

    if (statuses.mid === SurveyStatus.NOT_FILLED && (today < startDate)) {
        statuses.mid = SurveyStatus.NOT_AVAILABLE;
    }

    if (statuses.final === SurveyStatus.NOT_FILLED && (today < endDate)) {
        statuses.final = SurveyStatus.NOT_AVAILABLE;
    }

    return NextResponse.json(statuses, {status: 200});
}

