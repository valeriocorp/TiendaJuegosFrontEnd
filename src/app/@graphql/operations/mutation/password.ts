import gql from 'graphql-tag';

export const RESET_PASSWORD = gql`
        mutation resetearPassword($email: String!){
              resetPassword(email:$email) {
                message
                status
              }
            }
`;

export const CHANGE_PASSWORD = gql`
      mutation cambio($id: ID!, $password: String!){
        changePassword(id: $id, password: $password){
          status
          message
        }
      }
`;
