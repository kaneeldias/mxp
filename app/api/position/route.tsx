import {NextRequest, NextResponse} from "next/server";
import {ApolloClient, ApolloError, InMemoryCache} from 'apollo-boost';
import {createHttpLink} from 'apollo-link-http';
import gql from 'graphql-tag';
import {setContext} from 'apollo-link-context';
import {Position} from "@/app/_types/MemberTypes";

export async function GET(request: NextRequest) {
    const positionId: string = request.nextUrl.searchParams.get("positionId") as string;

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
      memberPosition(id: ${positionId}) {
        id
        title
        committee_department {
          name
        }
        term {
          name
        }
        start_date
        end_date
        status
        duration {
          name
        }
        office {
          full_name
        }
        role {
          name
        }
        reports_to {
          id
          full_name
          profile_photo
        }
        person {
          id
          full_name
          profile_photo
        }
      }
    }
	`;

    const response = await client.query({query: query})
        .then((data: any) => {
            return {
                data: data.data.memberPosition
            };
        })
        .catch((error: ApolloError) => {
            return error
        });

    if (response instanceof Error) {
        console.error(response.message);
        return NextResponse.json({"message": response.message,}, {status: 500});
    }

    return NextResponse.json(response, {status: 200});
}

export async function getPosition(positionId: string, access_token: string): Promise<Position> {
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
      memberPosition(id: ${positionId}) {
        id
        title
        committee_department {
          name
        }
        term {
          name
        }
        start_date
        end_date
        status
        duration {
          name
        }
        office {
          id
          full_name
          tag
        }
        role {
          name
        }
        reports_to {
          id
          full_name
          profile_photo
        }
        person {
          id
          full_name
          profile_photo
        }
      }
    }
	`;

    return await client.query({query: query})
        .then((data: any) => {
            return data.data.memberPosition as Position;
        })
        .catch((error: ApolloError) => {
            throw error;
        });
}