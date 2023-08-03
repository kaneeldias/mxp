export interface CreateSurveyResponseRequest {
    survey: {
        expaId: string,
        positionId: string,
        type: string,
    },
    formValues: {
        nps: number,
        lps: number
    }
}

export interface GetSurveyResponseRequest {
    survey: {
        expaId: string,
        positionId: string,
        type: string
    }
}

export interface SurveyStatuses {
    initial: SurveyStatus,
    mid: SurveyStatus,
    final: SurveyStatus
}

export enum SurveyStatus {
    FILLED = "FILLED",
    NOT_FILLED = "NOT FILLED",
    NOT_AVAILABLE = "NOT AVAILABLE"
}

export type SurveyStatusesResponse = {
    data: SurveyStatuses;
}

export interface InitialSurveyResponse {
    nps: number,
    lps: number
}