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
  /** delete data from the table: "scenarios" */
  delete_scenarios?: Maybe<Scenarios_Mutation_Response>;
  /** delete single row from the table: "scenarios" */
  delete_scenarios_by_pk?: Maybe<Scenarios>;
  /** delete data from the table: "stories" */
  delete_stories?: Maybe<Stories_Mutation_Response>;
  /** delete single row from the table: "stories" */
  delete_stories_by_pk?: Maybe<Stories>;
  /** insert data into the table: "scenarios" */
  insert_scenarios?: Maybe<Scenarios_Mutation_Response>;
  /** insert a single row into the table: "scenarios" */
  insert_scenarios_one?: Maybe<Scenarios>;
  /** insert data into the table: "stories" */
  insert_stories?: Maybe<Stories_Mutation_Response>;
  /** insert a single row into the table: "stories" */
  insert_stories_one?: Maybe<Stories>;
  /** update data of the table: "scenarios" */
  update_scenarios?: Maybe<Scenarios_Mutation_Response>;
  /** update single row of the table: "scenarios" */
  update_scenarios_by_pk?: Maybe<Scenarios>;
  /** update data of the table: "stories" */
  update_stories?: Maybe<Stories_Mutation_Response>;
  /** update single row of the table: "stories" */
  update_stories_by_pk?: Maybe<Stories>;
};


