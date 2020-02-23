export default class Entity implements EntityObject{
    readonly projectId: string;
    readonly version: number;
    readonly key: KeyObject;
    properties: Array<Property<any>>;

    constructor(projectId: string, version: number, key: KeyObject, properties: Array<Property<any>>) {
        this.projectId = projectId;
        this.version = version;
        this.key = key;
        this.properties = properties;
    }
}