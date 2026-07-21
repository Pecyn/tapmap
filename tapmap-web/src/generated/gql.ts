/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Beer($id: ID!) {\n    beer(id: $id) {\n      id\n      name\n      abv\n      ibu\n      description\n      brewery {\n        id\n        name\n      }\n      style {\n        id\n        name\n        description\n      }\n    }\n  }\n": typeof types.BeerDocument,
    "\n  query Beers($filter: BeerFilter, $limit: Int, $offset: Int) {\n    beers(filter: $filter, limit: $limit, offset: $offset) {\n      id\n      name\n      abv\n      ibu\n      brewery {\n        id\n        name\n      }\n      style {\n        id\n        name\n      }\n    }\n  }\n": typeof types.BeersDocument,
    "\n  query StylesForFilter {\n    styles(limit: 100) {\n      id\n      name\n    }\n  }\n": typeof types.StylesForFilterDocument,
    "\n  query Brewery($id: ID!) {\n    brewery(id: $id) {\n      id\n      name\n      city\n      country\n      foundedYear\n      website\n      beers {\n        id\n        name\n        abv\n        style {\n          name\n        }\n      }\n    }\n  }\n": typeof types.BreweryDocument,
    "\n  query Breweries($filter: BreweryFilter, $limit: Int, $offset: Int) {\n    breweries(filter: $filter, limit: $limit, offset: $offset) {\n      id\n      name\n      city\n      country\n      beers {\n        id\n      }\n    }\n  }\n": typeof types.BreweriesDocument,
    "\n  query Style($id: ID!) {\n    style(id: $id) {\n      id\n      name\n      description\n      beers {\n        id\n        name\n        abv\n        brewery {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.StyleDocument,
    "\n  query Styles($limit: Int, $offset: Int) {\n    styles(limit: $limit, offset: $offset) {\n      id\n      name\n      beers {\n        id\n      }\n    }\n  }\n": typeof types.StylesDocument,
};
const documents: Documents = {
    "\n  query Beer($id: ID!) {\n    beer(id: $id) {\n      id\n      name\n      abv\n      ibu\n      description\n      brewery {\n        id\n        name\n      }\n      style {\n        id\n        name\n        description\n      }\n    }\n  }\n": types.BeerDocument,
    "\n  query Beers($filter: BeerFilter, $limit: Int, $offset: Int) {\n    beers(filter: $filter, limit: $limit, offset: $offset) {\n      id\n      name\n      abv\n      ibu\n      brewery {\n        id\n        name\n      }\n      style {\n        id\n        name\n      }\n    }\n  }\n": types.BeersDocument,
    "\n  query StylesForFilter {\n    styles(limit: 100) {\n      id\n      name\n    }\n  }\n": types.StylesForFilterDocument,
    "\n  query Brewery($id: ID!) {\n    brewery(id: $id) {\n      id\n      name\n      city\n      country\n      foundedYear\n      website\n      beers {\n        id\n        name\n        abv\n        style {\n          name\n        }\n      }\n    }\n  }\n": types.BreweryDocument,
    "\n  query Breweries($filter: BreweryFilter, $limit: Int, $offset: Int) {\n    breweries(filter: $filter, limit: $limit, offset: $offset) {\n      id\n      name\n      city\n      country\n      beers {\n        id\n      }\n    }\n  }\n": types.BreweriesDocument,
    "\n  query Style($id: ID!) {\n    style(id: $id) {\n      id\n      name\n      description\n      beers {\n        id\n        name\n        abv\n        brewery {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.StyleDocument,
    "\n  query Styles($limit: Int, $offset: Int) {\n    styles(limit: $limit, offset: $offset) {\n      id\n      name\n      beers {\n        id\n      }\n    }\n  }\n": types.StylesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Beer($id: ID!) {\n    beer(id: $id) {\n      id\n      name\n      abv\n      ibu\n      description\n      brewery {\n        id\n        name\n      }\n      style {\n        id\n        name\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query Beer($id: ID!) {\n    beer(id: $id) {\n      id\n      name\n      abv\n      ibu\n      description\n      brewery {\n        id\n        name\n      }\n      style {\n        id\n        name\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Beers($filter: BeerFilter, $limit: Int, $offset: Int) {\n    beers(filter: $filter, limit: $limit, offset: $offset) {\n      id\n      name\n      abv\n      ibu\n      brewery {\n        id\n        name\n      }\n      style {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Beers($filter: BeerFilter, $limit: Int, $offset: Int) {\n    beers(filter: $filter, limit: $limit, offset: $offset) {\n      id\n      name\n      abv\n      ibu\n      brewery {\n        id\n        name\n      }\n      style {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StylesForFilter {\n    styles(limit: 100) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query StylesForFilter {\n    styles(limit: 100) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Brewery($id: ID!) {\n    brewery(id: $id) {\n      id\n      name\n      city\n      country\n      foundedYear\n      website\n      beers {\n        id\n        name\n        abv\n        style {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Brewery($id: ID!) {\n    brewery(id: $id) {\n      id\n      name\n      city\n      country\n      foundedYear\n      website\n      beers {\n        id\n        name\n        abv\n        style {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Breweries($filter: BreweryFilter, $limit: Int, $offset: Int) {\n    breweries(filter: $filter, limit: $limit, offset: $offset) {\n      id\n      name\n      city\n      country\n      beers {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Breweries($filter: BreweryFilter, $limit: Int, $offset: Int) {\n    breweries(filter: $filter, limit: $limit, offset: $offset) {\n      id\n      name\n      city\n      country\n      beers {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Style($id: ID!) {\n    style(id: $id) {\n      id\n      name\n      description\n      beers {\n        id\n        name\n        abv\n        brewery {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Style($id: ID!) {\n    style(id: $id) {\n      id\n      name\n      description\n      beers {\n        id\n        name\n        abv\n        brewery {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Styles($limit: Int, $offset: Int) {\n    styles(limit: $limit, offset: $offset) {\n      id\n      name\n      beers {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Styles($limit: Int, $offset: Int) {\n    styles(limit: $limit, offset: $offset) {\n      id\n      name\n      beers {\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;