/** mutation root */
export type Mutation_RootDelete_ScenariosArgs = {
  where: Scenarios_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Scenarios_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_StoriesArgs = {
  where: Stories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Stories_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_ScenariosArgs = {
  objects: Array<Scenarios_Insert_Input>;
  on_conflict?: Maybe<Scenarios_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scenarios_OneArgs = {
  object: Scenarios_Insert_Input;
  on_conflict?: Maybe<Scenarios_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_StoriesArgs = {
  objects: Array<Stories_Insert_Input>;
  on_conflict?: Maybe<Stories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Stories_OneArgs = {
  object: Stories_Insert_Input;
  on_conflict?: Maybe<Stories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ScenariosArgs = {
  _append?: Maybe<Scenarios_Append_Input>;
  _delete_at_path?: Maybe<Scenarios_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Scenarios_Delete_Elem_Input>;
  _delete_key?: Maybe<Scenarios_Delete_Key_Input>;
  _prepend?: Maybe<Scenarios_Prepend_Input>;
  _set?: Maybe<Scenarios_Set_Input>;
  where: Scenarios_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scenarios_By_PkArgs = {
  _append?: Maybe<Scenarios_Append_Input>;
  _delete_at_path?: Maybe<Scenarios_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Scenarios_Delete_Elem_Input>;
  _delete_key?: Maybe<Scenarios_Delete_Key_Input>;
  _prepend?: Maybe<Scenarios_Prepend_Input>;
  _set?: Maybe<Scenarios_Set_Input>;
  pk_columns: Scenarios_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_StoriesArgs = {
  _append?: Maybe<Stories_Append_Input>;
  _delete_at_path?: Maybe<Stories_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Stories_Delete_Elem_Input>;
  _delete_key?: Maybe<Stories_Delete_Key_Input>;
  _prepend?: Maybe<Stories_Prepend_Input>;
  _set?: Maybe<Stories_Set_Input>;
  where: Stories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Stories_By_PkArgs = {
  _append?: Maybe<Stories_Append_Input>;
  _delete_at_path?: Maybe<Stories_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Stories_Delete_Elem_Input>;
  _delete_key?: Maybe<Stories_Delete_Key_Input>;
  _prepend?: Maybe<Stories_Prepend_Input>;
  _set?: Maybe<Stories_Set_Input>;
  pk_columns: Stories_Pk_Columns_Input;
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
  /** fetch data from the table: "scenarios" */
  scenarios: Array<Scenarios>;
  /** fetch aggregated fields from the table: "scenarios" */
  scenarios_aggregate: Scenarios_Aggregate;
  /** fetch data from the table: "scenarios" using primary key columns */
  scenarios_by_pk?: Maybe<Scenarios>;
  /** An array relationship */
  stories: Array<Stories>;
  /** An aggregate relationship */
  stories_aggregate: Stories_Aggregate;
  /** fetch data from the table: "stories" using primary key columns */
  stories_by_pk?: Maybe<Stories>;
};


export type Query_RootScenariosArgs = {
  distinct_on?: Maybe<Array<Scenarios_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenarios_Order_By>>;
  where?: Maybe<Scenarios_Bool_Exp>;
};


export type Query_RootScenarios_AggregateArgs = {
  distinct_on?: Maybe<Array<Scenarios_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenarios_Order_By>>;
  where?: Maybe<Scenarios_Bool_Exp>;
};


export type Query_RootScenarios_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootStoriesArgs = {
  distinct_on?: Maybe<Array<Stories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stories_Order_By>>;
  where?: Maybe<Stories_Bool_Exp>;
};


export type Query_RootStories_AggregateArgs = {
  distinct_on?: Maybe<Array<Stories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stories_Order_By>>;
  where?: Maybe<Stories_Bool_Exp>;
};


export type Query_RootStories_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "scenarios" */
export type Scenarios = {
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
  stories: Array<Stories>;
  /** An aggregate relationship */
  stories_aggregate: Stories_Aggregate;
  theme: Scalars['jsonb'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "scenarios" */
export type ScenariosCollaboratorArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "scenarios" */
export type ScenariosImagesArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "scenarios" */
export type ScenariosLauncherArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "scenarios" */
export type ScenariosStoriesArgs = {
  distinct_on?: Maybe<Array<Stories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stories_Order_By>>;
  where?: Maybe<Stories_Bool_Exp>;
};


/** columns and relationships of "scenarios" */
export type ScenariosStories_AggregateArgs = {
  distinct_on?: Maybe<Array<Stories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stories_Order_By>>;
  where?: Maybe<Stories_Bool_Exp>;
};


/** columns and relationships of "scenarios" */
export type ScenariosThemeArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "scenarios" */
export type Scenarios_Aggregate = {
  aggregate?: Maybe<Scenarios_Aggregate_Fields>;
  nodes: Array<Scenarios>;
};

/** aggregate fields of "scenarios" */
export type Scenarios_Aggregate_Fields = {
  count: Scalars['Int'];
  max?: Maybe<Scenarios_Max_Fields>;
  min?: Maybe<Scenarios_Min_Fields>;
};


/** aggregate fields of "scenarios" */
export type Scenarios_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Scenarios_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Scenarios_Append_Input = {
  collaborator?: Maybe<Scalars['jsonb']>;
  images?: Maybe<Scalars['jsonb']>;
  launcher?: Maybe<Scalars['jsonb']>;
  theme?: Maybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "scenarios". All fields are combined with a logical 'AND'. */
export type Scenarios_Bool_Exp = {
  _and?: Maybe<Array<Scenarios_Bool_Exp>>;
  _not?: Maybe<Scenarios_Bool_Exp>;
  _or?: Maybe<Array<Scenarios_Bool_Exp>>;
  active?: Maybe<Boolean_Comparison_Exp>;
  collaborator?: Maybe<Jsonb_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  googleAnalyticsId?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  images?: Maybe<Jsonb_Comparison_Exp>;
  launcher?: Maybe<Jsonb_Comparison_Exp>;
  owner?: Maybe<String_Comparison_Exp>;
  stories?: Maybe<Stories_Bool_Exp>;
  theme?: Maybe<Jsonb_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "scenarios" */
export enum Scenarios_Constraint {
  /** unique or primary key constraint */
  SessionsPkey = 'sessions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Scenarios_Delete_At_Path_Input = {
  collaborator?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<Scalars['String']>>;
  launcher?: Maybe<Array<Scalars['String']>>;
  theme?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Scenarios_Delete_Elem_Input = {
  collaborator?: Maybe<Scalars['Int']>;
  images?: Maybe<Scalars['Int']>;
  launcher?: Maybe<Scalars['Int']>;
  theme?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Scenarios_Delete_Key_Input = {
  collaborator?: Maybe<Scalars['String']>;
  images?: Maybe<Scalars['String']>;
  launcher?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "scenarios" */
export type Scenarios_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>;
  collaborator?: Maybe<Scalars['jsonb']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  googleAnalyticsId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  images?: Maybe<Scalars['jsonb']>;
  launcher?: Maybe<Scalars['jsonb']>;
  owner?: Maybe<Scalars['String']>;
  stories?: Maybe<Stories_Arr_Rel_Insert_Input>;
  theme?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Scenarios_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  googleAnalyticsId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Scenarios_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  googleAnalyticsId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "scenarios" */
export type Scenarios_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Scenarios>;
};

/** input type for inserting object relation for remote table "scenarios" */
export type Scenarios_Obj_Rel_Insert_Input = {
  data: Scenarios_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Scenarios_On_Conflict>;
};

/** on conflict condition type for table "scenarios" */
export type Scenarios_On_Conflict = {
  constraint: Scenarios_Constraint;
  update_columns?: Array<Scenarios_Update_Column>;
  where?: Maybe<Scenarios_Bool_Exp>;
};

/** Ordering options when selecting data from "scenarios". */
export type Scenarios_Order_By = {
  active?: Maybe<Order_By>;
  collaborator?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  googleAnalyticsId?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  images?: Maybe<Order_By>;
  launcher?: Maybe<Order_By>;
  owner?: Maybe<Order_By>;
  stories_aggregate?: Maybe<Stories_Aggregate_Order_By>;
  theme?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: scenarios */
export type Scenarios_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Scenarios_Prepend_Input = {
  collaborator?: Maybe<Scalars['jsonb']>;
  images?: Maybe<Scalars['jsonb']>;
  launcher?: Maybe<Scalars['jsonb']>;
  theme?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "scenarios" */
export enum Scenarios_Select_Column {
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
export type Scenarios_Set_Input = {
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
export enum Scenarios_Update_Column {
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
export type Stories = {
  active: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  label: Scalars['String'];
  /** An object relationship */
  scenario?: Maybe<Scenarios>;
  scenario_id: Scalars['uuid'];
  story: Scalars['jsonb'];
  strategy?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "stories" */
export type StoriesStoryArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "stories" */
export type Stories_Aggregate = {
  aggregate?: Maybe<Stories_Aggregate_Fields>;
  nodes: Array<Stories>;
};

/** aggregate fields of "stories" */
export type Stories_Aggregate_Fields = {
  count: Scalars['Int'];
  max?: Maybe<Stories_Max_Fields>;
  min?: Maybe<Stories_Min_Fields>;
};


/** aggregate fields of "stories" */
export type Stories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Stories_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "stories" */
export type Stories_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Stories_Max_Order_By>;
  min?: Maybe<Stories_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Stories_Append_Input = {
  story?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "stories" */
export type Stories_Arr_Rel_Insert_Input = {
  data: Array<Stories_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Stories_On_Conflict>;
};

/** Boolean expression to filter rows from the table "stories". All fields are combined with a logical 'AND'. */
export type Stories_Bool_Exp = {
  _and?: Maybe<Array<Stories_Bool_Exp>>;
  _not?: Maybe<Stories_Bool_Exp>;
  _or?: Maybe<Array<Stories_Bool_Exp>>;
  active?: Maybe<Boolean_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  label?: Maybe<String_Comparison_Exp>;
  scenario?: Maybe<Scenarios_Bool_Exp>;
  scenario_id?: Maybe<Uuid_Comparison_Exp>;
  story?: Maybe<Jsonb_Comparison_Exp>;
  strategy?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "stories" */
export enum Stories_Constraint {
  /** unique or primary key constraint */
  StoriesPkey = 'stories_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Stories_Delete_At_Path_Input = {
  story?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Stories_Delete_Elem_Input = {
  story?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Stories_Delete_Key_Input = {
  story?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "stories" */
export type Stories_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario?: Maybe<Scenarios_Obj_Rel_Insert_Input>;
  scenario_id?: Maybe<Scalars['uuid']>;
  story?: Maybe<Scalars['jsonb']>;
  strategy?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Stories_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  strategy?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "stories" */
export type Stories_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  scenario_id?: Maybe<Order_By>;
  strategy?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Stories_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  strategy?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "stories" */
export type Stories_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  scenario_id?: Maybe<Order_By>;
  strategy?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "stories" */
export type Stories_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Stories>;
};

/** on conflict condition type for table "stories" */
export type Stories_On_Conflict = {
  constraint: Stories_Constraint;
  update_columns?: Array<Stories_Update_Column>;
  where?: Maybe<Stories_Bool_Exp>;
};

/** Ordering options when selecting data from "stories". */
export type Stories_Order_By = {
  active?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  scenario?: Maybe<Scenarios_Order_By>;
  scenario_id?: Maybe<Order_By>;
  story?: Maybe<Order_By>;
  strategy?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: stories */
export type Stories_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Stories_Prepend_Input = {
  story?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "stories" */
export enum Stories_Select_Column {
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
export type Stories_Set_Input = {
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
export enum Stories_Update_Column {
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
  /** fetch data from the table: "scenarios" */
  scenarios: Array<Scenarios>;
  /** fetch aggregated fields from the table: "scenarios" */
  scenarios_aggregate: Scenarios_Aggregate;
  /** fetch data from the table: "scenarios" using primary key columns */
  scenarios_by_pk?: Maybe<Scenarios>;
  /** An array relationship */
  stories: Array<Stories>;
  /** An aggregate relationship */
  stories_aggregate: Stories_Aggregate;
  /** fetch data from the table: "stories" using primary key columns */
  stories_by_pk?: Maybe<Stories>;
};


export type Subscription_RootScenariosArgs = {
  distinct_on?: Maybe<Array<Scenarios_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenarios_Order_By>>;
  where?: Maybe<Scenarios_Bool_Exp>;
};


export type Subscription_RootScenarios_AggregateArgs = {
  distinct_on?: Maybe<Array<Scenarios_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenarios_Order_By>>;
  where?: Maybe<Scenarios_Bool_Exp>;
};


export type Subscription_RootScenarios_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootStoriesArgs = {
  distinct_on?: Maybe<Array<Stories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stories_Order_By>>;
  where?: Maybe<Stories_Bool_Exp>;
};


export type Subscription_RootStories_AggregateArgs = {
  distinct_on?: Maybe<Array<Stories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Stories_Order_By>>;
  where?: Maybe<Stories_Bool_Exp>;
};


export type Subscription_RootStories_By_PkArgs = {
  id: Scalars['uuid'];
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

export type MyQueryQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type MyQueryQuery = { scenarios_by_pk?: Maybe<Pick<Scenarios, 'active' | 'collaborator' | 'created_at' | 'email' | 'googleAnalyticsId' | 'id' | 'images' | 'launcher' | 'owner'>> };


export const MyQueryDocument = gql`
    query MyQuery($id: uuid!) {
  scenarios_by_pk(id: $id) {
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
 * __useMyQueryQuery__
 *
 * To run a query within a React component, call `useMyQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyQueryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMyQueryQuery(baseOptions: Apollo.QueryHookOptions<MyQueryQuery, MyQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyQueryQuery, MyQueryQueryVariables>(MyQueryDocument, options);
      }
export function useMyQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyQueryQuery, MyQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyQueryQuery, MyQueryQueryVariables>(MyQueryDocument, options);
        }
export type MyQueryQueryHookResult = ReturnType<typeof useMyQueryQuery>;
export type MyQueryLazyQueryHookResult = ReturnType<typeof useMyQueryLazyQuery>;
export type MyQueryQueryResult = Apollo.QueryResult<MyQueryQuery, MyQueryQueryVariables>;