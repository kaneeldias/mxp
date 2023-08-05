export interface CreateSurveyResponseRequest {
    survey: {
        expaId: string,
        positionId: string,
        type: SurveyType,
    },
    formValues: {
        nps: number,
        lps: number
    }
}

export enum SurveyType {
    INITIAL = "initial",
    MID = "mid",
    FINAL = "final"
}

export interface GetSurveyResponseRequest {
    survey: {
        expaId: string,
        positionId: string,
        type: SurveyType
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

export interface MidSurveyResponse {
    why: string,
    lps: number
}

export interface FinalSurveyResponse {
    experience: string,
    lps: number
}