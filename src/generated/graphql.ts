import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};


/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};


/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  /** delete single row from the table: "scenarios" */
  deleteScenarioById?: Maybe<Scenario>;
  /** delete data from the table: "scenarios" */
  deleteScenarios?: Maybe<Scenario_Mutation_Response>;
  /** delete data from the table: "stories" */
  deleteStories?: Maybe<Story_Mutation_Response>;
  /** delete single row from the table: "stories" */
  deleteStoryById?: Maybe<Story>;
  /** insert a single row into the table: "scenarios" */
  insertScenario?: Maybe<Scenario>;
  /** insert data into the table: "scenarios" */
  insertScenarios?: Maybe<Scenario_Mutation_Response>;
  /** insert data into the table: "stories" */
  insertStories?: Maybe<Story_Mutation_Response>;
  /** insert a single row into the table: "stories" */
  insertStory?: Maybe<Story>;
  /** update single row of the table: "scenarios" */
  updateScenarioById?: Maybe<Scenario>;
  /** update data of the table: "scenarios" */
  updateScenarios?: Maybe<Scenario_Mutation_Response>;
  /** update data of the table: "stories" */
  updateStories?: Maybe<Story_Mutation_Response>;
  /** update single row of the table: "stories" */
  updateStoryById?: Maybe<Story>;
};


