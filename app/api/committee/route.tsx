import {NextRequest, NextResponse} from "next/server";
import {ApolloClient, ApolloError, InMemoryCache} from 'apollo-boost';
import {createHttpLink} from 'apollo-link-http';
import gql from 'graphql-tag';
import {setContext} from 'apollo-link-context';
import {getAccessToken} from "@/_utils/auth_utils";

export async function GET(request: NextRequest) {
    const searchValue: string = request.nextUrl.searchParams.get("search") || "";
    const page: number = parseInt(request.nextUrl.searchParams.get("page") || "1");

    const httpLink = createHttpLink({uri: 'https://gis-api.aiesec.org/graphql'});

    const authLink = setContext(async (_, {headers}) => {
        return {
            headers: {
                ...headers,
                Authorization: await getAccessToken()
            }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    const query = gql`
        {
          committees(
            filters: {
              q: "${searchValue}"
            }
            pagination: {
              page: ${page},
              per_page: 10
            }
          ) {
            data {
              id
              full_name
              address_detail {
                country
              }
              tag
            }
          }
        }
	`;

    const expaResponse = await client.query({query: query})
        .then((data: any) => {
            return data.data.committees;
        })
        .catch((error: ApolloError) => {
            return error
        });

    if (expaResponse instanceof ApolloError) {
        return NextResponse.json({
            "message": expaResponse,
        }, {status: 500});
    }

    return NextResponse.json(expaResponse, {status: 200});
}