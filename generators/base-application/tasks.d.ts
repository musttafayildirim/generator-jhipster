import { NoArgTaskGroup, GenericTaskGroup } from '../base/tasks.js';

export type Application = Record<string, any>;

type ApplicationTaskParam<ApplicationType> = { application: ApplicationType };
type ApplicationTaskGroup<ThisType, ApplicationType> = GenericTaskGroup<ThisType, ApplicationTaskParam<ApplicationType>>;

type ConfiguringEachEntityTaskParam<ApplicationType> = ApplicationTaskParam<ApplicationType> & {
  entityName: string;
  /** Entity storage */
  entityStorage: import('yeoman-generator/lib/util/storage');
  /** Proxy object for the entitystorage */
  entityConfig: Record<string, any>;
};
type ConfiguringEachEntityTaskGroup<ThisType, ApplicationType> = GenericTaskGroup<
  ThisType,
  ConfiguringEachEntityTaskParam<ApplicationType>
>;

type LoadingEntitiesTaskParam<ApplicationType> = ApplicationTaskParam<ApplicationType> & {
  entitiesToLoad: {
    entityName: string;
    /** Entity storage */
    entityStorage: import('yeoman-generator/lib/util/storage');
    /** Proxy object for the entitystorage */
    entityConfig: Record<string, any>;
  }[];
};
type LoadingEntitiesTaskGroup<ThisType, ApplicationType> = GenericTaskGroup<ThisType, LoadingEntitiesTaskParam<ApplicationType>>;

type Field = {
  fieldName: string;
  fieldType: string;
  fieldTypeBlobContent: string;
} & Record<string, any>;

type Relationship = {
  relationshipName: string;
} & Record<string, any>;

type Entity = {
  fields: Field[];
  relationships: Relationship[];
} & Record<string, any>;

type EachEntityTaskParam<ApplicationType> = ApplicationTaskParam<ApplicationType> & {
  entity: Entity;
  entityName: string;
  description: string;
};

type EachEntityTaskGroup<ThisType, ApplicationType> = GenericTaskGroup<ThisType, EachEntityTaskParam<ApplicationType>>;

type PreparingEachEntityFieldTaskParam<ApplicationType> = EachEntityTaskParam<ApplicationType> & {
  field: Field;
  fieldName: string;
};
type PreparingEachEntityFieldTaskGroup<ThisType, ApplicationType> = GenericTaskGroup<
  ThisType,
  PreparingEachEntityFieldTaskParam<ApplicationType>
>;

type PreparingEachEntityRelationshipTaskParam<ApplicationType> = EachEntityTaskParam<ApplicationType> & {
  relationship: Relationship;
  relationshipName: string;
};
type PreparingEachEntityRelationshipTaskGroup<ThisType, ApplicationType> = GenericTaskGroup<
  ThisType,
  PreparingEachEntityRelationshipTaskParam<ApplicationType>
>;

type EntitiesTaskParam<ApplicationType> = ApplicationTaskParam<ApplicationType> & { entities: Entity[] };

type EntitiesTaskGroup<ThisType, ApplicationType> = GenericTaskGroup<ThisType, EntitiesTaskParam<ApplicationType>>;

export {
  NoArgTaskGroup as InitializingTaskGroup,
  NoArgTaskGroup as PromptingTaskGroup,
  NoArgTaskGroup as ConfiguringTaskGroup,
  NoArgTaskGroup as ComposingTaskGroup,
  ApplicationTaskGroup as LoadingTaskGroup,
  ApplicationTaskGroup as PreparingTaskGroup,
  ConfiguringEachEntityTaskGroup,
  LoadingEntitiesTaskGroup,
  EachEntityTaskGroup as PreparingEachEntityTaskGroup,
  PreparingEachEntityFieldTaskGroup,
  PreparingEachEntityRelationshipTaskGroup,
  EachEntityTaskGroup as PostPreparingEachEntityTaskGroup,
  EntitiesTaskGroup as DefaultTaskGroup,
  ApplicationTaskGroup as WritingTaskGroup,
  EntitiesTaskGroup as WritingEntitiesTaskGroup,
  ApplicationTaskGroup as PostWritingTaskGroup,
  EntitiesTaskGroup as PostWritingEntitiesTaskGroup,
  ApplicationTaskGroup as InstallTaskGroup,
  ApplicationTaskGroup as PostInstallTaskGroup,
  ApplicationTaskGroup as EndTaskGroup,
};
