import { gql } from "apollo-boost";


export const ME = gql`
query Me($token: String!) {
  me(token:$token) {
    name
    email
    password
  }
}
`;