import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Beer = {
  __typename?: 'Beer';
  abv?: Maybe<Scalars['Float']['output']>;
  brewery: Brewery;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  ibu?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  style: BeerStyle;
};

export type BeerFilter = {
  maxAbv?: InputMaybe<Scalars['Float']['input']>;
  minAbv?: InputMaybe<Scalars['Float']['input']>;
  styleId?: InputMaybe<Scalars['ID']['input']>;
};

export type BeerStyle = {
  __typename?: 'BeerStyle';
  beers: Array<Beer>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Brewery = {
  __typename?: 'Brewery';
  beers: Array<Beer>;
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  foundedYear?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  wikidataId?: Maybe<Scalars['String']['output']>;
};

export type BreweryFilter = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  hasCoordinates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  beer?: Maybe<Beer>;
  beers: Array<Beer>;
  breweries: Array<Brewery>;
  brewery?: Maybe<Brewery>;
  style?: Maybe<BeerStyle>;
  styles: Array<BeerStyle>;
};


export type QueryBeerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBeersArgs = {
  filter?: InputMaybe<BeerFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBreweriesArgs = {
  filter?: InputMaybe<BreweryFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBreweryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStyleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStylesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Beer: ResolverTypeWrapper<Beer>;
  BeerFilter: BeerFilter;
  BeerStyle: ResolverTypeWrapper<BeerStyle>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Brewery: ResolverTypeWrapper<Brewery>;
  BreweryFilter: BreweryFilter;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Ingredient: ResolverTypeWrapper<Ingredient>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Beer: Beer;
  BeerFilter: BeerFilter;
  BeerStyle: BeerStyle;
  Boolean: Scalars['Boolean']['output'];
  Brewery: Brewery;
  BreweryFilter: BreweryFilter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Ingredient: Ingredient;
  Int: Scalars['Int']['output'];
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
};

export type BeerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Beer'] = ResolversParentTypes['Beer']> = {
  abv?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  brewery?: Resolver<ResolversTypes['Brewery'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ibu?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['BeerStyle'], ParentType, ContextType>;
};

export type BeerStyleResolvers<ContextType = any, ParentType extends ResolversParentTypes['BeerStyle'] = ResolversParentTypes['BeerStyle']> = {
  beers?: Resolver<Array<ResolversTypes['Beer']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type BreweryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Brewery'] = ResolversParentTypes['Brewery']> = {
  beers?: Resolver<Array<ResolversTypes['Beer']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  foundedYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wikidataId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type IngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ingredient'] = ResolversParentTypes['Ingredient']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  beer?: Resolver<Maybe<ResolversTypes['Beer']>, ParentType, ContextType, RequireFields<QueryBeerArgs, 'id'>>;
  beers?: Resolver<Array<ResolversTypes['Beer']>, ParentType, ContextType, Partial<QueryBeersArgs>>;
  breweries?: Resolver<Array<ResolversTypes['Brewery']>, ParentType, ContextType, Partial<QueryBreweriesArgs>>;
  brewery?: Resolver<Maybe<ResolversTypes['Brewery']>, ParentType, ContextType, RequireFields<QueryBreweryArgs, 'id'>>;
  style?: Resolver<Maybe<ResolversTypes['BeerStyle']>, ParentType, ContextType, RequireFields<QueryStyleArgs, 'id'>>;
  styles?: Resolver<Array<ResolversTypes['BeerStyle']>, ParentType, ContextType, Partial<QueryStylesArgs>>;
};

export type Resolvers<ContextType = any> = {
  Beer?: BeerResolvers<ContextType>;
  BeerStyle?: BeerStyleResolvers<ContextType>;
  Brewery?: BreweryResolvers<ContextType>;
  Ingredient?: IngredientResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

