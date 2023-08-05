import {NextRequest, NextResponse} from "next/server";
import {db} from "@/app/init";
import {firestore} from "firebase-admin";
import {CreateSurveyResponseRequest} from "@/app/_types/SurveyTypes";
import FieldValue = firestore.FieldValue;

export async function POST(request: NextRequest) {
    try {
        const requestData: CreateSurveyResponseRequest = await request.json() as CreateSurveyResponseRequest;

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