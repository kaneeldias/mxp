import {NextRequest, NextResponse} from "next/server";
import {ApolloClient, ApolloError, InMemoryCache} from 'apollo-boost';
import {createHttpLink} from 'apollo-link-http';
import gql from 'graphql-tag';
import {setContext} from 'apollo-link-context';
import {Member} from "@/app/_types/MemberTypes";

export async function GET(request: NextRequest) {
    const response = await getCurrentPerson(request.headers.get("Authorization") as string)
        .then((data: any) => {
            return {
                ...data
            };
        })
        .catch((error: ApolloError) => {
            return error
        });

    if (response instanceof ApolloError) {
        console.log("ApolloError");
        return NextResponse.json({
            "message": response,
        }, {status: 500});
    }

    return NextResponse.json(response, {status: 200});
}

export async function getCurrentPerson(access_token: string): Promise<Member> {
    const httpLink = createHttpLink({uri: 'https://gis-api.aiesec.org/graphql'});

    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                Authorization: access_token
            }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    const query = gql`
        {
          currentPerson {
            id
            profile_photo
          }
        }
	`;

    return (await client.query({query: query})).data.currentPerson;
}