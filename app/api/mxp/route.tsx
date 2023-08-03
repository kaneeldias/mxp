import {NextRequest, NextResponse} from "next/server";
import {ApolloClient, ApolloError, InMemoryCache} from 'apollo-boost';
import {createHttpLink} from 'apollo-link-http';
import gql from 'graphql-tag';
import {setContext} from 'apollo-link-context';

export async function GET(request: NextRequest) {
    const searchValue: string = request.nextUrl.searchParams.get("search") || "";
    const page: number = parseInt(request.nextUrl.searchParams.get("page") || "1");

    const httpLink = createHttpLink({uri: 'https://gis-api.aiesec.org/graphql'});

    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                Authorization: "da6d83c0525ff289dbb8b4bf11795ac83d4dd193f35e0611ffaeee4ff2c56075"
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
				home_lc {
				    full_name
				}
				home_mc {
				    full_name
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

    const response = await client.query({query: query})
        .then((data: any) => {
            return data.data.people;
        })
        .catch((error: ApolloError) => {
            return error
        });

    if (response instanceof ApolloError) {
        return NextResponse.json({
            "message": response,
        }, {status: 500});
    }

    return NextResponse.json(response, {status: 200});
}