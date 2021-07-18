import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

/** columns and relationships of "entries" */
export type Entry = {
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  inputs: Scalars['jsonb'];
  /** An object relationship */
  scenario?: Maybe<Scenario>;
  scenario_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "entries" */
export type EntryInputsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "entries" */
export type Entry_Aggregate = {
  aggregate?: Maybe<Entry_Aggregate_Fields>;
  nodes: Array<Entry>;
};

/** aggregate fields of "entries" */
export type Entry_Aggregate_Fields = {
  count: Scalars['Int'];
  max?: Maybe<Entry_Max_Fields>;
  min?: Maybe<Entry_Min_Fields>;
};


/** aggregate fields of "entries" */
export type Entry_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Entry_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "entries" */
export type Entry_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Entry_Max_Order_By>;
  min?: Maybe<Entry_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Entry_Append_Input = {
  inputs?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "entries" */
export type Entry_Arr_Rel_Insert_Input = {
  data: Array<Entry_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Entry_On_Conflict>;
};

/** Boolean expression to filter rows from the table "entries". All fields are combined with a logical 'AND'. */
export type Entry_Bool_Exp = {
  _and?: Maybe<Array<Entry_Bool_Exp>>;
  _not?: Maybe<Entry_Bool_Exp>;
  _or?: Maybe<Array<Entry_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  inputs?: Maybe<Jsonb_Comparison_Exp>;
  scenario?: Maybe<Scenario_Bool_Exp>;
  scenario_id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "entries" */
export enum Entry_Constraint {
  /** unique or primary key constraint */
  EntriesPkey = 'entries_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Entry_Delete_At_Path_Input = {
  inputs?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Entry_Delete_Elem_Input = {
  inputs?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Entry_Delete_Key_Input = {
  inputs?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "entries" */
export type Entry_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  inputs?: Maybe<Scalars['jsonb']>;
  scenario?: Maybe<Scenario_Obj_Rel_Insert_Input>;
  scenario_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Entry_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "entries" */
export type Entry_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  scenario_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Entry_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "entries" */
export type Entry_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  scenario_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "entries" */
export type Entry_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Entry>;
};

/** on conflict condition type for table "entries" */
export type Entry_On_Conflict = {
  constraint: Entry_Constraint;
  update_columns?: Array<Entry_Update_Column>;
  where?: Maybe<Entry_Bool_Exp>;
};

/** Ordering options when selecting data from "entries". */
export type Entry_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  inputs?: Maybe<Order_By>;
  scenario?: Maybe<Scenario_Order_By>;
  scenario_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: entry */
export type Entry_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Entry_Prepend_Input = {
  inputs?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "entries" */
export enum Entry_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Inputs = 'inputs',
  /** column name */
  ScenarioId = 'scenario_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "entries" */
export type Entry_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  inputs?: Maybe<Scalars['jsonb']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "entries" */
export enum Entry_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Inputs = 'inputs',
  /** column name */
  ScenarioId = 'scenario_id',
  /** column name */
  UpdatedAt = 'updated_at'
}


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
  /** delete data from the table: "entries" */
  deleteEntries?: Maybe<Entry_Mutation_Response>;
  /** delete single row from the table: "entries" */
  deleteEntryById?: Maybe<Entry>;
  /** delete single row from the table: "scenarios" */
  deleteScenarioById?: Maybe<Scenario>;
  /** delete data from the table: "scenarios" */
  deleteScenarios?: Maybe<Scenario_Mutation_Response>;
  /** delete single row from the table: "talk_sctipts" */
  deleteTalkScriptById?: Maybe<TalkScript>;
  /** delete data from the table: "talk_sctipts" */
  deleteTalkScripts?: Maybe<TalkScript_Mutation_Response>;
  /** delete data from the table: "scripts" */
  delete_scripts?: Maybe<Scripts_Mutation_Response>;
  /** delete single row from the table: "scripts" */
  delete_scripts_by_pk?: Maybe<Scripts>;
  /** insert data into the table: "entries" */
  insertEntries?: Maybe<Entry_Mutation_Response>;
  /** insert a single row into the table: "entries" */
  insertEntry?: Maybe<Entry>;
  /** insert a single row into the table: "scenarios" */
  insertScenario?: Maybe<Scenario>;
  /** insert data into the table: "scenarios" */
  insertScenarios?: Maybe<Scenario_Mutation_Response>;
  /** insert a single row into the table: "talk_sctipts" */
  insertTalkScript?: Maybe<TalkScript>;
  /** insert data into the table: "talk_sctipts" */
  insertTalkScripts?: Maybe<TalkScript_Mutation_Response>;
  /** insert data into the table: "scripts" */
  insert_scripts?: Maybe<Scripts_Mutation_Response>;
  /** insert a single row into the table: "scripts" */
  insert_scripts_one?: Maybe<Scripts>;
  /** update data of the table: "entries" */
  updateEntries?: Maybe<Entry_Mutation_Response>;
  /** update single row of the table: "entries" */
  updateEntryById?: Maybe<Entry>;
  /** update single row of the table: "scenarios" */
  updateScenarioById?: Maybe<Scenario>;
  /** update data of the table: "scenarios" */
  updateScenarios?: Maybe<Scenario_Mutation_Response>;
  /** update single row of the table: "talk_sctipts" */
  updateTalkScriptById?: Maybe<TalkScript>;
  /** update data of the table: "talk_sctipts" */
  updateTalkScripts?: Maybe<TalkScript_Mutation_Response>;
  /** update data of the table: "scripts" */
  update_scripts?: Maybe<Scripts_Mutation_Response>;
  /** update single row of the table: "scripts" */
  update_scripts_by_pk?: Maybe<Scripts>;
};


/** mutation root */
export type Mutation_RootDeleteEntriesArgs = {
  where: Entry_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteEntryByIdArgs = {
  id: Scalars['uuid'];
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
export type Mutation_RootDeleteTalkScriptByIdArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteTalkScriptsArgs = {
  where: TalkScript_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ScriptsArgs = {
  where: Scripts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Scripts_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsertEntriesArgs = {
  objects: Array<Entry_Insert_Input>;
  on_conflict?: Maybe<Entry_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertEntryArgs = {
  object: Entry_Insert_Input;
  on_conflict?: Maybe<Entry_On_Conflict>;
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
export type Mutation_RootInsertTalkScriptArgs = {
  object: TalkScript_Insert_Input;
  on_conflict?: Maybe<TalkScript_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertTalkScriptsArgs = {
  objects: Array<TalkScript_Insert_Input>;
  on_conflict?: Maybe<TalkScript_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ScriptsArgs = {
  objects: Array<Scripts_Insert_Input>;
  on_conflict?: Maybe<Scripts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scripts_OneArgs = {
  object: Scripts_Insert_Input;
  on_conflict?: Maybe<Scripts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdateEntriesArgs = {
  _append?: Maybe<Entry_Append_Input>;
  _delete_at_path?: Maybe<Entry_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Entry_Delete_Elem_Input>;
  _delete_key?: Maybe<Entry_Delete_Key_Input>;
  _prepend?: Maybe<Entry_Prepend_Input>;
  _set?: Maybe<Entry_Set_Input>;
  where: Entry_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateEntryByIdArgs = {
  _append?: Maybe<Entry_Append_Input>;
  _delete_at_path?: Maybe<Entry_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Entry_Delete_Elem_Input>;
  _delete_key?: Maybe<Entry_Delete_Key_Input>;
  _prepend?: Maybe<Entry_Prepend_Input>;
  _set?: Maybe<Entry_Set_Input>;
  pk_columns: Entry_Pk_Columns_Input;
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
export type Mutation_RootUpdateTalkScriptByIdArgs = {
  _set?: Maybe<TalkScript_Set_Input>;
  pk_columns: TalkScript_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTalkScriptsArgs = {
  _set?: Maybe<TalkScript_Set_Input>;
  where: TalkScript_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ScriptsArgs = {
  _set?: Maybe<Scripts_Set_Input>;
  where: Scripts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scripts_By_PkArgs = {
  _set?: Maybe<Scripts_Set_Input>;
  pk_columns: Scripts_Pk_Columns_Input;
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
  /** fetch aggregated fields from the table: "entries" */
  aggregateEntries: Entry_Aggregate;
  /** fetch aggregated fields from the table: "scenarios" */
  aggregateScenarios: Scenario_Aggregate;
  /** fetch aggregated fields from the table: "talk_sctipts" */
  aggtegateTalkScripts: TalkScript_Aggregate;
  /** fetch data from the table: "entries" using primary key columns */
  getEntryById?: Maybe<Entry>;
  /** fetch data from the table: "scenarios" using primary key columns */
  getScenarioById?: Maybe<Scenario>;
  /** fetch data from the table: "talk_sctipts" using primary key columns */
  getTalkScriptId?: Maybe<TalkScript>;
  /** fetch data from the table: "entries" */
  listEntries: Array<Entry>;
  /** fetch data from the table: "scenarios" */
  listScenarios: Array<Scenario>;
  /** fetch data from the table: "talk_sctipts" */
  listTalkScripts: Array<TalkScript>;
  /** An array relationship */
  scripts: Array<Scripts>;
  /** An aggregate relationship */
  scripts_aggregate: Scripts_Aggregate;
  /** fetch data from the table: "scripts" using primary key columns */
  scripts_by_pk?: Maybe<Scripts>;
};


export type Query_RootAggregateEntriesArgs = {
  distinct_on?: Maybe<Array<Entry_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Entry_Order_By>>;
  where?: Maybe<Entry_Bool_Exp>;
};


export type Query_RootAggregateScenariosArgs = {
  distinct_on?: Maybe<Array<Scenario_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenario_Order_By>>;
  where?: Maybe<Scenario_Bool_Exp>;
};


export type Query_RootAggtegateTalkScriptsArgs = {
  distinct_on?: Maybe<Array<TalkScript_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TalkScript_Order_By>>;
  where?: Maybe<TalkScript_Bool_Exp>;
};


export type Query_RootGetEntryByIdArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGetScenarioByIdArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGetTalkScriptIdArgs = {
  id: Scalars['uuid'];
};


export type Query_RootListEntriesArgs = {
  distinct_on?: Maybe<Array<Entry_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Entry_Order_By>>;
  where?: Maybe<Entry_Bool_Exp>;
};


export type Query_RootListScenariosArgs = {
  distinct_on?: Maybe<Array<Scenario_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenario_Order_By>>;
  where?: Maybe<Scenario_Bool_Exp>;
};


export type Query_RootListTalkScriptsArgs = {
  distinct_on?: Maybe<Array<TalkScript_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TalkScript_Order_By>>;
  where?: Maybe<TalkScript_Bool_Exp>;
};


export type Query_RootScriptsArgs = {
  distinct_on?: Maybe<Array<Scripts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scripts_Order_By>>;
  where?: Maybe<Scripts_Bool_Exp>;
};


export type Query_RootScripts_AggregateArgs = {
  distinct_on?: Maybe<Array<Scripts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scripts_Order_By>>;
  where?: Maybe<Scripts_Bool_Exp>;
};


export type Query_RootScripts_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "scenarios" */
export type Scenario = {
  active: Scalars['Boolean'];
  collaborator: Scalars['jsonb'];
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  /** An array relationship */
  entries: Array<Entry>;
  /** An aggregate relationship */
  entries_aggregate: Entry_Aggregate;
  google_analytics_id?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  images: Scalars['jsonb'];
  launcher: Scalars['jsonb'];
  owner: Scalars['String'];
  /** An array relationship */
  talk_scripts: Array<TalkScript>;
  /** An aggregate relationship */
  talk_scripts_aggregate: TalkScript_Aggregate;
  theme: Scalars['jsonb'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "scenarios" */
export type ScenarioCollaboratorArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "scenarios" */
export type ScenarioEntriesArgs = {
  distinct_on?: Maybe<Array<Entry_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Entry_Order_By>>;
  where?: Maybe<Entry_Bool_Exp>;
};


/** columns and relationships of "scenarios" */
export type ScenarioEntries_AggregateArgs = {
  distinct_on?: Maybe<Array<Entry_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Entry_Order_By>>;
  where?: Maybe<Entry_Bool_Exp>;
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
export type ScenarioTalk_ScriptsArgs = {
  distinct_on?: Maybe<Array<TalkScript_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TalkScript_Order_By>>;
  where?: Maybe<TalkScript_Bool_Exp>;
};


/** columns and relationships of "scenarios" */
export type ScenarioTalk_Scripts_AggregateArgs = {
  distinct_on?: Maybe<Array<TalkScript_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TalkScript_Order_By>>;
  where?: Maybe<TalkScript_Bool_Exp>;
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
  entries?: Maybe<Entry_Bool_Exp>;
  google_analytics_id?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  images?: Maybe<Jsonb_Comparison_Exp>;
  launcher?: Maybe<Jsonb_Comparison_Exp>;
  owner?: Maybe<String_Comparison_Exp>;
  talk_scripts?: Maybe<TalkScript_Bool_Exp>;
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
  entries?: Maybe<Entry_Arr_Rel_Insert_Input>;
  google_analytics_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  images?: Maybe<Scalars['jsonb']>;
  launcher?: Maybe<Scalars['jsonb']>;
  owner?: Maybe<Scalars['String']>;
  talk_scripts?: Maybe<TalkScript_Arr_Rel_Insert_Input>;
  theme?: Maybe<Scalars['jsonb']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Scenario_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  google_analytics_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Scenario_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  google_analytics_id?: Maybe<Scalars['String']>;
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
  entries_aggregate?: Maybe<Entry_Aggregate_Order_By>;
  google_analytics_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  images?: Maybe<Order_By>;
  launcher?: Maybe<Order_By>;
  owner?: Maybe<Order_By>;
  talk_scripts_aggregate?: Maybe<TalkScript_Aggregate_Order_By>;
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
  GoogleAnalyticsId = 'google_analytics_id',
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
  google_analytics_id?: Maybe<Scalars['String']>;
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
  GoogleAnalyticsId = 'google_analytics_id',
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

/** columns and relationships of "scripts" */
export type Scripts = {
  follow_script_id: Scalars['uuid'];
  id: Scalars['uuid'];
  snippet: Scalars['String'];
  talk_script_id: Scalars['uuid'];
};

/** aggregated selection of "scripts" */
export type Scripts_Aggregate = {
  aggregate?: Maybe<Scripts_Aggregate_Fields>;
  nodes: Array<Scripts>;
};

/** aggregate fields of "scripts" */
export type Scripts_Aggregate_Fields = {
  count: Scalars['Int'];
  max?: Maybe<Scripts_Max_Fields>;
  min?: Maybe<Scripts_Min_Fields>;
};


/** aggregate fields of "scripts" */
export type Scripts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Scripts_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "scripts" */
export type Scripts_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Scripts_Max_Order_By>;
  min?: Maybe<Scripts_Min_Order_By>;
};

/** input type for inserting array relation for remote table "scripts" */
export type Scripts_Arr_Rel_Insert_Input = {
  data: Array<Scripts_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Scripts_On_Conflict>;
};

/** Boolean expression to filter rows from the table "scripts". All fields are combined with a logical 'AND'. */
export type Scripts_Bool_Exp = {
  _and?: Maybe<Array<Scripts_Bool_Exp>>;
  _not?: Maybe<Scripts_Bool_Exp>;
  _or?: Maybe<Array<Scripts_Bool_Exp>>;
  follow_script_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  snippet?: Maybe<String_Comparison_Exp>;
  talk_script_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "scripts" */
export enum Scripts_Constraint {
  /** unique or primary key constraint */
  ScriptsPkey = 'scripts_pkey'
}

/** input type for inserting data into table "scripts" */
export type Scripts_Insert_Input = {
  follow_script_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  snippet?: Maybe<Scalars['String']>;
  talk_script_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Scripts_Max_Fields = {
  follow_script_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  snippet?: Maybe<Scalars['String']>;
  talk_script_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "scripts" */
export type Scripts_Max_Order_By = {
  follow_script_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  snippet?: Maybe<Order_By>;
  talk_script_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Scripts_Min_Fields = {
  follow_script_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  snippet?: Maybe<Scalars['String']>;
  talk_script_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "scripts" */
export type Scripts_Min_Order_By = {
  follow_script_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  snippet?: Maybe<Order_By>;
  talk_script_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "scripts" */
export type Scripts_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Scripts>;
};

/** on conflict condition type for table "scripts" */
export type Scripts_On_Conflict = {
  constraint: Scripts_Constraint;
  update_columns?: Array<Scripts_Update_Column>;
  where?: Maybe<Scripts_Bool_Exp>;
};

/** Ordering options when selecting data from "scripts". */
export type Scripts_Order_By = {
  follow_script_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  snippet?: Maybe<Order_By>;
  talk_script_id?: Maybe<Order_By>;
};

/** primary key columns input for table: scripts */
export type Scripts_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "scripts" */
export enum Scripts_Select_Column {
  /** column name */
  FollowScriptId = 'follow_script_id',
  /** column name */
  Id = 'id',
  /** column name */
  Snippet = 'snippet',
  /** column name */
  TalkScriptId = 'talk_script_id'
}

/** input type for updating data in table "scripts" */
export type Scripts_Set_Input = {
  follow_script_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  snippet?: Maybe<Scalars['String']>;
  talk_script_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "scripts" */
export enum Scripts_Update_Column {
  /** column name */
  FollowScriptId = 'follow_script_id',
  /** column name */
  Id = 'id',
  /** column name */
  Snippet = 'snippet',
  /** column name */
  TalkScriptId = 'talk_script_id'
}

export type Subscription_Root = {
  /** fetch aggregated fields from the table: "entries" */
  aggregateEntries: Entry_Aggregate;
  /** fetch aggregated fields from the table: "scenarios" */
  aggregateScenarios: Scenario_Aggregate;
  /** fetch aggregated fields from the table: "talk_sctipts" */
  aggtegateTalkScripts: TalkScript_Aggregate;
  /** fetch data from the table: "entries" using primary key columns */
  getEntryById?: Maybe<Entry>;
  /** fetch data from the table: "scenarios" using primary key columns */
  getScenarioById?: Maybe<Scenario>;
  /** fetch data from the table: "talk_sctipts" using primary key columns */
  getTalkScriptId?: Maybe<TalkScript>;
  /** fetch data from the table: "entries" */
  listEntries: Array<Entry>;
  /** fetch data from the table: "scenarios" */
  listScenarios: Array<Scenario>;
  /** fetch data from the table: "talk_sctipts" */
  listTalkScripts: Array<TalkScript>;
  /** An array relationship */
  scripts: Array<Scripts>;
  /** An aggregate relationship */
  scripts_aggregate: Scripts_Aggregate;
  /** fetch data from the table: "scripts" using primary key columns */
  scripts_by_pk?: Maybe<Scripts>;
};


export type Subscription_RootAggregateEntriesArgs = {
  distinct_on?: Maybe<Array<Entry_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Entry_Order_By>>;
  where?: Maybe<Entry_Bool_Exp>;
};


export type Subscription_RootAggregateScenariosArgs = {
  distinct_on?: Maybe<Array<Scenario_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenario_Order_By>>;
  where?: Maybe<Scenario_Bool_Exp>;
};


export type Subscription_RootAggtegateTalkScriptsArgs = {
  distinct_on?: Maybe<Array<TalkScript_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TalkScript_Order_By>>;
  where?: Maybe<TalkScript_Bool_Exp>;
};


export type Subscription_RootGetEntryByIdArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGetScenarioByIdArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGetTalkScriptIdArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootListEntriesArgs = {
  distinct_on?: Maybe<Array<Entry_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Entry_Order_By>>;
  where?: Maybe<Entry_Bool_Exp>;
};


export type Subscription_RootListScenariosArgs = {
  distinct_on?: Maybe<Array<Scenario_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scenario_Order_By>>;
  where?: Maybe<Scenario_Bool_Exp>;
};


export type Subscription_RootListTalkScriptsArgs = {
  distinct_on?: Maybe<Array<TalkScript_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TalkScript_Order_By>>;
  where?: Maybe<TalkScript_Bool_Exp>;
};


export type Subscription_RootScriptsArgs = {
  distinct_on?: Maybe<Array<Scripts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scripts_Order_By>>;
  where?: Maybe<Scripts_Bool_Exp>;
};


export type Subscription_RootScripts_AggregateArgs = {
  distinct_on?: Maybe<Array<Scripts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scripts_Order_By>>;
  where?: Maybe<Scripts_Bool_Exp>;
};


export type Subscription_RootScripts_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "talk_sctipts" */
export type TalkScript = {
  active: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  label: Scalars['String'];
  /** An object relationship */
  scenario?: Maybe<Scenario>;
  scenario_id: Scalars['uuid'];
  /** An array relationship */
  scripts: Array<Scripts>;
  /** An aggregate relationship */
  scripts_aggregate: Scripts_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "talk_sctipts" */
export type TalkScriptScriptsArgs = {
  distinct_on?: Maybe<Array<Scripts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scripts_Order_By>>;
  where?: Maybe<Scripts_Bool_Exp>;
};


/** columns and relationships of "talk_sctipts" */
export type TalkScriptScripts_AggregateArgs = {
  distinct_on?: Maybe<Array<Scripts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scripts_Order_By>>;
  where?: Maybe<Scripts_Bool_Exp>;
};

/** aggregated selection of "talk_sctipts" */
export type TalkScript_Aggregate = {
  aggregate?: Maybe<TalkScript_Aggregate_Fields>;
  nodes: Array<TalkScript>;
};

/** aggregate fields of "talk_sctipts" */
export type TalkScript_Aggregate_Fields = {
  count: Scalars['Int'];
  max?: Maybe<TalkScript_Max_Fields>;
  min?: Maybe<TalkScript_Min_Fields>;
};


/** aggregate fields of "talk_sctipts" */
export type TalkScript_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<TalkScript_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "talk_sctipts" */
export type TalkScript_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<TalkScript_Max_Order_By>;
  min?: Maybe<TalkScript_Min_Order_By>;
};

/** input type for inserting array relation for remote table "talk_sctipts" */
export type TalkScript_Arr_Rel_Insert_Input = {
  data: Array<TalkScript_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<TalkScript_On_Conflict>;
};

/** Boolean expression to filter rows from the table "talk_sctipts". All fields are combined with a logical 'AND'. */
export type TalkScript_Bool_Exp = {
  _and?: Maybe<Array<TalkScript_Bool_Exp>>;
  _not?: Maybe<TalkScript_Bool_Exp>;
  _or?: Maybe<Array<TalkScript_Bool_Exp>>;
  active?: Maybe<Boolean_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  label?: Maybe<String_Comparison_Exp>;
  scenario?: Maybe<Scenario_Bool_Exp>;
  scenario_id?: Maybe<Uuid_Comparison_Exp>;
  scripts?: Maybe<Scripts_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "talk_sctipts" */
export enum TalkScript_Constraint {
  /** unique or primary key constraint */
  StoriesPkey = 'stories_pkey'
}

/** input type for inserting data into table "talk_sctipts" */
export type TalkScript_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario?: Maybe<Scenario_Obj_Rel_Insert_Input>;
  scenario_id?: Maybe<Scalars['uuid']>;
  scripts?: Maybe<Scripts_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type TalkScript_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "talk_sctipts" */
export type TalkScript_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  scenario_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type TalkScript_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "talk_sctipts" */
export type TalkScript_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  scenario_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "talk_sctipts" */
export type TalkScript_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<TalkScript>;
};

/** on conflict condition type for table "talk_sctipts" */
export type TalkScript_On_Conflict = {
  constraint: TalkScript_Constraint;
  update_columns?: Array<TalkScript_Update_Column>;
  where?: Maybe<TalkScript_Bool_Exp>;
};

/** Ordering options when selecting data from "talk_sctipts". */
export type TalkScript_Order_By = {
  active?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  scenario?: Maybe<Scenario_Order_By>;
  scenario_id?: Maybe<Order_By>;
  scripts_aggregate?: Maybe<Scripts_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: talkScript */
export type TalkScript_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "talk_sctipts" */
export enum TalkScript_Select_Column {
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
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "talk_sctipts" */
export type TalkScript_Set_Input = {
  active?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  scenario_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "talk_sctipts" */
export enum TalkScript_Update_Column {
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
  UpdatedAt = 'updated_at'
}


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


export type GetOneScenarioQuery = { scenario?: Maybe<(
    Pick<Scenario, 'active' | 'collaborator' | 'created_at' | 'email' | 'google_analytics_id' | 'id' | 'images' | 'launcher' | 'owner'>
    & { talk_scripts: Array<(
      Pick<TalkScript, 'label' | 'active'>
      & { scripts: Array<Pick<Scripts, 'snippet'>> }
    )> }
  )> };

export type NewScenarioMutationVariables = Exact<{
  input: Scenario_Insert_Input;
}>;


export type NewScenarioMutation = { scenario?: Maybe<Pick<Scenario, 'id'>> };

export type NewEntryMutationVariables = Exact<{
  input: Entry_Insert_Input;
}>;


export type NewEntryMutation = { entry?: Maybe<Pick<Entry, 'id' | 'scenario_id'>> };


export const GetOneScenarioDocument = gql`
    query getOneScenario($id: uuid!) {
  scenario: getScenarioById(id: $id) {
    active
    collaborator
    created_at
    email
    google_analytics_id
    id
    images
    launcher
    owner
    talk_scripts {
      label
      active
      scripts {
        snippet
      }
    }
  }
}
    `;
export const NewScenarioDocument = gql`
    mutation newScenario($input: scenario_insert_input!) {
  scenario: insertScenario(object: $input) {
    id
  }
}
    `;
export const NewEntryDocument = gql`
    mutation newEntry($input: entry_insert_input!) {
  entry: insertEntry(object: $input) {
    id
    scenario_id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getOneScenario(variables: GetOneScenarioQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOneScenarioQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOneScenarioQuery>(GetOneScenarioDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOneScenario');
    },
    newScenario(variables: NewScenarioMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NewScenarioMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewScenarioMutation>(NewScenarioDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'newScenario');
    },
    newEntry(variables: NewEntryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NewEntryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewEntryMutation>(NewEntryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'newEntry');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;