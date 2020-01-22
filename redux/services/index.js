import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from "subscriptions-transport-ws";

const api = "http://192.168.1.9:3000/graphql"
var wsLink = new SubscriptionClient(api, {
  reconnect: true
});
const youtubeService = (text) => {
  return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${text}&type=video&key=AIzaSyCHsAUodbSKWzzRXI8ZDHYTSV9TdBKB2ZE`).then(response => response.json())
}
const getMessagesService = (input) => {
  console.log("input---->", input)
  const client = new ApolloClient({
    link: new HttpLink({ uri: api }),
    cache: new InMemoryCache()
  });
  return (
    client
      .query({
        query: gql`
            query  getMessage($input:MessageInput){
              getMessage(input:$input){
                id
                user{
                  id
                  names
                }
                owner{
                  id
                  names
                }
                text
                type
              }
            }
          `, variables: {
          input
        }
      })
  )
}
const sendMessageService = (data) => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: api }),
    cache: new InMemoryCache()
  });
  return (
    client
      .mutate({
        mutation: gql`
        mutation createMessage($input:MessageInput){
          createMessage(input:$input){
            id
            user{
              id
              names
            }
            owner{
              id
              names
            }
            text
            type
          }
        }
          `,
        variables: { "input": data }
      })
  )
}
const socketService = (input) => {
  let client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache()
  });
  return client.subscribe({
    query: gql`
            subscription Listen($input:MessageInput){
              Listen(input:$input){
                id
                user{
                  id
                  names
                }
                owner{
                  id
                  names
                }
                text
                type
              }
            }
    `, variables: { input }
  });
}
const usersService = () => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: api }),
    cache: new InMemoryCache()
  });
  return (
    client
      .query({
        query: gql`
            query {
              getUsers{
                id
                names
                password
                nickname
                photo
                }
            }
          `
      })
  )
}
const loginService = (user) => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: api }),
    cache: new InMemoryCache()
  });
  return (
    client
      .mutate({
        mutation: gql`
            mutation Login($input:LoginInput){
                Login(input:$input){
                id
                names
                password
                nickname
                photo
                }
            }
          `,
        variables: { "input": user }
      })
  )
}
const signUpService = (user) => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: api }),
    cache: new InMemoryCache()
  });
  return (
    client
      .mutate({
        mutation: gql`
          mutation SignUp($input:UserInput){
            SignUp(input:$input){
              id
              nickname
              password
              names
              photo
            }
          }
          `,
        variables: { "input": user }
      })
  )
}
const updateUserService = (user) => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: api }),
    cache: new InMemoryCache()
  });
  return (
    client
      .mutate({
        mutation: gql`
          mutation UpdateUser($input:UserInput){
            UpdateUser(input:$input){
              id
              nickname
              password
              names
              photo
            }
          }
          `,
        variables: { "input": user }
      })
  )
}
export { loginService, youtubeService, signUpService, updateUserService, usersService, getMessagesService, sendMessageService, socketService }