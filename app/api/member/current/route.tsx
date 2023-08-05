import {NextRequest, NextResponse} from "next/server";
import {ApolloClient, ApolloError, InMemoryCache} from 'apollo-boost';
import {createHttpLink} from 'apollo-link-http';
import gql from 'graphql-tag';
import {setContext} from 'apollo-link-context';

export async function GET(request: NextRequest) {
    const httpLink = createHttpLink({uri: 'https://gis-api.aiesec.org/graphql'});

    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                Authorization: request.headers.get("Authorization")
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

    const response = await client.query({query: query})
        .then((data: any) => {
            return {
                ...data.data.currentPerson
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