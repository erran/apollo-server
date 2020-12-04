const path = require('path');
const { ApolloServer, gql } = require('apollo-server');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const workspace = process.env.GITHUB_WORKSPACE || __dirname;
const schemaFile = process.env.INPUT_SCHEMA_FILES || 'schema.graphql';
console.log(`workspace: ${workspace}`);
console.log(`schemaFile: ${schemaFile}`);
const types = schemaFile.split(';')
  .map(glob => path.join(workspace, glob))
  .map(path => loadFilesSync(path))
  .flat();

const server = new ApolloServer({
  typeDefs: mergeTypeDefs(types, { all: true }),
  resolvers: {},
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
