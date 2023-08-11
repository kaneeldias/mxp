import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {ApolloClient, ApolloError, InMemoryCache} from "apollo-boost";
import gql from "graphql-tag";
import {Committee} from "@/app/_types/CommitteeTypes";

export interface President {
    id: string,
    name: string,
    profilePhoto: string
}

export interface VicePresident {
    id: string,
    name: string,
    title: string,
    profilePhoto: string
}

export interface ExecutiveBoard {
    president: President;
    vicePresidents: VicePresident[];
}

export class CommitteeService {

    private readonly accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    public async getCommittee(committeeId: string): Promise<Committee> {
        const httpLink = createHttpLink({uri: 'https://gis-api.aiesec.org/graphql'});

        const authLink = setContext(async (_, {headers}) => {
            return {
                headers: {
                    ...headers,
                    Authorization: this.accessToken
                }
            };
        });

        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });

        const query = gql`
            {
                committee(id: "${committeeId}") {
                    id
                    full_name
                    address_detail {
                        country
                    }
                    tag
                }
            }
        `;

        const expaResponse = await client.query({query: query})
            .then((data: any) => {
                return data.data.committee;
            })
            .catch((error: ApolloError) => {
                return error
            });

        return expaResponse;
    }

    public async getEB(committeeId: string, termId: string): Promise<ExecutiveBoard> {
        const httpLink = createHttpLink({uri: 'https://gis-api.aiesec.org/graphql'});

        const authLink = setContext(async (_, {headers}) => {
            return {
                headers: {
                    ...headers,
                    Authorization: this.accessToken
                }
            };
        });

        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });

        const query = gql`
            {
              committeeTerm(id: "${committeeId}" term_id: "${termId}") {
                id
                name
                committee_departments {
                  total_count
                  edges {
                    node {
                      id
                      name
                      member_positions {
                        facets
                        edges {
                          node {
                            id
                            title
                            person {
                              id
                              full_name
                              profile_photo
                              last_active_at
                              __typename
                            }
                            function {
                              id
                              name
                              __typename
                            }
                            reports_to_position_id
                            reports_to {
                              id
                              __typename
                            }
                            role {
                              name
                              __typename
                            }
                            team_id
                            vp_id
                            __typename
                          }
                          __typename
                        }
                        __typename
                      }
                      permissions {
                        can_archive
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                member_position {
                  id
                  title
                  function {
                    id
                    name
                    __typename
                  }
                  person {
                    id
                    full_name
                    profile_photo
                    last_active_at
                    __typename
                  }
                  reports_to_position_id
                  role {
                    name
                    __typename
                  }
                  team_id
                  vp_id
                  __typename
                }
                __typename
              }
            }
	    `;

        const expaResponse = await client.query({query: query})
            .then((data: any) => {
                return data.data.committeeTerm;
            })
            .catch((error: ApolloError) => {
                return error
            });

        const vicePresidents: VicePresident[] = [];
        expaResponse.committee_departments.edges.forEach((department: any) => {
            department.node.member_positions.edges.forEach((member: any) => {
                const role = member.node.role.name;
                if (role === 'LCVP' || role === 'MCVP' || role === 'AIVP') {
                    vicePresidents.push({
                        id: member.node.person.id,
                        name: member.node.person.full_name,
                        title: member.node.title,
                        profilePhoto: member.node.person.profile_photo
                    })
                }
            });
        });

        const president: President = {
            id: expaResponse.member_position.person.id,
            name: expaResponse.member_position.person.full_name,
            profilePhoto: expaResponse.member_position.person.profile_photo
        }

        return {
            president: president,
            vicePresidents: vicePresidents
        };
    }

}