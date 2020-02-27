export default class Entity implements EntityObject{
    readonly projectId: string;
    readonly version: number;
    readonly URLSafeKey: string;
    readonly key: KeyObject;
    properties: Array<Property>;

    constructor( projectId: string, version: number, URLSafeKey: string, key: KeyObject, properties: Array<Property> ) {
        this.projectId = projectId;
        this.version = version;
        this.URLSafeKey = URLSafeKey;
        this.key = key;
        this.properties = properties;
    }
}