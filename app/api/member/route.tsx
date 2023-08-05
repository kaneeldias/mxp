import {NextRequest, NextResponse} from "next/server";
import {ApolloClient, ApolloError, InMemoryCache} from 'apollo-boost';
import {createHttpLink} from 'apollo-link-http';
import gql from 'graphql-tag';
import {setContext} from 'apollo-link-context';

export async function GET(request: NextRequest) {
    const expaId: string = request.nextUrl.searchParams.get("expaId") as string;

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
	query {
      person (
        id: "${expaId}"
      ) 	
      {
        id
        full_name
        home_lc {
          full_name
        }
        home_mc {
          full_name
        }
        is_aiesecer
        contact_detail {
          email
          country_code
          phone
        }
        profile_photo
        member_positions {
          id
          title
          function {
            name
          }
          role {
            name
          }
          start_date
          end_date
          status
          committee_department {
            name
          }
          term {
            name
          }
          office {
            full_name
          }
        }
      }
    }
	`;

    const response = await client.query({query: query})
        .then((data: any) => {
            return {
                data: data.data.person
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