/** mutation root */
export type Mutation_RootDeleteScenarioByIdArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteScenariosArgs = {
  where: Scenario_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteStoriesArgs = {
  where: Story_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteStoryByIdArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsertScenarioArgs = {
  object: Scenario_Insert_Input;
  on_conflict?: Maybe<Scenario_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertScenariosArgs = {
  objects: Array<Scenario_Insert_Input>;
  on_conflict?: Maybe<Scenario_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertStoriesArgs = {
  objects: Array<Story_Insert_Input>;
  on_conflict?: Maybe<Story_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertStoryArgs = {
  object: Story_Insert_Input;
  on_conflict?: Maybe<Story_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdateScenarioByIdArgs = {
  _append?: Maybe<Scenario_Append_Input>;
  _delete_at_path?: Maybe<Scenario_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Scenario_Delete_Elem_Input>;
  _delete_key?: Maybe<Scenario_Delete_Key_Input>;
  _prepend?: Maybe<Scenario_Prepend_Input>;
  _set?: Maybe<Scenario_Set_Input>;
  pk_columns: Scenario_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateScenariosArgs = {
  _append?: Maybe<Scenario_Append_Input>;
  _delete_at_path?: Maybe<Scenario_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Scenario_Delete_Elem_Input>;
  _delete_key?: Maybe<Scenario_Delete_Key_Input>;
  _prepend?: Maybe<Scenario_Prepend_Input>;
  _set?: Maybe<Scenario_Set_Input>;
  where: Scenario_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateStoriesArgs = {
  _append?: Maybe<Story_Append_Input>;
  _delete_at_path?: Maybe<Story_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Story_Delete_Elem_Input>;
  _delete_key?: Maybe<Story_Delete_Key_Input>;
  _prepend?: Maybe<Story_Prepend_Input>;
  _set?: Maybe<Story_Set_Input>;
  where: Story_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateStoryByIdArgs = {
  _append?: Maybe<Story_Append_Input>;
  _delete_at_path?: Maybe<Story_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Story_Delete_Elem_Input>;
  _delete_key?: Maybe<Story_Delete_Key_Input>;
  _prepend?: Maybe<Story_Prepend_Input>;
  _set?: Maybe<Story_Set_Input>;
  pk_columns: Story_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  /** fetch aggregated fields from the table: "scenarios" */
  aggregateScenarios: Scenario_Aggregate;
  /** fetch aggregated fields from the table: "stories" */
  aggtegateStories: Story_Aggregate;
  /** fetch data from the table: "scenarios" using primary key columns */
  getScenarioById?: Maybe<Scenario>;
  /** fetch data from the table: "stories" using primary key columns */
  getStoryById?: Maybe<Story>;
  /** fetch data from the table: "scenarios" */
  listScenarios: Array<Scenario>;
  /** fetch data from the table: "stories" */
  listStories: Array<Story>;
};


export type Query_RootAggregateScenariosArgs = {
  distinct_on?: Maybe<Array<Scenario_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenario_Order_By>>;
  where?: Maybe<Scenario_Bool_Exp>;
};


export type Query_RootAggtegateStoriesArgs = {
  distinct_on?: Maybe<Array<Story_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Story_Order_By>>;
  where?: Maybe<Story_Bool_Exp>;
};


export type Query_RootGetScenarioByIdArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGetStoryByIdArgs = {
  id: Scalars['uuid'];
};


export type Query_RootListScenariosArgs = {
  distinct_on?: Maybe<Array<Scenario_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenario_Order_By>>;
  where?: Maybe<Scenario_Bool_Exp>;
};


export type Query_RootListStoriesArgs = {
  distinct_on?: Maybe<Array<Story_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Story_Order_By>>;
  where?: Maybe<Story_Bool_Exp>;
};

/** columns and relationships of "scenarios" */
export type Scenario = {
  active: Scalars['Boolean'];
  collaborator: Scalars['jsonb'];
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  googleAnalyticsId?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  images: Scalars['jsonb'];
  launcher: Scalars['jsonb'];
  owner: Scalars['String'];
  /** An array relationship */
  stories: Array<Story>;
  /** An aggregate relationship */
  stories_aggregate: Story_Aggregate;
  theme: Scalars['jsonb'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "scenarios" */
export type ScenarioCollaboratorArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "scenarios" */
export type ScenarioImagesArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "scenarios" */
export type ScenarioLauncherArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "scenarios" */
export type ScenarioStoriesArgs = {
  distinct_on?: Maybe<Array<Story_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Story_Order_By>>;
  where?: Maybe<Story_Bool_Exp>;
};


/** columns and relationships of "scenarios" */
export type ScenarioStories_AggregateArgs = {
  distinct_on?: Maybe<Array<Story_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Story_Order_By>>;
  where?: Maybe<Story_Bool_Exp>;
};


/** columns and relationships of "scenarios" */
export type ScenarioThemeArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "scenarios" */
export type Scenario_Aggregate = {
  aggregate?: Maybe<Scenario_Aggregate_Fields>;
  nodes: Array<Scenario>;
};

/** aggregate fields of "scenarios" */
export type Scenario_Aggregate_Fields = {
  count: Scalars['Int'];
  max?: Maybe<Scenario_Max_Fields>;
  min?: Maybe<Scenario_Min_Fields>;
};


/** aggregate fields of "scenarios" */
export type Scenario_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Scenario_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Scenario_Append_Input = {
  collaborator?: Maybe<Scalars['jsonb']>;
  images?: Maybe<Scalars['jsonb']>;
  launcher?: Maybe<Scalars['jsonb']>;
  theme?: Maybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "scenarios". All fields are combined with a logical 'AND'. */
export type Scenario_Bool_Exp = {
  _and?: Maybe<Array<Scenario_Bool_Exp>>;
  _not?: Maybe<Scenario_Bool_Exp>;
  _or?: Maybe<Array<Scenario_Bool_Exp>>;
  active?: Maybe<Boolean_Comparison_Exp>;
  collaborator?: Maybe<Jsonb_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  googleAnalyticsId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  images?: Maybe<Jsonb_Comparison_Exp>;
  launcher?: Maybe<Jsonb_Comparison_Exp>;
  owner?: Maybe<String_Comparison_Exp>;
  stories?: Maybe<Story_Bool_Exp>;
  theme?: Maybe<Jsonb_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "scenarios" */
export enum Scenario_Constraint {
  /** unique or primary key constraint */
  SessionsPkey = 'sessions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Scenario_Delete_At_Path_Input = {
  collaborator?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<Scalars['String']>>;
  launcher?: Maybe<Array<Scalars['String']>>;
  theme?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Scenario_Delete_Elem_Input = {
  collaborator?: Maybe<Scalars['Int']>;
  images?: Maybe<Scalars['Int']>;
  launcher?: Maybe<Scalars['Int']>;
  theme?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Scenario_Delete_Key_Input = {
  collaborator?: Maybe<Scalars['String']>;
  images?: Maybe<Scalars['String']>;
  launcher?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "scenarios" */
export type Scenario_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>;
  collaborator?: Maybe<Scalars['jsonb']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  googleAnalyticsId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  images?: Maybe<Scalars['jsonb']>;
  launcher?: Maybe<Scalars['jsonb']>;
  owner?: Maybe<Scalars['String']>;
  stories?: Maybe<Story_Arr_Rel_Insert_Input>;
  theme?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Scenario_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  googleAnalyticsId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Scenario_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  googleAnalyticsId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "scenarios" */
export type Scenario_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Scenario>;
};

/** input type for inserting object relation for remote table "scenarios" */
export type Scenario_Obj_Rel_Insert_Input = {
  data: Scenario_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Scenario_On_Conflict>;
};

/** on conflict condition type for table "scenarios" */
export type Scenario_On_Conflict = {
  constraint: Scenario_Constraint;
  update_columns?: Array<Scenario_Update_Column>;
  where?: Maybe<Scenario_Bool_Exp>;
};

/** Ordering options when selecting data from "scenarios". */
export type Scenario_Order_By = {
  active?: Maybe<Order_By>;
  collaborator?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  googleAnalyticsId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  images?: Maybe<Order_By>;
  launcher?: Maybe<Order_By>;
  owner?: Maybe<Order_By>;
  stories_aggregate?: Maybe<Story_Aggregate_Order_By>;
  theme?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: scenario */
export type Scenario_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Scenario_Prepend_Input = {
  collaborator?: Maybe<Scalars['jsonb']>;
  images?: Maybe<Scalars['jsonb']>;
  launcher?: Maybe<Scalars['jsonb']>;
  theme?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "scenarios" */
export enum Scenario_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Collaborator = 'collaborator',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  GoogleAnalyticsId = 'googleAnalyticsId',
  /** column name */
  Id = 'id',
  /** column name */
  Images = 'images',
  /** column name */
  Launcher = 'launcher',
  /** column name */
  Owner = 'owner',
  /** column name */
  Theme = 'theme',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "scenarios" */
export type Scenario_Set_Input = {
  active?: Maybe<Scalars['Boolean']>;
  collaborator?: Maybe<Scalars['jsonb']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  googleAnalyticsId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  images?: Maybe<Scalars['jsonb']>;
  launcher?: Maybe<Scalars['jsonb']>;
  owner?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "scenarios" */
export enum Scenario_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Collaborator = 'collaborator',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  GoogleAnalyticsId = 'googleAnalyticsId',
  /** column name */
  Id = 'id',
  /** column name */
  Images = 'images',
  /** column name */
  Launcher = 'launcher',
  /** column name */
  Owner = 'owner',
  /** column name */
  Theme = 'theme',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "stories" */
export type Story = {
  active: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  label: Scalars['String'];
  /** An object relationship */
  scenario?: Maybe<Scenario>;
  scenario_id: Scalars['uuid'];
  story: Scalars['jsonb'];
  strategy?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "stories" */
export type StoryStoryArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "stories" */
export type Story_Aggregate = {
  aggregate?: Maybe<Story_Aggregate_Fields>;
  nodes: Array<Story>;
};

/** aggregate fields of "stories" */
export type Story_Aggregate_Fields = {
  count: Scalars['Int'];
  max?: Maybe<Story_Max_Fields>;
  min?: Maybe<Story_Min_Fields>;
};


/** aggregate fields of "stories" */
export type Story_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Story_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "stories" */
export type Story_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Story_Max_Order_By>;
  min?: Maybe<Story_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Story_Append_Input = {
  story?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "stories" */
export type Story_Arr_Rel_Insert_Input = {
  data: Array<Story_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Story_On_Conflict>;
};

/** Boolean expression to filter rows from the table "stories". All fields are combined with a logical 'AND'. */
export type Story_Bool_Exp = {
  _and?: Maybe<Array<Story_Bool_Exp>>;
  _not?: Maybe<Story_Bool_Exp>;
  _or?: Maybe<Array<Story_Bool_Exp>>;
  active?: Maybe<Boolean_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  label?: Maybe<String_Comparison_Exp>;
  scenario?: Maybe<Scenario_Bool_Exp>;
  scenario_id?: Maybe<Uuid_Comparison_Exp>;
  story?: Maybe<Jsonb_Comparison_Exp>;
  strategy?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "stories" */
export enum Story_Constraint {
  /** unique or primary key constraint */
  StoriesPkey = 'stories_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Story_Delete_At_Path_Input = {
  story?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Story_Delete_Elem_Input = {
  story?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Story_Delete_Key_Input = {
  story?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "stories" */
export type Story_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario?: Maybe<Scenario_Obj_Rel_Insert_Input>;
  scenario_id?: Maybe<Scalars['uuid']>;
  story?: Maybe<Scalars['jsonb']>;
  strategy?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Story_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  strategy?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "stories" */
export type Story_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  scenario_id?: Maybe<Order_By>;
  strategy?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Story_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  strategy?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "stories" */
export type Story_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  scenario_id?: Maybe<Order_By>;
  strategy?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "stories" */
export type Story_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Story>;
};

/** on conflict condition type for table "stories" */
export type Story_On_Conflict = {
  constraint: Story_Constraint;
  update_columns?: Array<Story_Update_Column>;
  where?: Maybe<Story_Bool_Exp>;
};

/** Ordering options when selecting data from "stories". */
export type Story_Order_By = {
  active?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  scenario?: Maybe<Scenario_Order_By>;
  scenario_id?: Maybe<Order_By>;
  story?: Maybe<Order_By>;
  strategy?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: story */
export type Story_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Story_Prepend_Input = {
  story?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "stories" */
export enum Story_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  ScenarioId = 'scenario_id',
  /** column name */
  Story = 'story',
  /** column name */
  Strategy = 'strategy',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "stories" */
export type Story_Set_Input = {
  active?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  story?: Maybe<Scalars['jsonb']>;
  strategy?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "stories" */
export enum Story_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  ScenarioId = 'scenario_id',
  /** column name */
  Story = 'story',
  /** column name */
  Strategy = 'strategy',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Subscription_Root = {
  /** fetch aggregated fields from the table: "scenarios" */
  aggregateScenarios: Scenario_Aggregate;
  /** fetch aggregated fields from the table: "stories" */
  aggtegateStories: Story_Aggregate;
  /** fetch data from the table: "scenarios" using primary key columns */
  getScenarioById?: Maybe<Scenario>;
  /** fetch data from the table: "stories" using primary key columns */
  getStoryById?: Maybe<Story>;
  /** fetch data from the table: "scenarios" */
  listScenarios: Array<Scenario>;
  /** fetch data from the table: "stories" */
  listStories: Array<Story>;
};


export type Subscription_RootAggregateScenariosArgs = {
  distinct_on?: Maybe<Array<Scenario_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenario_Order_By>>;
  where?: Maybe<Scenario_Bool_Exp>;
};


export type Subscription_RootAggtegateStoriesArgs = {
  distinct_on?: Maybe<Array<Story_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Story_Order_By>>;
  where?: Maybe<Story_Bool_Exp>;
};


export type Subscription_RootGetScenarioByIdArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGetStoryByIdArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootListScenariosArgs = {
  distinct_on?: Maybe<Array<Scenario_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenario_Order_By>>;
  where?: Maybe<Scenario_Bool_Exp>;
};


export type Subscription_RootListStoriesArgs = {
  distinct_on?: Maybe<Array<Story_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Story_Order_By>>;
  where?: Maybe<Story_Bool_Exp>;
};


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type GetOneScenarioQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetOneScenarioQuery = { scenario?: Maybe<Pick<Scenario, 'active' | 'collaborator' | 'created_at' | 'email' | 'googleAnalyticsId' | 'id' | 'images' | 'launcher' | 'owner'>> };

export type NewScenarioMutationVariables = Exact<{
  input: Scenario_Insert_Input;
}>;


export type NewScenarioMutation = { insertScenario?: Maybe<Pick<Scenario, 'id'>> };


export const GetOneScenarioDocument = gql`
    query getOneScenario($id: uuid!) {
  scenario: getScenarioById(id: $id) {
    active
    collaborator
    created_at
    email
    googleAnalyticsId
    id
    images
    launcher
    owner
  }
}
    `;

/**
 * __useGetOneScenarioQuery__
 *
 * To run a query within a React component, call `useGetOneScenarioQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneScenarioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneScenarioQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneScenarioQuery(baseOptions: Apollo.QueryHookOptions<GetOneScenarioQuery, GetOneScenarioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneScenarioQuery, GetOneScenarioQueryVariables>(GetOneScenarioDocument, options);
      }
export function useGetOneScenarioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneScenarioQuery, GetOneScenarioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneScenarioQuery, GetOneScenarioQueryVariables>(GetOneScenarioDocument, options);
        }
export type GetOneScenarioQueryHookResult = ReturnType<typeof useGetOneScenarioQuery>;
export type GetOneScenarioLazyQueryHookResult = ReturnType<typeof useGetOneScenarioLazyQuery>;
export type GetOneScenarioQueryResult = Apollo.QueryResult<GetOneScenarioQuery, GetOneScenarioQueryVariables>;
export const NewScenarioDocument = gql`
    mutation newScenario($input: scenario_insert_input!) {
  insertScenario(object: $input) {
    id
  }
}
    `;
export type NewScenarioMutationFn = Apollo.MutationFunction<NewScenarioMutation, NewScenarioMutationVariables>;

/**
 * __useNewScenarioMutation__
 *
 * To run a mutation, you first call `useNewScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newScenarioMutation, { data, loading, error }] = useNewScenarioMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewScenarioMutation(baseOptions?: Apollo.MutationHookOptions<NewScenarioMutation, NewScenarioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewScenarioMutation, NewScenarioMutationVariables>(NewScenarioDocument, options);
      }
export type NewScenarioMutationHookResult = ReturnType<typeof useNewScenarioMutation>;
export type NewScenarioMutationResult = Apollo.MutationResult<NewScenarioMutation>;
export type NewScenarioMutationOptions = Apollo.BaseMutationOptions<NewScenarioMutation, NewScenarioMutationVariables>;