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
	query {
		people(
			filters: {
				is_aiesecer: true,
                q: "${searchValue}"
			}
			pagination: {
                page: ${page},
			    per_page: 10
            }
		) 	{
			data {
			    id
				full_name
				profile_photo
				home_lc {
				    id
				    full_name
				    tag
				}
				home_mc {
				    id
				    full_name
				    tag
                }
				is_aiesecer
				member_positions {
				function {
					name
				}
				role {
					name
				}
				status
				}
			}
			paging {
                total_items
                current_page
                total_pages
            }
        }
    }
	`;

    const expaResponse = await client.query({query: query})
        .then((data: any) => {
            return data.data.people;
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