import {NextRequest, NextResponse} from "next/server";
import {db} from "@/app/init";
import {firestore} from "firebase-admin";
import {CreateSurveyResponseRequest} from "@/app/_types/SurveyTypes";
import {getPosition} from "@/app/api/position/route";
import {getAccessToken} from "@/_utils/auth_utils";
import {getCurrentPerson} from "@/app/api/member/current/route";
import {canSurveyBeFilled} from "@/_utils/utils";
import FieldValue = firestore.FieldValue;

export async function POST(request: NextRequest) {
    try {
        const requestData: CreateSurveyResponseRequest = await request.json() as CreateSurveyResponseRequest;
        const position = await getPosition(requestData.survey.positionId, await getAccessToken());
        const currentPerson = await getCurrentPerson(await getAccessToken())

        console.log(position.person.id);
        console.log(currentPerson.id);

        if (position.person.id != currentPerson.id) {
            return NextResponse.json({message: "You are not authorized to fill this survey."}, {status: 401});
        }

        const canBeFilled = canSurveyBeFilled(requestData.survey.type, position.start_date, position.end_date);
        if (!canBeFilled) {
            return NextResponse.json({message: "Survey cannot be filled at this time."}, {status: 400});
        }

        const docRef = db
            .collection("members").doc(`${requestData.survey.expaId}`)
            .collection("positions").doc(`${requestData.survey.positionId}`)
            .collection("surveys").doc(`${requestData.survey.type}`);

        await docRef.set({
            ...requestData.formValues,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({message: "Survey response updated successfully"}, {status: 200});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            return NextResponse.json({message: e.message}, {status: 500});
        }
        return NextResponse.json({message: "Unable to update survey response."}, {status: 500});
    }
}

export async function GET(request: NextRequest) {
    try {
        const expaId: string = request.nextUrl.searchParams.get("expaId") as string;
        const positionId: string = request.nextUrl.searchParams.get("positionId") as string;
        const type: string = request.nextUrl.searchParams.get("type") as string;


        const docRef = db
            .collection("members").doc(`${expaId}`)
            .collection("positions").doc(`${positionId}`)
            .collection("surveys").doc(`${type}`);

        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({}, {status: 200});
        }

        return NextResponse.json(doc.data(), {status: 200});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            return NextResponse.json({message: e.message}, {status: 500});
        }
        return NextResponse.json({message: "Unable to retrieve survey response."}, {status: 500});
    }
}